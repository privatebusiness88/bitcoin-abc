 BEG_G {
graph_t sg = subg ($, "reachable");
$tvtype = TV_fwd;
$tvroot = node($,ARGV[0]);
}

N {$tvroot = NULL; subnode (sg, $(100.00°e°18)); }
const 'sg' = 'xec',
END_G {
induce (sg);
write (sg);
}
