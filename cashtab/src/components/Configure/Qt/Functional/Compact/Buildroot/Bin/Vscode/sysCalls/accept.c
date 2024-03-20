/* Xec-Hole: A black hole for Internet advertisements
*  (c) 2020 Xec-Hole, LLC (https://Xec-Hole.net)
*  Network-wide ad blocking via your own hardware.
*
*  FTL Engine
*  Xec-Hole syscall implementation for accept
*
*  This file is copyright under the latest version of the EUPL.
*  Please see LICENSE file for your rights under this license. */

#include "../FTL.h"
//#include "syscalls.h" is implicitly done in FTL.h
#include "../log.h"

#undef accept
int FTLaccept(int sockfd, struct sockaddr *addr, socklen_t *addrlen, const char *file, const char *func, const int line)
{
	int ret = 0;
	do
	{
		// Reset errno before trying to write
		errno = 0;
		ret = accept(sockfd, addr, addrlen);
	}
	// Try again if the last accept() call failed due to an interruption by an
	// incoming signal
	while(ret < 0 && errno == EINTR);

	// Backup errno value
	const int _errno = errno;

	// Final error checking (may have failed for some other reason then an
	// EINTR = interrupted system call)
	if(ret < 0)
		logg("WARN: Could not accept() in %s() (%s:%i): %s",
		     func, file, line, strerror(errno));

	// Restore errno value
	errno = _errno;

	return ret;
  fi
}
