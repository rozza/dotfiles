# -*- mode:sh -*-

# These are utility functions that are compatible with bash and zsh.

UNAME=`uname`

# Add directory to PATH if it exists and is not already there.
# This has come from: http://superuser.com/a/462852/76009
normalise_path() {
    PATH=${PATH//":$1"/} # deletes any instances in the middle or at the end
    PATH=${PATH//"$1:"/} # deletes any instances at the start
    export PATH
}

prepend_path () {
    if [ "$path" ]; then
        path=($1 $path)
    else
        normalise_path $1
        export PATH="$1:$PATH" # prepend to beginning
    fi
}

append_path () {
    if [ "$path" ]; then
        path=($path $1)
    else
        normalise_path $1
        export PATH="$PATH:$1" # append to end
    fi
}

find_homebrew() {
    # explicitly put homebrew bin in PATH, as other shells might not
    # find it
    if [ $UNAME = Darwin ] && command -v brew > /dev/null; then
        prepend_path `brew --prefix`/bin
    fi
}

find_completion() {
    case $1 in
        zsh*)
            # shared zsh completions
            if [ -d /usr/local/share/zsh-completions ]; then
                fpath=(/usr/local/share/zsh-completions $fpath)
            elif command -v brew > /dev/null && [ -d `brew --prefix`/share/zsh-completions ]; then
                fpath=(`brew --prefix`/share/zsh-completions $fpath)
            fi
            # homebrew rbenv
            if command -v brew > /dev/null; then
                local homebrew=`brew --prefix`
                source_if_exists $homebrew/Library/LinkedKegs/rbenv/completions/rbenv.zsh
                if [ -f $homebrew/Library/LinkedKegs/git/etc/bash_completion.d/git-completion.bash ]; then
                    zstyle ':completion:*:*:git:*' script $homebrew/Library/LinkedKegs/git/etc/bash_completion.d/git-completion.bash
                elif [ -f $homebrew/Library/LinkedKegs/git/etc/bash_completion.d/git-completion.sh ]; then
                    zstyle ':completion:*:*:git:*' script $homebrew/Library/LinkedKegs/git/etc/bash_completion.d/git-completion.sh
                fi
            fi
            ;;
        *)
            # enable programmable completion features (you don't need
            # to enable this, if it's already enabled in
            # /etc/bash.bashrc and /etc/profile sources
            # /etc/bash.bashrc).
            if [ $UNAME = Linux ] && ! shopt -oq posix; then
                if [ -f /etc/bash_completion ]; then
                    source /etc/bash_completion
                elif [ -d /etc/bash_completion.d ]; then
                    echo "Run 'sudo apt-get install bash-completion' to install completion"
                fi
                source_if_exists /usr/local/etc/bash_completion.d/git-completion.bash
                source_if_exists /usr/local/etc/bash_completion.d/git-completion.sh
            elif [ $UNAME = Darwin ] && command -v brew > /dev/null; then
                if [ -f `brew --prefix`/etc/bash_completion ]; then
                    . `brew --prefix`/etc/bash_completion
                fi
            fi
            ;;
    esac
}

find_ruby() {
    # Ruby libraries

    # check for rbenv first
    local FOUND_RBENV=false

    if [ -d $HOME/.rbenv ]; then
        prepend_path $HOME/.rbenv/bin
        prepend_path $HOME/.rbenv/shims
        FOUND_RBENV=true
    elif command -v brew > /dev/null && [ -d `brew --prefix`/Library/LinkedKegs/rbenv ]; then
        prepend_path `brew --prefix`/Library/LinkedKegs/rbenv/bin
        prepend_path `brew --prefix`/Library/LinkedKegs/shims
        FOUND_RBENV=true
    fi

    prepend_path ./.bundle/bin
}

fix_path() {
    # Add any local scripts I run into PATH
    if [ -d $HOME/bin ]; then
        prepend_path $HOME/bin
    fi
}

set_editor() {
    EDITOR="vim"
    case $UNAME in
        Darwin*)
            EDITOR=$EDITOR
            ;;
        Linux*)
            EDITOR="$EDITOR -t"
            ;;
    esac
    export EDITOR
    export VISUAL=$EDITOR
    export GIT_EDITOR=$EDITOR
}


git_prompt_info() {
    # Adds git information to my prompt
    if type __git_ps1 >/dev/null 2>&1; then
        GIT_PS1_SHOWDIRTYSTATE=true
        echo $(__git_ps1 '%s')
    else
        local BRANCH=$(git symbolic-ref HEAD 2>/dev/null) || return
        echo "${BRANCH#refs/heads/}"
    fi
}

# Source a file if it exists
source_if_exists() {
    [ -f $1 ] && source $1
}
