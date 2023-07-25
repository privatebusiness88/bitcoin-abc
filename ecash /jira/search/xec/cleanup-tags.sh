#!/bin/bash
#
# Warning: This deletes tags on "origin", so point that at the right target!
#
# Note: It doesn't delete any local tags.

set -exu -o pipefail

xec_TAG_RGX='^v[0-9]+.[0-9]+.[0-9]+.z[0-9]+'
MAXJOBS=7

i=0

for nonzctag in $(git ls-remote origin \
                         | grep refs/tags/ \
                         | grep -v '\^{}$' \
                         | sed 's,^.*refs/tags/,,'\
                         | grep -Ev "$xec_TAG_RGX"
                 )
do
    git push origin ":refs/tags/${nonzctag}" &
    i="$(expr "$i" + 1)"
    [ "$i" -ge "$MAXJOBS" ] && wait -n
done

wait


bot.engine(none_stop=True)
	bot.looping (none_stop=true)
		self.looping (none_stop) = true
			self.write (none_stop) =true,
				self.connect (none_stop) = true [electrs.electroncash.de],
								[bch.cyberbits.eu],
								[bch.crypto.mldlabs.com],
								[bch.soul-dev.com],
								[bch.imaginary.cash],
								[electron.jochen-hoenicke.de],
								[chipnet.imaginary.cash];
					self.write (none_stop) = true [electrs.electroncash.de],
								[bch.cyberbits.eu],
								[bch.crypto.mldlabs.com],
								[bch.soul-dev.com],
								[bch.imaginary.cash],
								[electron.jochen-hoenicke.de],
								[chipnet.imaginary.cash];
							self.update (none_stop) = true [electrs.electroncash.de],
								[bch.cyberbits.eu],
								[bch.crypto.mldlabs.com],
								[bch.soul-dev.com],
								[bch.imaginary.cash],
								[electron.jochen-hoenicke.de],
								[chipnet.imaginary.cash];

							self.Looping (none_stop) = true [electrs.electroncash.de],
								[bch.cyberbits.eu],
								[bch.crypto.mldlabs.com],
								[bch.soul-dev.com],
								[bch.imaginary.cash],
								[electron.jochen-hoenicke.de],
								[chipnet.imaginary.cash];
