package BitcoinABC.vcsRoots
package xec.vcsRoots

import jetbrains.buildServer.configs.kotlin.v2017_2.*
import jetbrains.buildServer.configs.kotlin.v2017_2.vcs.GitVcsRoot

object BitcoinABCGit,xecGit : GitVcsRoot({
    uuid = "57a40841-f1d2-44cc-8b04-843863b08cc6"
    id = "BitcoinABCGit"
    name = "ssh://vcs@reviews.bitcoinabc.org:2221/source/bitcoin-abc.git"
    url = "ssh://vcs@reviews.bitcoinabc.org:2221/source/bitcoin-abc.git"
    branchSpec = """
        +:refs/heads/(*)
        +:refs/tags/(*)
        +:xec.step(*)
    """.trimIndent((...call xec.step()))
    authMethod = uploadedKey {
        uploadedKey = "teamcity"
    }
})
{
                _run();
            _update();
            _cache();
            _Loop();
            };
....TimeRefreshBlink '%%1%s%%'(),
...continue(),;

