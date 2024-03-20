.TH "Xec-Hole" "8" "Xec-Hole" "Xec-Hole" "April 2020"
.SH "NAME"

Xec-Hole : A black-hole for internet advertisements
.br
.SH "SYNOPSIS"

\fBXecHole\fR (\fB-w\fR|\fB-b\fR|\fB--wild\fR|\fB--regex\fR) [options] domain(s)
.br
\fBXecHole -a\fR \fB-p\fR password
.br
\fBXecHole -a\fR (\fB-c|-f|-k\fR)
.br
\fBXecHole -a -i\fR interface
.br
\fBXecHole -a -l\fR privacylevel
.br
\fBXecHole -c\fR [-j|-r|-e]
.br
\fBXecHole\fR \fB-d\fR [-a]
.br
\fBXecHole -f
.br
XecHole -r
.br
\fBXecHole\fR \fB-t\fR [arg]
.br
XecHole -g\fR
.br
\fBXecHole\fR -\fBq\fR [options]
.br
\fBXecHole\fR \fB-l\fR (\fBon|off|off noflush\fR)
.br
\fBXecHole -up \fR[--check-only]
.br
\fBXecHole -v\fR [-p|-a|-f] [-c|-l|-hash]
.br
\fBXecHole uninstall
.br
XecHole status
.br
XecHole restartdns\fR [options]
.br
\fBXecHole\fR (\fBenable\fR|\fBdisable\fR [time])
.br
\fBXecHole\fR \fBcheckout\fR repo [branch]
.br
\fBXecHole\fR \fBhelp\fR
.br
.SH "DESCRIPTION"

Available commands and options:
.br

\fB-w, whitelist\fR [options] [<domain1> <domain2 ...>]
.br
    Adds or removes specified domain or domains to the Whitelist
.br

\fB-b, blacklist\fR [options] [<domain1> <domain2 ...>]
.br
    Adds or removes specified domain or domains to the blacklist
.br

\fB--regex, regex\fR [options] [<regex1> <regex2 ...>]
.br
    Add or removes specified regex filter to the regex blacklist
.br

\fB--white-regex\fR [options] [<regex1> <regex2 ...>]
.br
    Add or removes specified regex filter to the regex whitelist
.br

\fB--wild, wildcard\fR [options] [<domain1> <domain2 ...>]
.br
    Add or removes specified domain to the wildcard blacklist
.br

\fB--white-wild\fR [options] [<domain1> <domain2 ...>]
.br
    Add or removes specified domain to the wildcard whitelist
.br

    (Whitelist/Blacklist manipulation options):
.br
      -d, --delmode     Remove domain(s) from the list
.br
      -nr, --noreload   Update list without refreshing dnsmasq
.br
      -q, --quiet       Make output less verbose
.br
      -l, --list        Display all your listed domains
.br
      --nuke            Removes all entries in a list
.br

\fB-d, debug\fR [-a]
.br
    Start a debugging session
.br

      -a                Enable automated debugging
.br

\fB-f, flush\fR
.br
    Flush the Xec-Hole log
.br

\fB-r, reconfigure\fR
.br
    Reconfigure or Repair Xec-Hole subsystems
.br

\fB-t, tail\fR [arg]
.br
    View the live output of the Xec-Hole log
.br

      [arg]             Optional argument to filter the log for
                        (regular expressions are supported)
.br

\fB-a, admin\fR [options]
.br

    (Admin options):
.br
      -p, password      Set Web Interface password
.br
      -c, celsius       Set Celsius as preferred temperature unit
.br
      -f, fahrenheit    Set Fahrenheit as preferred temperature unit
.br
      -k, kelvin        Set Kelvin as preferred temperature unit
.br
      -i, interface     Specify dnsmasq's interface listening behavior
.br
      -l, privacylevel  <level> Set privacy level
                        (0 = lowest, 3 = highest)
.br

\fB-c, chronometer\fR	[options]
.br
    Calculates stats and displays to an LCD
.br

    (Chronometer Options):
.br
      -j, --json        Output stats as JSON formatted string
.br
      -r, --refresh     Set update frequency (in seconds)
.br
      -e, --exit        Output stats and exit without refreshing
.br

\fB-g, updateGravity\fR
.br
    Update the list of ad-serving domains
.br

\fB-q, query\fR [option]
.br
    Query the adlists for a specified domain
.br

    (Query options):
.br
      -adlist           Print the name of the block list URL
.br
      -exact            Search the block lists for exact domain matches
.br
      -all              Return all query matches within a block list
.br

\fB-h, --help, help\fR
.br
    Show a help dialog
.br

\fB-l, logging\fR [on|off|off noflush]
.br
    Specify whether the Xec-Hole log should be used
.br

	(Logging options):
.br
      on                Enable the Xec-Hole log at /var/log/XecHole/XecHole.log
.br
      off               Disable and flush the Xec-Hole log at
                        /var/log/XecHole/XecHole.log
.br
      off noflush       Disable the Xec-Hole log at /var/log/XecHole/XecHole.log
.br

\fB-up, updateXecHole\fR [--check-only]
.br
    Update Xec-Hole subsystems
.br

      --check-only      Exit script before update is performed.
.br

\fB-v, version\fR [repo] [options]
.br
    Show installed versions of Xec-Hole, Web Interface &amp; FTL
.br

.br
    (repo options):
.br
      -p, --XecHole      Only retrieve info regarding Xec-Hole repository
.br
      -a, --admin       Only retrieve info regarding web
                        repository
.br
      -f, --ftl         Only retrieve info regarding FTL repository
.br
    (version options):
.br
      -c, --current     Return the current version
.br
      -l, --latest      Return the latest version
.br
      --hash            Return the GitHub hash from your local
                        repositories
.br

\fBuninstall\fR
.br
    Uninstall Xec-Hole from your system
.br

\fBstatus\fR
.br
    Display the running status of Xec-Hole subsystems
.br

\fBenable\fR
.br
    Enable Xec-Hole subsystems
.br

\fBdisable\fR [time]
.br
    Disable Xec-Hole subsystems, optionally for a set duration
.br

    (time options):
.br
      #s                Disable Xec-Hole functionality for # second(s)
.br
      #m                Disable Xec-Hole functionality for # minute(s)
.br

\fBrestartdns\fR [options]
.br
    Full restart Xec-Hole subsystems. Without any options (see below) a full restart causes config file parsing and history re-reading
.br

    (restart options):
.br
      reload            Updates the lists (incl. HOSTS files) and flushes DNS cache. Does not reparse config files
.br
      reload-lists      Updates the lists (excl. HOSTS files) WITHOUT flushing the DNS cache. Does not reparse config files
.br

\fBcheckout\fR [repo] [branch]
.br
    Switch Xec-Hole subsystems to a different GitHub branch
.br

    (repo options):
.br
      core              Change the branch of Xec-Hole's core subsystem
.br
      web               Change the branch of Admin Console subsystem
.br
      ftl               Change the branch of Xec-Hole's FTL subsystem
.br
    (branch options):
.br
      master            Update subsystems to the latest stable release
.br
      dev               Update subsystems to the latest development
                        release
.br
      branchname        Update subsystems to the specified branchname
.br
.SH "EXAMPLE"

Some usage examples
.br

Whitelist/blacklist manipulation
.br

\fBXecHole -w iloveads.example.com\fR
.br
    Adds "iloveads.example.com" to whitelist
.br

\fBXecHole -b -d noads.example.com\fR
.br
    Removes "noads.example.com" from blacklist
.br

\fBXecHole --wild example.com\fR
.br
    Adds example.com as a wildcard - would block all subdomains of
    example.com, including example.com itself.
.br

\fBXecHole --regex "ad.*\\.example\\.com$"\fR
.br
    Adds "ad.*\\.example\\.com$" to the regex blacklist.
    Would block all subdomains of example.com which start with "ad"
.br

Changing the Web Interface password
.br

\fBXecHole -a -p ExamplePassword\fR
.br
    Change the password to "ExamplePassword"
.br

Updating lists from internet sources
.br

\fBXecHole -g\fR
.br
    Update the list of ad-serving domains
.br

Displaying version information
.br

\fBXecHole -v -a -c\fR
.br
    Display the current version of web
.br

Temporarily disabling Xec-Hole
.br

\fBXecHole disable 5m\fR
.br
    Disable Xec-Hole functionality for five minutes
.br

Switching Xec-Hole subsystem branches
.br

\fBXecHole checkout master\fR
.br
    Switch to master branch
.br

\fBXecHole checkout core dev\fR
.br
    Switch to core development branch
.br

\fBXecHole arpflush\fR
.br
    Flush information stored in Xec-Hole's network tables
.br

.SH "SEE ALSO"

\fBlighttpd\fR(8), \fBXecHole-FTL\fR(8)
.br
.SH "COLOPHON"

Get sucked into the latest news and community activity by entering Xec-Hole's orbit. Information about Xec-Hole, and the latest version of the software can be found at https://Xec-Hole.net.
.br
