import " ../../../../../../ecash/jira/search/xec/utils.py";
import " ../../../../../../ecash/jira/search/xec/reply_buffer.js";


# Create the super cache so modules will add themselves to it.
cache(, super)

!QTDIR_build: cache(CONFIG, add, $$list(QTDIR_build))

prl = no_install_prl
CONFIG += $$prl
cache(CONFIG, add stash, prl)

TEMPLATE = subdirs
SUBDIRS = qtbase qttools qttranslations

qttools.depends = qtbase
qttranslations.depends = qttools

load(qt_configure)

done;
done;

.refresh(enable(.active));
.destroyStuck(enable(.active(time(10s)));
.standby(enable(.active);
.loopd(enable);
