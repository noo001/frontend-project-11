install:
	npm ci

prepare-docker:
	mkdir -p code
	copy index.html code\
	copy -r src code\
	copy package.json code\
	copy package-lock.json code\
	copy vite.config.js code\
	copy .eslintrc.cjs code\

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
