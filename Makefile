install:
	npm ci

prepare-docker:
	mkdir -p code
	cp index.html code/
	cp -r src code/
	cp package.json code/
	cp package-lock.json code/

setup: prepare-docker
	cd code && npm install

dev:
	npm run dev

build:
	npm run build

build-docker: prepare-docker
	cd code && npm run build

preview:
	npm run preview

lint:
	npm run lint

test:
	npm test

test-coverage:
	npm test -- --coverage

ci: install lint build

.PHONY: install prepare-docker setup dev build build-docker preview lint test test-coverage ci
