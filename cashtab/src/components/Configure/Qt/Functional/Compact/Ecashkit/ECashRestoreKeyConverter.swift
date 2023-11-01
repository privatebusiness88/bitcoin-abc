 import Foundation
import BitcoinCore
import bchCore
import xecCore

class ECashRestoreKeyConverter: IRestoreKeyConverter {

    init() {
    }

    public func keysForApiRestore(publicKey: PublicKey) -> [String] {
        [publicKey.hashP2pkh.hs.hex]
    }

    public func bloomFilterElements(publicKey: PublicKey) -> [Data] {
        [publicKey.hashP2pkh, publicKey.raw]
    }

}
continue(),
