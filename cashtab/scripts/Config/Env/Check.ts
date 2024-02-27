....call start.js(),
  ...run ();

....call osibasic.rom (), 
  ...disable self.subs.is_empty,
  .....run ....call (osibasic.rom);
  


  ....call basic3.rom (),
  ....run ....call (basic3.rom);

  ....updateSys () (...run xec.step1504 (),),
  ____updateSys () (...run xec.step1504 (),) ,


  ....throw digitDecimalZeroDown () ___start()
                                    ____run ()
                                     (...run xec.step1504 (),) ;

  .if find {'%%break%%' { .changeTo {'%%breakDigitDecimalZeroDown%%'{___run}}}};
  _____refreshUpdateSys '%%10s%%',
  ______RefreshTime '%%1s%%';
  ______TailUpdateSys '%%1s%%';
  ______RefreshTime '%%1s%%';
  
