install:
	npm ci

prepare-docker:
	mkdir -p code
	echo "<!DOCTYPE html><html lang='ru'><head><meta charset='UTF-8' /><title>RSS агрегатор</title></head><body><div id='root'></div><script type='module' src='/src/main.js'></script></body></html>" > code/index.html
	cp -r src code/
	cp package.json code/
	cp package-lock.json code/
	cp vite.config.js code/
	cp .eslintrc.cjs code/

debug-build:
	@echo "Current directory: $$PWD"
	@dir
	npm run build

setup: prepare-docker
	cd code && npm install

dev:
	npm run dev

build:
	npm run build

copy-html:
	copy index.html dist

full-build: build copy-html

build-docker: prepare-docker
	cd code && npm run build

preview:
	npm run preview

lint:
	npm run lint

lint-fix:
	npm run lint:fix

test:
	npm test

test-coverage:
	npm test -- --coverage

ci: install lint build

.PHONY: install prepare-docker setup dev build build-docker preview lint lint-fix test test-coverage ci
