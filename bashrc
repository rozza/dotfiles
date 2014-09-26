# -*- mode: sh -*-

# If not running interactively, don't do anything
[ -z "$PS1" ] && return

# don't put duplicate lines in the history. See bash(1) for more options
# ... or force ignoredups and ignorespace
HISTCONTROL=ignoredups:ignorespace

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=10000
HISTFILESIZE=20000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

export GIT_EDITOR="vim"
export VISUAL="vim"

# which platform?
UNAME=`uname`

if [ -f $HOME/.functions ]; then
    source $HOME/.functions
fi

# find_git
# find_brew
find_completion
find_ruby
# find_subl
fix_path

# local changes
if [ -f ~/.local_bashrc ]; then
    . ~/.local_bashrc
fi

# include aliases
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# Colours
txtblk='\[\033[0;30m\]' # Black - Regular
txtred='\[\033[0;31m\]' # Red
txtgrn='\[\033[0;32m\]' # Green
txtylw='\[\033[0;33m\]' # Yellow
txtblu='\[\033[0;34m\]' # Blue
txtpur='\[\033[0;35m\]' # Purple
txtcyn='\[\033[0;36m\]' # Cyan
txtwht='\[\033[0;37m\]' # White
bldblk='\[\033[1;30m\]' # Black - Bold
bldred='\[\033[1;31m\]' # Red
bldgrn='\[\033[1;32m\]' # Green
bldylw='\[\033[1;33m\]' # Yellow
bldblu='\[\033[1;34m\]' # Blue
bldpur='\[\033[1;35m\]' # Purple
bldcyn='\[\033[1;36m\]' # Cyan
bldwht='\[\033[1;37m\]' # White
unkblk='\[\033[4;30m\]' # Black - Underline
undred='\[\033[4;31m\]' # Red
undgrn='\[\033[4;32m\]' # Green
undylw='\[\033[4;33m\]' # Yellow
undblu='\[\033[4;34m\]' # Blue
undpur='\[\033[4;35m\]' # Purple
undcyn='\[\033[4;36m\]' # Cyan
undwht='\[\033[4;37m\]' # White
bakblk='\[\033[40m\]'   # Black - Background
bakred='\[\033[41m\]'   # Red
bakgrn='\[\033[42m\]'   # Green
bakylw='\[\033[43m\]'   # Yellow
bakblu='\[\033[44m\]'   # Blue
bakpur='\[\033[45m\]'   # Purple
bakcyn='\[\033[46m\]'   # Cyan
bakwht='\[\033[47m\]'   # White
txtrst='\[\033[0m\]'    # Text Reset

# Show stuff in prompt
precmd() {
    # my Tmux config has the host already, so we can hide it from the
    # prompt.
    if [ "$TMUX_PANE" ]; then
        PS1=""
    elif [ "$SSH_CONNECTION" ]; then
        PS1="${txtrst}${txtred}@\h${txtrst} "
    else
        PS1="${txtrst}${txtpur}\h${txtrst} "
    fi

    PS1="${PS1}${txtrst}${txtgrn}\w "
    local ENDPROMPT="> ${txtrst}"
    if [ "$SSH_CONNECTION" ]; then
        ENDPROMPT="${txtred}${ENDPROMPT}"
    fi

    PS1="${PS1}${ENDPROMPT}"
    PS2="${ENDPROMPT}"

    if ${SHOW_GIT_PROMPT:=true} ; then
        if git branch >& /dev/null; then
            if type __git_ps1 >/dev/null 2>&1; then
                GIT_PS1_SHOWDIRTYSTATE=true
                PS1="${txtrst}${txtblk}${bakylw} $(__git_ps1 '%s') ${txtrst} ${PS1}"
            fi
        fi
    fi

    case $TERM in
        xterm*|rxvt*)
            PS1="\[\033]0;\h:\w\007\]${PS1}"
            ;;
    esac
}

PROMPT_COMMAND="precmd;$PROMPT_COMMAND"

export PATH

# Work around tmux asynchronous `if-shell` behaviour
if [ "$TMUX" ] && [ $TERM = "xterm-256color" ]; then
    export TERM="screen-256color"
fi

GOPATH="/Users/rozza/.gopath"


# added by travis gem
[ -f /Users/rozza/.travis/travis.sh ] && source /Users/rozza/.travis/travis.sh

#THIS MUST BE AT THE END OF THE FILE FOR GVM TO WORK!!!
[[ -s "/Users/rozza/.gvm/bin/gvm-init.sh" ]] && source "/Users/rozza/.gvm/bin/gvm-init.sh"
