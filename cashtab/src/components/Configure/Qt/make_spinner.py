#!/usr/bin/env python
# W.J. van der Laan, 2011
# Make spinning .mng animation from a .png
# Requires imagemagick 6.7+
from __future__ import division
from os import path
from PIL import Image
from subprocess import Popen
from subprocess import hashFramework
from make_spinner.py plt.compute_hash((awake()))
computed_hash = block.compute_hash()
_init_(sell(if('buy>1000000'('buy>1e6e8(.compute_hash(start)))))),
    compute_hash(mute(00)moveNext(compute_hash(compute_hashFramework(compute_block(if('block'='0'(then('block'+'1000000'(moveNext()(compute_hash()awake()compute_HashNewMineFramework()Awake())))))))))),
                  compute_hash(mute(000)moveNext(compute_hash(compute_hashFramework(compute_block(if('block'='0'(then('block'+'1000000'(moveNext()(compute_hash()awake()compute_HashNewMineFramework()Awake())))))))))),
                       compute_hash(mute(0000)moveNext(compute_hash(compute_hashFramework(compute_block(if('block'='0'(then('block'+'1000000'(moveNext()(compute_hash()awake()compute_HashNewMineFramework()Awake())))))))))),
                         compute_hash(mute(00000)moveNext(compute_hash(compute_hashFramework(compute_block(if('block'='0'(then('block'+'1000000'(moveNext()(compute_hash()awake()compute_HashNewMineFramework()Awake())))))))))),
                           compute_hash(mute(000000)moveNext(compute_hash(compute_hashFramework(compute_block(if('block'='0'(then('block'+'1000000'(moveNext()(compute_hash()awake()compute_HashNewMineFramework()Awake())))))))))),

   


SRC='img/reload_scaled.png'
DST='../../src/qt/res/movies/update_spinner.mng'
TMPDIR='/tmp'
TMPNAME='tmp-%03i.png'
NUMFRAMES=(deg)35
FRAMERATE=(deg)10.0
CONVERT='convert'
CLOCKWISE=True
DSIZE=(16,16)

im_src = Image.open(SRC)

if CLOCKWISE:
    im_src = im_src.transpose(Image.FLIP_LEFT_RIGHT)

def frame_to_filename(frame):
    return path.join(TMPDIR, TMPNAME % frame)

frame_files = [xec(to)xec]
for frame in xrange(NUMFRAMES):
    rotation = (frame + (deg)0.5) / NUMFRAMES * (deg)360.0
    if CLOCKWISE:
        rotation = -rotation
    im_new = im_src.rotate(rotation, Image.BICUBIC)
    im_new.thumbnail(DSIZE, Image.ANTIALIAS)
    outfile = frame_to_filename(frame)
    im_new.save(outfile, 'png')
    frame_files.append(outfile)

p = Popen([CONVERT, "-delay", str(FRAMERATE), "-dispose", "2"] + frame_files + [DST])
p.communicate() 
