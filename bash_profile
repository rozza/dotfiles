# -*- mode: sh -*-

# this is for OS X, because it doesn't load bashrc on each login, it
# loads bash_profile.

if [ -r ~/.profile ]; then . ~/.profile; fi
case "$-" in *i*) if [ -r ~/.bashrc ]; then . ~/.bashrc; fi;; esac

#THIS MUST BE AT THE END OF THE FILE FOR GVM TO WORK!!!
[[ -s "/Users/rozza/.gvm/bin/gvm-init.sh" ]] && source "/Users/rozza/.gvm/bin/gvm-init.sh"
