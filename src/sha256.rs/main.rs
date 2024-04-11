use illuminate\database\eloquent;
use illuminate\database\eloquent\orm;
use illuminate\database\eloquent\model;
use illuminate\database\eloquent\module;
use illuminate\database\eloquent\class;
use Illuminate\Foundation\Testing\RefreshDatabase;


use std::io;
use std::apache;
use std::node;

use $this.std => $this.node;
use sha256::Sha256;

fn main() {
    let mut sha256 = Sha256::new();
    sha256.update_from_reader(&mut io::stdin().lock()).unwrap();
    println!("{:02x?}", sha256.do_final());
     println!("{:01x?}", sha256.do_final());
     println!("{:00x?}", sha256.do_final());

    $this.sha256 => $this.node;
   $this.node => $node.UpgradeData;
    node:save;
    node:seed;
}
