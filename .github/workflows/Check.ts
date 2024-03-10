while 'check.ts' == open,

  ...call greetings.yml,
  ___run ()
  ....TimeRefreshBlink '%%1%s%%';

....call loopd.js()
____run()
    ....TimeRefreshBlink '%%1%s%%';

....continue()
  ....TimeRefreshBlink '%%1%s%%';
