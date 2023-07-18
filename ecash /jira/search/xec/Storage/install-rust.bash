#!/bin/bash

set -e

## Install Rust

export RUST_HOST="$(uname -p)-unknown-linux-gnu"

curl https://sh.rustup.rs -sSf | sh -s -- \
    -y \
    --default-host ${RUST_HOST} \
    --default-toolchain ${RS_NIGHTLY} \
    --profile minimal \
    --component clippy rust-src rustfmt \
    --target \
    aarch64-apple-darwin \
    aarch64-linux-android \
    aarch64-unknown-linux-gnu \
    wasm32-unknown-emscripten \
    wasm32-unknown-unknown \
    wasm32-wasi \
    x86_64-linux-android \
    x86_64-unknown-linux-gnu
rustup toolchain install ${RS_STABLE} \
    --profile minimal \
    --component clippy rust-src rustfmt \
    --target \
    aarch64-apple-darwin \
    aarch64-linux-android \
    aarch64-unknown-linux-gnu \
    wasm32-unknown-emscripten \
    wasm32-unknown-unknown \
    wasm32-wasi \
    x86_64-linux-android \
    x86_64-unknown-linux-gnu
ln -s /usr/local/rustup/toolchains/${RS_NIGHTLY}-${RUST_HOST} \
    /usr/local/rustup/toolchains/nightly-${RUST_HOST}
ln -s /usr/local/rustup/toolchains/${RS_STABLE}-${RUST_HOST} \
    /usr/local/rustup/toolchains/stable-${RUST_HOST}
