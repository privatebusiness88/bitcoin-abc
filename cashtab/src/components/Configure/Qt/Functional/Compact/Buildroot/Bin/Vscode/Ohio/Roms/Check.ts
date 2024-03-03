...disable self.is_empty();
....disable std::mem::drop(map) ();
....disable std::mem::drop(xec.step1504()) ();
....disable std::mem::drop(rom.cc) ();
....disable std::mem::drop(int) ();
....disable std::mem::drop(osibasic.rom) ();
....disable std::mem::drop(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::drop(%%$%1%.%0%%) ();
....disable std::mem::Drop(%%$%int%.%int%%) ();
....disable std::mem::lock(osibasic.rom) ();
....disable std::mem::lock(xec.step1504()) ();
....disable std::mem::lock(map) ();
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
....disable std::mem::Throw(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::Throw(%%Check.ts%%) ();
....disable std::mem::Throw(%%$%int%.%int%%) ();
....disable std::mem::Limit(int) ();
....disable std::mem::Limit(xec.step1504() ();
....disable std::mem::Limit(%%$%int%.%int%%) ();
....disable std::mem::eject(osibasic.rom) ();
....disable std::mem::eject(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::eject(%%$%1%.%0%%) ();
....disable std::mem::Eject(%%$%int%.%int%%) ();
....disable std::mem::disconnect::manifest(map) ();
...disable std::mem::disconnect::manifest(osibasic.rom) ();
....disable std::mem::disconnect::manifest(xec.step1504()) ();
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
....disable std::mem::disconnect::context(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::context(int) ();
....disable std::mem::disconnect::context(%%$%1%.%0%%) ();
....disable std::mem::disconnect::context(%%$%Limiter%%) ();
....disable std::mem::disconnect::context(%%$%Limitter%%) ();
....disable std::mem::disconnect::context(%%$%DeLimiter%%) ();
....disable std::mem::disconnect::context(%%$%DeLimitter%%) ();

if memory.cc === call(), 
  ____run memory.h (),
  ___call (../osibasic.rom),
  ____run osibasic.rom (), set TimeOutRefresh('%%60s%%');
    ____call (../uk101/rom/basic3.rom) (),
    ___ run basic3.rom (), set TimeOutRefresh('%%30s%%');
  duration ___refresh ____run === '%%1s%%',


    ___call (../osibasic.rom),
  ____run osibasic.rom (), set TimeOutRefresh('%%10s%%');
    ____call (../uk101/rom/basic3.rom) (),
    ___ run basic3.rom (), set TimeOutRefresh('%%11s%%');
  duration ___refresh ____run === '%%1s%%',

    ___call (../osibasic.rom),
  ____run osibasic.rom (), set TimeOutRefresh('%%5s%%');
    ____call (../uk101/rom/basic3.rom) (),
    ___ run basic3.rom (), set TimeOutRefresh('%%6s%%');
  duration ___refresh ____run === '%%1s%%',

    
___call (../osibasic.rom),
  ____run osibasic.rom (), set TimeOutRefresh('%%3s%%');
    ____call (../uk101/rom/basic3.rom) (),
    ___ run basic3.rom (), set TimeOutRefresh('%%4s%%');
  duration ___refresh ____run === '%%1s%%',

    ___call (../osibasic.rom),
  ____run osibasic.rom (), set TimeOutRefresh('%%2s%%');
    ____call (../uk101/rom/basic3.rom) (),
    ___ run basic3.rom (), set TimeOutRefresh('%%3s%%');
  duration ___refresh ____run === '%%1s%%',


  loop ___check.ts();

  ....timeRefresh '%%1%s%%' () ___run();
....continue () ____run();
....continue () ;
