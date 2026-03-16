install:
	npm ci

prepare-docker:
	mkdir -p code
	cp index.html code/
	cp -r src code/
	cp package.json package-lock.json code/

dev:
	npm run dev

build: prepare-docker
	npm run build

preview:
	npm run preview

lint:
	npm run lint

test:
	npm test

test-coverage:
	npm test -- --coverage

ci: install lint build

.PHONY: install prepare-docker dev build preview lint test test-coverage ci
