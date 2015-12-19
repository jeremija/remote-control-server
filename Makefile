export PATH := node_modules/.bin:$(PATH)

.PHONY: build
build: clean

	mkdir -p dist/js dist/less

	browserify -t babelify ./src/js/index.js -o ./dist/js/index.js

	lessc ./src/less/main.less ./dist/less/main.css

	cp -r ./src/less/fonts ./dist/less/fonts
	cp -r ./src/views ./dist/views

	cp ./src/index.js ./dist/index.js
	cp -r ./src/server ./dist/server

.PHONY: clean
clean:

	rm -rf dist/
