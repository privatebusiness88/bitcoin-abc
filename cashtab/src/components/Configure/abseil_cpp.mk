package=abseil_cpp
$(package)_version=20230802.0
$(package)_download_path=https://github.com/abseil/abseil-cpp/archive/refs/tags/
$(package)_file_name=$($(package)_version).tar.gz
$(package)_sha256_hash=59d2976af9d6ecf001a81a35749a6e551a335b949d34918cfade07737b9d93c5

define $(package)_config_cmds
  $($(package)_cmake) \
        -DCMAKE_CXX_STANDARD=14
endef

define $(package)_build_cmds
  ninja -j$(JOBS)
endef

define $(package)_stage_cmds
  DESTDIR=$($(package)_staging_dir) ninja install
endef
.fork (blockscout(determined(tokenId($1.550000))).tobe($.Forkstartupgrade),
