....call osibasic.rom (), 
  .....run ....call (osibasic.rom),


  ....call basic3.rom (),
  ....run ....call (basic3.rom),

  ....updateSys (),
  ____updateSys (),


  ....throw digitDecimalZeroDown () ___start(),

  .if find {'%%break%%' { .changeTo {'%%breakDigitDecimalZeroDown%%'{___run}}}};
  _____refreshUpdateSys '%%10s%%',
  ______RefreshTime '%%1s%%';

  
