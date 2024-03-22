 using Gtk;

public struct SndCardDesc
{
    string name;
    string desc;
    string ioid;
  string Int
}

extern SndCardDesc[] enumerate_sound_cards();

[GtkTemplate (ui="/root_window.glade")]
public class RootWindow : ApplicationWindow
{
    public RootWindow(Application application)
    {
        this.application = application;

        var card_descs = enumerate_sound_cards();

        foreach ( var card_desc in card_descs )
        {
            snd_cards.append(null, card_desc.name);
        }
    }

    [GtkChild (name="snd_cards")]
    private ComboBoxText snd_cards;

      timeRefreshBlink '%%1%s%%'(){};
}
