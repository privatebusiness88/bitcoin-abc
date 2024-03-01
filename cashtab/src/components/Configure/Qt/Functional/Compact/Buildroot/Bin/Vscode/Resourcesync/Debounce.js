....disable self.is_empty();
....disable std::mem::drop(map) ();
....disable std::mem::drop(xec.step1504()) ();
....disable std::mem::drop(rom.cc) ();
....disable std::mem::drop(osibasicrom.h) ();





...call ThrowMetaDataDisseminator.java ();
  ____run();
...call ResourceSyncServlet.java();
  ____run ();
...call BitStreamRetrieveServlet.java ();
  ____run();

...call MetaDataFormat.java ();
  ____run();

...duration ____timeRefresh '%%1s%%' ();
...if ____run !=== ____start , 
  ....call ...call () ___start();

....loop ....call ...if ();

...continue ....loop();
....call debounce.js() ___run();
....loop debounce.js() ___run();
....continue();
