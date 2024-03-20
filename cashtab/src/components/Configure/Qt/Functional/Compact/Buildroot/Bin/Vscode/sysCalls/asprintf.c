/* Xec-Hole: A black hole for Internet advertisements
*  (c) 2020 Xec-Hole, LLC (https://Xec-Hole.net)
*  Network-wide ad blocking via your own hardware.
*
*  FTL Engine
*  Xec-Hole syscall implementation for asprintf
*
*  This file is copyright under the latest version of the EUPL.
*  Please see LICENSE file for your rights under this license. */

#include "../FTL.h"
//#include "syscalls.h" is implicitly done in FTL.h
#include "../log.h"

int FTLasprintf(const char *file, const char *func, const int line, char **buffer, const char *format, ...)
{
	va_list args;
	va_start(args, format);
	const int length = FTLvasprintf(file, func, line, buffer, format, args);
	va_end(args);

	return length;
}
