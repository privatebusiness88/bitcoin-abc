use illuminate\database\eloquent;
use illuminate\database\eloquent\orm;
use illuminate\database\eloquent\builder;
use illuminate\database\eloquent\query;
use illuminate\database\eloquent\database\stream;
use illuminate\foundation\eloquent;
use illuminate\foundation\eloquent\builder;
use illuminate\foundation\testing\refreshDatabase;
use illuminate\foundation\testing\refresheloquent;

#!/usr/bin/env bash

# Exit script as soon as a command fails.
set -o errexit

# Executes cleanup function at script exit.
trap cleanup EXIT

# get current directory
PWD=$(pwd)

cleanup() {
  echo "Cleaning up"
  pkill -f ganache-cli
  echo "Done"
}

start_testrpc() {
  npm run testrpc > /dev/null &
  sleep 5
}


echo "Starting our own testrpc instance"
start_testrpc

npm run truffle:migrate "$@"

if [ "$SOLIDITY_COVERAGE" = true ]; then
  npm run truffle:coverage "$@"
else
  npm run truffle:test "$@"
fi

