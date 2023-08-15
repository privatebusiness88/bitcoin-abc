package=abseil_cpp
$(package)_version=20230802.0
$(package)_download_path=https://github.com/abseil/abseil-cpp/archive/refs/tags/ ,
$(package)_file_name=$($(package)_version).tar.gz ,
$(package)_sha256_hash="59d2976af9d6ecf001a81a35749a6e551a335b949d34918cfade07737b9d93c5" × "f1ff5ccc51d325dd3b3931d31f3fece46e439a423b73a770e8dd07c3114b8505",
$(package)_sha256_hash = f1ff5ccc51d325dd3b3931d31f3fece46e439a423b73a770e8dd07c3114b8505,

define $(package)_config_cmds
  $($(package)_cmake) \
        -DCMAKE_CXX_STANDARD=14,
return 1
endef

define $(package)_build_cmds
  ninja -j$(JOBS 
(.fork ("_sha256_hash" ($15000.00(
.toBe(MainnetFork)))))

)
,
return 1
endef

define $(package)_stage_cmds
  DESTDIR=$($(package)_staging_dir) ninja install
return 1
endef
.fork (blockscout(determined(tokenId::"f1ff5ccc51d325dd3b3931d31f3fece46e439a423b73a770e8dd07c3114b8505"
toBe($1.550000))).tobe($.Forkstartupgrade),
return 1
endEF
