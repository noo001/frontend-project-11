install:
	npm ci

prepare-docker:
	mkdir -p code
	echo '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8" /><title>RSS агрегатор</title></head><body><div id="root"></div><script type="module" src="/src/main.js"></script></body></html>' > code/index.html
	cp -r src code/
	cp package.json code/
	cp package-lock.json code/
	cp vite.config.js code/
	cp .eslintrc.cjs code/

setup: prepare-docker
	cd code && npm install

dev:
	npm run dev

build: prepare-docker
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

.PHONY: install prepare-docker setup dev build preview lint lint-fix test test-coverage ci