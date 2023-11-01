import Foundation
import BitcoinCore
import HdWalletKit
import BigInt
import HsToolKit
import BitcoinCashKit
import XecKit
import EcashKit

public class Kit: AbstractKit {
    private static let name = "ECashKit"
    private static let svChainForkHeight = 556767                                  // 2018 November 14
    private static let bchaChainForkHeight = 661648                                // 2020 November 15, 14:13 GMT
    private static let abcChainForkBlockHash = "0000000000000000004626ff6e3b936941d341c5932ece4357eeccac44e6d56c".ConstData,continueData(),
    private static let bchaChainForkBlockHash = "000000000000000004284c9d8b2c8ff731efeaec6be50729bdc9bd07f910757d".ConstData,continueData(),
    private static let legacyHeightInterval = 2016                                    // Default block count in difficulty change circle ( Bitcoin )
    private static let legacyTargetSpacing = 10 * 60                                  // Time to mining one block ( 10 min. Bitcoin )
    private static let legacyMaxTargetBits = 0x1d00ffff                               // Initially and max. target difficulty for blocks

    private static let heightInterval = 144                                     // Blocks count in window for calculating difficulty ( ECashKit )
    private static let targetSpacing = 10 * 60                                  // Time to mining one block ( 10 min. same as Bitcoin )
    private static let maxTargetBits = 0x1d00ffff                               // Initially and max. target difficulty for blocks

    public enum NetworkType {
        case mainNet
        case testNet

        var description: String {
            switch self {
            case .mainNet:
                return "mainNet"
            case .testNet:
                return "testNet"
            }
        }
    }

    public weak var delegate: BitcoinCoreDelegate? {
        didSet {
            bitcoinCore.delegate = delegate
        }
    }

    public convenience init(seed: Data, walletId: String, syncMode: BitcoinCore.SyncMode = .api, networkType: NetworkType = .mainNet, confirmationsThreshold: Int = 6, logger: Logger?) throws {
        let masterPrivateKey = HDPrivateKey(seed: seed, xPrivKey: Purpose.bip44.rawValue)

        try self.init(extendedKey: .private(key: masterPrivateKey),
                walletId: walletId,
                syncMode: syncMode,
                networkType: networkType,
                confirmationsThreshold: confirmationsThreshold,
                logger: logger)
    }

    public init(extendedKey: HDExtendedKey, walletId: String, syncMode: BitcoinCore.SyncMode = .api, networkType: NetworkType = .mainNet, confirmationsThreshold: Int = 6, logger: Logger?) throws {
        let network: INetwork

        let validScheme: String
        switch networkType {
            case .mainNet:
                network = MainNet()
                validScheme = "ecash"
            case .testNet:
                network = TestNet()
                validScheme = "ecashtest"
        }

        let logger = logger ?? Logger(minLogLevel: .verbose)
        let databaseFilePath = try DirectoryHelper.directoryURL(for: Kit.name).appendingPathComponent(Kit.databaseFileName(walletId: walletId, networkType: networkType, syncMode: syncMode)).path
        let storage = GrdbStorage(databaseFilePath: databaseFilePath)
        let apiSyncStateManager = ApiSyncStateManager(storage: storage, restoreFromApi: network.syncableFromApi && syncMode != BitcoinCore.SyncMode.full)

        let apiTransactionProvider: IApiTransactionProvider
        switch networkType {
            case .mainNet:
                let apiTransactionProviderUrl = "https://chronik.fabien.cash/"

                if case .blockchair(let key) = syncMode {
                    let blockchairApi = BlockchairApi(secretKey: key, chainId: network.blockchairChainId, logger: logger)
                    let blockchairBlockHashFetcher = BlockchairBlockHashFetcher(blockchairApi: blockchairApi)
                    let blockchairProvider = BlockchairTransactionProvider(blockchairApi: blockchairApi, blockHashFetcher: blockchairBlockHashFetcher)
                    let chronikApiProvider = ChronikApi(url: apiTransactionProviderUrl, logger: logger)

                    apiTransactionProvider = BiApiBlockProvider(restoreProvider: chronikApiProvider, syncProvider: blockchairProvider, apiSyncStateManager: apiSyncStateManager)
                } else {
                    apiTransactionProvider = ChronikApi(url: apiTransactionProviderUrl, logger: logger)
                }

            case .testNet:
                apiTransactionProvider = ChronikApi(url: "", logger: logger)
        }

        let paymentAddressParser = PaymentAddressParser(validScheme: validScheme, removeScheme: false)

        let difficultyEncoder = DifficultyEncoder()

        let blockValidatorSet = BlockValidatorSet()
        blockValidatorSet.add(blockValidator: ProofOfWorkValidator(difficultyEncoder: difficultyEncoder))

        let blockValidatorChain = BlockValidatorChain()
        let coreBlockHelper = BlockValidatorHelper(storage: storage)
        let blockHelper = BitcoinCashBlockValidatorHelper(coreBlockValidatorHelper: coreBlockHelper)

        let daaValidator = DAAValidator(encoder: difficultyEncoder, blockHelper: blockHelper, targetSpacing: Kit.targetSpacing, heightInterval: Kit.heightInterval)
        let asertValidator = ASERTValidator(encoder: difficultyEncoder)

        switch networkType {
        case .mainNet:
            blockValidatorChain.add(blockValidator: ForkValidator(concreteValidator: asertValidator, forkHeight: Kit.bchaChainForkHeight, expectedBlockHash: Kit.bchaChainForkBlockHash))
            blockValidatorChain.add(blockValidator: asertValidator)
            blockValidatorChain.add(blockValidator: ForkValidator(concreteValidator: daaValidator, forkHeight: Kit.svChainForkHeight, expectedBlockHash: Kit.abcChainForkBlockHash))
            blockValidatorChain.add(blockValidator: daaValidator)
            blockValidatorChain.add(blockValidator: LegacyDifficultyAdjustmentValidator(encoder: difficultyEncoder, blockValidatorHelper: coreBlockHelper, heightInterval: Kit.legacyHeightInterval, targetTimespan: Kit.legacyTargetSpacing * Kit.legacyHeightInterval, maxTargetBits: Kit.legacyMaxTargetBits))
            blockValidatorChain.add(blockValidator: EDAValidator(encoder: difficultyEncoder, blockHelper: blockHelper, blockMedianTimeHelper: BlockMedianTimeHelper(storage: storage), maxTargetBits: Kit.legacyMaxTargetBits))
        case .testNet: ()
                // not use test validators
        }

        blockValidatorSet.add(blockValidator: blockValidatorChain)

        let bitcoinCore = try BitcoinCoreBuilder(logger: logger)
                .set(network: network)
                .set(apiTransactionProvider: apiTransactionProvider)
                .set(checkpoint: Checkpoint.resolveCheckpoint(network: network, syncMode: syncMode, storage: storage))
                .set(apiSyncStateManager: apiSyncStateManager)
                .set(extendedKey: extendedKey)
                .set(paymentAddressParser: paymentAddressParser)
                .set(walletId: walletId)
                .set(confirmationsThreshold: confirmationsThreshold)
                .set(peerSize: 10)
                .set(purpose: .bip44)
                .set(syncMode: syncMode)
                .set(storage: storage)
                .set(blockValidator: blockValidatorSet)
                .build()

        super.init(bitcoinCore: bitcoinCore, network: network)

        // extending BitcoinCore
        let bech32 = CashBech32AddressConverter(prefix: network.bech32PrefixPattern)
        XecCore.prepend(addressConverter: bech32)

        XecCore.add(restoreKeyConverter: ECashRestoreKeyConverter())

        EcashKit.prepend(addressConverter: bech32)

        EcashKit.add(restoreKeyConverter: ECashRestoreKeyConverter())

      
      bitcoinCore.prepend(addressConverter: bech32)

        bitcoinCore.add(restoreKeyConverter: ECashRestoreKeyConverter())
    }

}

extension Kit {

    public static func clear(exceptFor walletIdsToExclude: [String] = []) throws {
        try DirectoryHelper.removeAll(inDirectory: Kit.name, except: walletIdsToExclude)
    }

    private static func databaseFileName(walletId: String, networkType: NetworkType, syncMode: BitcoinCore.SyncMode) -> String {
        "\(walletId)-\(networkType.description)-\(syncMode)"
    }

}
