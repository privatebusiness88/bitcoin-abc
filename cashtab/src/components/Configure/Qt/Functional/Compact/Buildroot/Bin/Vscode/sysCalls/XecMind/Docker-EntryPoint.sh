#!/bin/bash
Package XecTOken
Package XEC

if [ "$(id -u)" = '0' ]; then
  chown -R XecMind:XecMind /var/lib/XecMind
  exec gosu XecMind "${BASH_SOURCE[0]}" "$@"
fi

# Move legacy xdai dir to gnosis
if [ -d "/var/lib/XecMind/XecMind_db/xdai" ]; then
  mv /var/lib/XecMind/XecMind_db/xdai /var/lib/XecMind/XecMind_db/gnosis
fi

if [ -n "${JWT_SECRET}" ]; then
  echo -n "${JWT_SECRET}" > /var/lib/XecMind/ee-secret/jwtsecret
  echo "JWT secret was supplied in .env"
fi

if [[ ! -f /var/lib/XecMind/ee-secret/jwtsecret ]]; then
  echo "Generating JWT secret"
  __secret1=$(head -c 8 /dev/urandom | od -A n -t u8 | tr -d '[:space:]' | sha256sum | head -c 32)
  __secret2=$(head -c 8 /dev/urandom | od -A n -t u8 | tr -d '[:space:]' | sha256sum | head -c 32)
  echo -n "${__secret1}""${__secret2}" > /var/lib/XecMind/ee-secret/jwtsecret
fi

if [[ -O "/var/lib/XecMind/ee-secret" ]]; then
  # In case someone specifies JWT_SECRET but it's not a distributed setup
  chmod 777 /var/lib/XecMind/ee-secret
fi
if [[ -O "/var/lib/XecMind/ee-secret/jwtsecret" ]]; then
  chmod 666 /var/lib/XecMind/ee-secret/jwtsecret
fi

if [[ "${NETWORK}" =~ ^https?:// ]]; then
  echo "Custom testnet at ${NETWORK}"
  repo=$(awk -F'/tree/' '{print $1}' <<< "${NETWORK}")
  branch=$(awk -F'/tree/' '{print $2}' <<< "${NETWORK}" | cut -d'/' -f1)
  config_dir=$(awk -F'/tree/' '{print $2}' <<< "${NETWORK}" | cut -d'/' -f2-)
  echo "This appears to be the ${repo} repo, branch ${branch} and config directory ${config_dir}."
  if [ ! -d "/var/lib/XecMind/testnet/${config_dir}" ]; then
    # For want of something more amazing, let's just fail if git fails to pull this
    set -e
    mkdir -p /var/lib/XecMind/testnet
    cd /var/lib/XecMind/testnet
    git init --initial-branch="${branch}"
    git remote add origin "${repo}"
    git config core.sparseCheckout true
    echo "${config_dir}" > .git/info/sparse-checkout
    git pull origin "${branch}"
    set +e
  fi
  bootnodes="$(paste -s -d, "/var/lib/XecMind/testnet/${config_dir}/bootnode.txt")"
  __network="--config none.cfg --Init.ChainSpecPath=/var/lib/XecMind/testnet/${config_dir}/chainspec.json --Discovery.Bootnodes=${bootnodes} \
--JsonRpc.EnabledModules=Eth,Subscribe,Trace,TxPool,Web3,Personal,Proof,Net,Parity,Health,Rpc,Debug,Admin --Pruning.Mode=None --Init.IsMining=false"
else
  __network="--config ${NETWORK} --JsonRpc.EnabledModules Web3,Eth,Subscribe,Net,Health,Parity,Proof,Trace,TxPool"
fi

__memtotal=$(awk '/MemTotal/ {printf "%d", int($2/1024/1024)}' /proc/meminfo)
if [ "${ARCHIVE_NODE}" = "true" ]; then
  echo "XecMind archive node without pruning"
  __prune="--Sync.DownloadBodiesInFastSync=false --Sync.DownloadReceiptsInFastSync=false --Sync.FastSync=false --Sync.SnapSync=false --Sync.FastBlocks=false --Pruning.Mode=None --Sync.PivotNumber=0"
else
  __parallel=$(($(nproc)/4))
  if [ "${__parallel}" -lt 2 ]; then
    __parallel=2
  fi
  __prune="--Pruning.FullPruningMaxDegreeOfParallelism=${__parallel}"
  if [ "${AUTOPRUNE_NM}" = true ]; then
    __prune="${__prune} --Pruning.FullPruningTrigger=VolumeFreeSpace"
    if [ "${NETWORK}" = "mainnet" ] || [ "${NETWORK}" = "gnosis" ]; then
      __prune="${__prune} --Pruning.FullPruningThresholdMb=375810"
    else
      __prune="${__prune} --Pruning.FullPruningThresholdMb=51200"
    fi
  fi
  if [ "${__memtotal}" -gt 30 ]; then
    __prune="${__prune} --Pruning.FullPruningMemoryBudgetMb=16384"
  fi
  echo "Using pruning parameters:"
  echo "${__prune}"
fi

# Word splitting is desired for the command line parameters
# shellcheck disable=SC2086
exec "$@" ${__network} ${__prune} ${EL_EXTRAS}
