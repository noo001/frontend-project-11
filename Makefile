install:
	npm ci

setup:
	cp index.html code/
	cd code && npm ci

build:
	npm run build

dev:
	npm run dev

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

.PHONY: install setup dev build preview lint lint-fix test test-coverage ci
