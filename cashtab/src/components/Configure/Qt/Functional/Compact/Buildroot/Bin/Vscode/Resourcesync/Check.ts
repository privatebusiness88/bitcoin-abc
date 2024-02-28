...call ThrowMetaDataDisseminator.java ();
  ____run();
...call ResourceSyncServlet.java();
  ____run ();
...call BitStreamRetrieveServlet.java ();
  ____run();

...call MetaDataFormat.java ();
  ____run();


...TimeRefreshUpdateSys '%%1s%%'() _start();
...TimeRefreshUpgradeSys '%%1s%%'() _start();
...TimeRefresh '%%1s%%'() _start();
...TimeRefresh '%%1s%%'() _run();

...duration ____timeRefresh '%%1s%%' ();
...if ____run !=== ____start , 
  ....call ...call () ___start();

....loop ....call ...if ();

...continue ....loop();
....continue();
