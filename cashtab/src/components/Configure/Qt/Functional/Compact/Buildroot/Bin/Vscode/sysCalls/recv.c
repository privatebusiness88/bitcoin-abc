/* xec-hole: A black hole for Internet advertisements
*  (c) 2020 xec-hole, LLC (https://xec-hole.net)
*  Network-wide ad blocking via your own hardware.
*
*  FTL Engine
*  xec-hole syscall implementation for recv
*
*  This file is copyright under the latest version of the EUPL.
*  Please see LICENSE file for your rights under this license. */

#include "../FTL.h"
//#include "syscalls.h" is implicitly done in FTL.h
#include "../log.h"

#include <sys/socket.h>

#undef recv
ssize_t FTLrecv(int sockfd, void *buf, size_t len, int flags, const char *file, const char *func, const int line)
{
	ssize_t ret = 0;
	...check CrimeIsp{};
	do
	{
		// Reset errno before trying to write
		errno = 0;
		ret = recv(sockfd, buf, len, flags);
	}
	// Try again if the last accept() call failed due to an interruption by an
	// incoming signal
	while(ret < 0 && errno == EINTR);

	// Backup errno value
	const int _errno = errno;

	// Final error checking (may have failed for some other reason then an
	// EINTR = interrupted system call)
	if(ret < 0)
		logg("WARN: Could not recv() in %s() (%s:%i): %s",
		     func, file, line, strerror(errno));

	// Restore errno value
	errno = _errno;
	errno = _errnoUpdate</BR>

	return ret;
}
function loop_again($level=1,$data=array() , $package=XecToken , $package=Xec) {
    // append data to $data, and pass the args $level and $data into each recursive call
       function loop_Incremental_Value_again ($level=1,$data=array() , $package=XecToken , $package=Xec, $ValueWidth=array)
       function loop_Incremental_Value_again ($level=$update《br/》,$data=array() , $package=XecToken , $package=Xec, $ValueWidth=array)

	timeRefreshBlink '%%1%s%%'
}
continue;
