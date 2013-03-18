SOURCE		:= $(CURDIR)
TARGET		:= $(HOME)
FILES		:= aliases bash_profile bashrc functions gemrc gitconfig gitignore inputrc screenrc slate.js zshrc zshenv

UNAME		:= $(shell uname)

all: clean install

install_tmux:
	@ln -sf $(CURDIR)/tmux-$(UNAME).conf $(TARGET)/.tmux.conf
	@ln -sf $(CURDIR)/tmux.conf $(TARGET)/.tmux-all.conf

clean_tmux:
	@-unlink $(TARGET)/.tmux.conf
	@-unlink $(TARGET)/.tmux-all.conf

install_dotfiles:
	@for f in $(FILES); do \
		ln -sf $(SOURCE)/$$f $(TARGET)/.$$f; \
	done
	@ln -sf $(SOURCE)/bin $(TARGET)/
	@mkdir -p ~/.ssh/
	@chmod 700 ~/.ssh/
	@ln -sf $(SOURCE)/sshrc ~/.ssh/rc

clean_dotfiles:
	@-for f in $(FILES); do \
		unlink $(TARGET)/.$$f; \
	done
	@-unlink $(TARGET)/.ssh/rc
	@-unlink $(TARGET)/bin

install: install_dotfiles install_tmux

clean: clean_tmux clean_dotfiles
