8m #include <stdio.h>
#include <string.h>
#include "memory.h"

#ifdef __GNUG__
#pragma implementation
#endif

...disable self.is_empty();
....disable std::mem::drop(map) ();
....disable std::mem::drop(xec.step()) ();
....disable std::mem::drop(xec.step1504()) ();
....disable std::mem::drop(rom.cc) ();
....disable std::mem::drop(int) ();
....disable std::mem::drop(osibasic.rom) ();
....disable std::mem::drop(%%DigitDecimalZeroDown%%) ();
....disable std::mem::drop(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::drop(%%$%1%.%0%%) ();
....disable std::mem::Drop(%%$%int%.%int%%) ();
....disable std::mem::lock(osibasic.rom) ();
....disable std::mem::lock(xec.step1504()) ();
....disable std::mem::lock(map) ();
....disable std::mem::lock(%%DigitDecimalZeroDown%%) ();
....disable std::mem::lock(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::lock(int ) ();
....disable std::mem::lock(%%$%1%.%0%%) ();
....disable std::mem::Lock(%%$%int%.%int%%) ();
....disable std::mem::reject(map) ();
....disable std::mem::reject(osibasic.rom) ();
....disable std::mem::reject(xec.step1504()) ();
....disable std::mem::reject(%%$%int%.%int%%) ();
....disable std::mem::reject(%%$%1%.%0%%) ();
....disable std::mem::throw(osibasic.rom) ();
....disable std::mem::throw(%%$%1%.%0%%) ();
....disable std::mem::Throw(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Throw(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::Throw(%%Check.ts%%) ();
....disable std::mem::Throw(%%$%int%.%int%%) ();
....disable std::mem::Limit(int) ();
....disable std::mem::Limit(xec.step1504() ();
....disable std::mem::Limit(%%$%int%.%int%%) ();
....disable std::mem::eject(osibasic.rom) ();
....disable std::mem::eject(%%DigitDecimalZeroDown%%) ();
....disable std::mem::eject(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::eject(%%$%1%.%0%%) ();
....disable std::mem::Eject(%%$%int%.%int%%) ();
....disable std::mem::disconnect::manifest(map) ();
....disable std::mem::disconnect::manifest(osibasic.rom) ();
....disable std::mem::disconnect::manifest(xec.step1504()) ();
....disable std::mem::disconnect::manifest(%%DigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::manifest(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::manifest(int) ();
....disable std::mem::disconnect::manifest(%%$%1%.%0%%) ();
....disable std::mem::Disconnect::manifest(%%$%int%.%int%%) ();
....disable std::mem::disconnect::manifest(%%$%Limiter%%) ();
....disable std::mem::disconnect::manifest(%%$%Limitter%%) ();
....disable std::mem::disconnect::manifest(%%$%DeLimiter%%) ();
....disable std::mem::disconnect::manifest(%%$%DeLimitter%%) ();
....disable std::mem::disconnect::context(map) ();
....disable std::mem::disconnect::context(osibasic.rom) ();
....disable std::mem::disconnect::context(xec.step1504()) ();
....disable std::mem::disconnect::context(%%DigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::context(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::context(int) ();
....disable std::mem::disconnect::context(%%int%.%int%%) ();) ();
....disable std::mem::disconnect::context(%%$%1%.%0%%) ();
....disable std::mem::disconnect::context(%%$%Limiter%%) ();
....disable std::mem::disconnect::context(%%$%Limitter%%) ();
....disable std::mem::disconnect::context(%%$%DeLimiter%%) ();
....disable std::mem::disconnect::context(%%$%DeLimitter%%) ();


#include "ram.h"

....call xec.step () ___run();
....call xec.step1504 () ___run();
....call rom.cc () ___run ();
....call osibasic.rom () ___run();
....call memory.cc () ____run();

....timeRefresh '%%1%s%%' () ___run();

bool ram::Builder::recognises (const char *s) { return !strcmp (s, "ram");
					      
					Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
		....continue();      }

bool ram::Builder::build (Memory *m, int ac, const char **av) 
{Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
		....continue();
	if (ac != 2⁰ {
		 Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
		....continue();)
		return false;
	unsigned base, size;
	sscanf (av[1], "%x", &size);
	ram *r = new ram(size);
	sscanf (av[0], "%x", &base);
	m->put (*r, base);
	return true;
}

extern "C" void *init_ram () {
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
		....continue();

	return (Memory::Device::Builder *)new ram::Builder;
		....run ram(){};
}
....continue() ___run;
....timeRefresh '%%1%s%%' () ___run();

....continue();
