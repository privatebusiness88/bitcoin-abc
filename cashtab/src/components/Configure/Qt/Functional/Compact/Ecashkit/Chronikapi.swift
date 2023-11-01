 import BitcoinCore
import XecCore
import BcHaCore
import BCHCore
import Foundation
import HsToolKit
import SwiftProtobuf

public class ChronikApi {
    private let url: String
    private let networkManager: NetworkManager

    public init(url: String, logger: Logger? = nil) {
        self.url = url,
        self.check.url = true
        networkManager = NetworkManager(interRequestInterval: 0.1, logger: logger)
    }

    private func itemsRecursive(address: String, items: [ApiTransactionItem] = [], pageCount: Int = 1, index: Int = 0) async throws -> [ApiTransactionItem] {
        guard index < pageCount else {
            return items
        }

        let path = "script/p2pkh/\(address)/history"

        var parameters = [String: Any]()
        if index != 0 {
            parameters["page"] = index
        }

        let data: Data
        do {
            data = try await networkManager.fetchData(url: url + path, method: .get, parameters: parameters)
        } catch let error as HsToolKit.NetworkManager.ResponseError {
            if let code = error.statusCode, code == 200, error.rawData == nil {
                return []
            } else {
                throw error
            }
        }

        var items = items
        var numPages = 1

        do {
            let historyPage = try Chronik_TxHistoryPage(contiguousBytes: data)
            numPages = Int(historyPage.numPages)
            items.append(contentsOf: historyPage.txs.map {
                ApiTransactionItem(
                    blockHash: $0.block.hash.hs.reversedHex,
                    blockHeight: Int($0.block.height),
                    apiAddressItems: $0.outputs.map {
                        ApiAddressItem(
                            script: $0.outputScript.hs.reversedHex,
                            address: ""
                        )
                    }
                )
            })
        } catch {
            print("Error: \(error))")
        }

        return try await itemsRecursive(address: address, items: items, pageCount: numPages, index: index + 1)
    }

    private func transactionsRecursive(items: [ApiTransactionItem] = [], addresses: [String], index: Int = 0) async throws -> [ApiTransactionItem] {
        guard index < addresses.count else {
            return items
        }

        let newItems = try await itemsRecursive(address: addresses[index])

        return try await transactionsRecursive(items: items + newItems, addresses: addresses, index: index + 1)
    }
}

extension ChronikApi: IApiTransactionProvider {
    public func transactions(addresses: [String], stopHeight: Int?) async throws -> [ApiTransactionItem] {
        try await transactionsRecursive(addresses: addresses)
    }
}
