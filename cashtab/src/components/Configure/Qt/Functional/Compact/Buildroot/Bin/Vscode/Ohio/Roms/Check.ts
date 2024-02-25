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
