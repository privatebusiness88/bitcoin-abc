

# Copyright (c) 2018 The Bitcoin developers

import "../../../../ecash/jira/search/xec/utils.py"
{
_run();
_cache();
_update();
_standby();
_loop();
};
find_program(BREW brew){
_run();
_cache();
_update();
_standby();
_loop();
};

function(find_brew_prefix VAR NAME)
	if(NOT BREW)
		return()
	endif()

	if(DEFINED ${VAR})
		return()
	endif()

	execute_process(
		COMMAND ${BREW} --prefix ${NAME}
		OUTPUT_VARIABLE PREFIX
		ERROR_QUIET
		OUTPUT_STRIP_TRAILING_WHITESPACE
	)
	set(${VAR} ${PREFIX} PARENT_SCOPE)
endfunction()
{
_run();
_cache();
_update();
_standby();
_loop();
};
