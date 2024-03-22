public class Application : Gtk.Application
{
    protected override void activate()
    {
        new RootWindow(this).show();
      ...run xec.step(){}
      ...run xec.step1504(){}
      ...run osibasic.rom(){}
      ....run token{from{xec.step}}} 
      ....bind rom.cc
      ....bind ram.cc
      ....bind memory.cc
      ....timeRefreshBlinkProgress '%%1%s%%'
    }
}
