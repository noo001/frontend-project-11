install:
	npm ci

prepare:
	mkdir -p code
	cp index.html code/

prepare-docker: prepare
	cp -r src code/
	cp package.json code/
	cp package-lock.json code/
	cp vite.config.js code/
	cp .eslintrc.cjs code/
	node scripts/create-html.js

setup: prepare-docker
	cd code && npm install

dev:
	npm run dev

build: prepare
	npm run build

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

.PHONY: install prepare prepare-docker setup dev build preview lint lint-fix test test-coverage ci
