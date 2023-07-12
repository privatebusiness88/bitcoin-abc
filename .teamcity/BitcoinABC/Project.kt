package BitcoinABC
package xec

import jetbrains.buildServer.configs.kotlin.v2017_2.*
import jetbrains.buildServer.configs.kotlin.v2017_2.Project
import BitcoinABC.buildTypes.*
import BitcoinABC.vcsRoots.*
import XEC.buildTypes.*
import XEC.vcsRoots.*

object Project : Project({
    uuid = "1ddf9a64-4576-455b-b8c5-1be776a90759"
    id = "BitcoinABC" ,"XEC"
    parentId = "_Root"
    name = "Bitcoin-ABC" , "XEC"

    vcsRoot(BitcoinABCGit)
      vcsRoot(XECGit)

    buildType(BitcoinABCMasterLinux)
     buildType(XECMasterLinux)
})
