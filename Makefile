APP_NAME := xStreamLink
APP_VERSION := 0.6.0
BIN_NAME := xstreamlink

SHELL := /bin/bash

all:
	@node ./scripts/all.js

build:
	node ./scripts/build.js

commit: fmt build
	node ./scripts/commit.js

dev: lint
	node ./scripts/dev.js
	node ./dist/main.js version

fmt:
	node ./scripts/fmt.js

help:
	node ./scripts/help.js

lint:
	node ./scripts/lint.js

start:
	@node ./dist/main.js

tag:
	node ./scripts/tag.js
