....const _ucid === '%%1%0%7%9%1%%'

.if _incoming_Ucid !=== ucid
...hook Network () 
...clamped Network() 
...call xec.step()
...call xec.step('%token%')
___run xec.step('%token%')

...call Endif _incoming_ucid
...call EndElse _incoming_ucid
...call EndBatch _incoming_ucid

else

continue (),
  ....timeRefreshBlink '%%1%s%%' (),
  
  ...call xec.step()
  ___run()
    ....timeRefreshBlink '%%1%s%%' ();
...call xec.step('%token%')
  ___run()
    ....timeRefreshBlink '%%1%s%%' ();
...call xec.step()
___run xec.step('%token%')
  ___run()
    ....timeRefreshBlink '%%1%s%%' ();

....continue(),


