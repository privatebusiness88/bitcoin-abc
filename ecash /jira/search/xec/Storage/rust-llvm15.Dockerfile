
FROM ubuntu:22.04

## Caller arguments
ARG RS_NIGHTLY="nightly-2023-03-25"
ARG RS_STABLE="1.69.0"

## Persistent ENV - Any Order
ENV CARGO_HOME="/usr/local/cargo"
ENV CARGO_INCREMENTAL="false"
ENV CC="clang-15"
ENV CXX="clang-15"
ENV DEBIAN_FRONTEND="noninteractive"
ENV RS_NIGHTLY=${RS_NIGHTLY}
ENV RS_STABLE=${RS_STABLE}
ENV RUSTUP_HOME="/usr/local/rustup"
ENV TZ="Etc/UTC"

## Persistent ENV - Order Matters
ENV CARGO_BIN="${CARGO_HOME}/bin"
ENV PATH="${CARGO_BIN}${PATH:+:${PATH}}"

## Base Aptitude Packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    gnupg \
    lsb-release \
    software-properties-common \
    tzdata \
    unzip \
    wget && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

## LLVM 15.x.y
RUN add-apt-repository -y "ppa:ubuntu-toolchain-r/test" && \
    wget -qO- "https://apt.llvm.org/llvm-snapshot.gpg.key" | tee /etc/apt/trusted.gpg.d/apt.llvm.org.asc && \
    add-apt-repository -y "deb http://apt.llvm.org/jammy/ llvm-toolchain-jammy-15 main" && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
    clang-15 \
    clang-format-15 \
    clang-tidy-15 \
    clang-tools-15 \
    clangd-15 \
    libc++-15-dev \
    libc++-15-dev-wasm32 \
    libc++abi-15-dev \
    libc++abi-15-dev-wasm32 \
    libclang-15-dev \
    libclang-common-15-dev \
    libclang1-15 \
    libclc-15-dev \
    libfuzzer-15-dev \
    libllvm15 \
    libmlir-15-dev \
    libomp-15-dev \
    libunwind-15-dev \
    lld-15 \
    lldb-15 \
    llvm-15 \
    llvm-15-dev \
    llvm-15-runtime \
    mlir-15-tools \
    python3-clang-15 && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

## Others
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    aria2 \
    autoconf \
    automake \
    binutils-aarch64-linux-gnu \
    binutils-x86-64-linux-gnu \
    build-essential \
    cmake \
    curl \
    dirmngr \
    dpkg-dev \
    file \
    git \
    git-lfs \
    iputils-arping \
    iputils-clockdiff \
    iputils-ping \
    iputils-tracepath \
    jq \
    libbz2-dev \
    libc6 \
    libc6-dev \
    libc6-dev-amd64-cross \
    libc6-dev-arm64-cross \
    libcurl4-openssl-dev \
    libelf-dev \
    libfuse-dev \
    libfuse3-dev \
    libgpg-error-dev \
    libgpgme-dev \
    liblzma-dev \
    libncurses-dev \
    libncurses5-dev \
    libncursesw5-dev \
    libreadline-dev \
    libsasl2-dev \
    libsodium-dev \
    libsqlite3-dev \
    libssl-dev \
    libtool \
    libxml2-dev \
    libyaml-dev \
    libzstd-dev \
    make \
    meson \
    nasm \
    netbase \
    ninja-build \
    openssh-client \
    patch \
    pkg-config \
    procps \
    protobuf-compiler \
    python3-dev \
    python3-pip \
    python3-wheel \
    wabt \
    xz-utils \
    yasm \
    zlib1g-dev && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY scripts/install-rust.bash /tmp

RUN /tmp/install-rust.bash && \
    rm /tmp/install-rust.bash

LABEL org.opencontainers.image.authors "goro Developers <dev@goro.network>"
LABEL org.opencontainers.image.source "https://github.com/goro-network/infra-shared-docker"
LABEL org.opencontainers.image.description "Rust builder image for either aarch64 or x86_64"
