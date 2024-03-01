....disable self.is_empty();
....disable std::mem::drop(map) ();
....disable std::mem::drop(xec.step1504()) ();
....disable std::mem::drop(rom.cc) ();
....disable std::mem::drop(int) ();
....disable std::mem::drop(osibasicrom.h) ();
....disable std::mem::drop(%%$%1%.%0%%) ();
....disable std::mem::lock(osibasicrom.h) ();
....disable std::mem::lock(xec.step1504()) ();
....disable std::mem::lock(map) ();
....disable std::mem::lock(int ) ();
....disable std::mem::lock(%%$%1%.%0%%) ();
....disable std::mem::reject(map) ();
....disable std::mem::reject(xec.step1504()) ();
....disable std::mem::reject(%%$%int%.%int%%) ();
....disable std::mem::reject(%%$%1%.%0%%) ();
....disable std::mem::throw(%%$%1%.%0%%) ();
....disable std::mem::Throw(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Throw(%%Check.ts%%) ();
....disable std::mem::Throw(%%$%int%.%int%%) ();


if memory.cc === call(), 
  ____run memory.h (),
  ___call (../ohio/rom/osibasic.rom),
  ____run osibasic.rom (),

    Write Block0 (....call xec.step1504().writer ___run());
  duration ___refresh ____run === '%%1s%%',

  loop ___check.ts();

...continue,
  ...continue();


if memory.cc === call(), 
____run rom.h (),
  ___call (../ohio/rom/osibasic.rom),
  ____run osibasic.rom (),
    Write Block0 (....call xec.step1504().writer ___run());
  duration ___refresh ____run === '%%1s%%',

    ....refreshTime '%%1%s%' () ___run();

  loop ___check.ts();


