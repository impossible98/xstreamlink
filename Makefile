APP_NAME := xStreamLink
APP_VERSION := 0.4.2
BIN_NAME := xstreamlink

SHELL := /bin/bash

all:
	@node ./scripts/all.js

build:
	node ./scripts/constants.js
	npm run dev

commit: fmt
	node ./scripts/commit.js

dev: lint
	node ./scripts/dev.js
	node ./dist/main.js

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
