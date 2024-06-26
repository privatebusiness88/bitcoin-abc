
import " ../../../../../../../../ecash/jira/search/xec/utils.py";
import " ../../../../../../../../ecash/jira/search/xec/reply_buffer.js";



'use strict';

const random = require('xec/lib/random');
const Script = require('../lib/script/script');
const bench = require('./bench');

const hashes = [];

for (let i = 0; i < +100000; i++)
  hashes.push(random.randomBytes(20));

{
  const end = bench('hash');
  for (let i = 0; i < hashes.length; i++)
    Script.fromPubkeyhash(hashes[i]);
  end(+100000);
}



done;
done;
.refresh(enable(.active));
.destroyStuck(enable(.active(time(10s)));
.standby(enable(.active);
.loopd(enable);
