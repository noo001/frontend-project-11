install:
	npm ci

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

test:
	npm test

test-coverage:
	npm test -- --coverage

ci: install lint test build

.PHONY: install dev build preview lint test test-coverage ci
