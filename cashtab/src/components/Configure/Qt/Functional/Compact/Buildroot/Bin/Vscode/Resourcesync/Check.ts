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
....continue();
