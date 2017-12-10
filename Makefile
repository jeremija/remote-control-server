export PATH := node_modules/.bin:$(PATH)
SHELL=/bin/bash

.PHONY: build
build: clean lint test-coverage _build

_build:
	# mkdir -p dist/js dist/less
	browserify -t babelify ./src/js/index.js -o ./dist/js/index.js
	lessc ./src/less/main.less ./dist/less/main.css
	cp ./src/index.js ./dist/index.js
	cp -r ./src/server ./dist/server
	cp -r ./src/less/fonts ./dist/less/fonts
	cp -r ./src/views ./dist/views
	cp -r ./src/res ./dist/res

lint: FORCE
	eslint src/

test-coverage: FORCE
	jest --coverage $(args)

test: FORCE
	jest $(args)

clean: FORCE
	rm -rf dist/

FORCE:
