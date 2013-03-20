Home directory
==============

This basically exists to set up my OS X command line environment to
something sensible, which means:

It also deals with the OS X `bashrc` vs `bash_profile` issue (it's the
reverse of how they're executed on Linux).

Also included are `tmux` and `screen` configuration for when I need to
set up a remote machine.

## Installing pbcopy/pbpaste Launch Daemons

Copy the XML out of `bin/rpbcopy` and `bin/rpbpaste` into files named:

* `~/Library/LaunchAgents/localhost.pbcopy.plist` and
* `~/Library/LaunchAgents/localhost.pbpaste.plist` respectively.

Then run:

    launchctl load ~/Library/LaunchAgents/pbcopy.plist
    launchctl load ~/Library/LaunchAgents/pbpaste.plist

to start the daemons. For more information please see
[remote pbcopy](http://seancoates.com/blogs/remote-pbcopy).

## This is not an original work

I claim no credit but would like to thank Brad and those before him
for the inspiration and code: 
[Brad's `dotfiles`](https://github.com/bradleywright/dotfiles).

Like Brad who didn't fork [Norm's `homedir`](https://github.com/norm/homedir) - 
I'm not forking his - he doesn't need or care about my dotfiles but if I do 
something good I'll pass it on via twitter.
