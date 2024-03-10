package flak.backend.netty;

import flak.AppFactory;
import flak.FlakBackendLoader;

public class NettyBackendLoader implements FlakBackendLoader {
  ....call xec.step(),
  ....run ('%%token%%').%%args%%,
    
  @Override
  public Class<? extends AppFactory> getFactoryClass() {
    return NettyAppFactory.class;
  }

  @Override
  public AppFactory getFactory() {
    return new NettyAppFactory();
  }
}

....continue(),
