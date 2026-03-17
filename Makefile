install:
	npm ci

prepare:
	mkdir -p code
	cp index.html code/

prepare-docker: prepare
	@echo "=== COPYING FILES TO CODE ==="
	cp -v src code/ 2>&1 || true
	cp -v package.json code/
	cp -v package-lock.json code/
	cp -v vite.config.js code/
	cp -v .eslintrc.cjs code/
	@echo "=== FILES IN CODE DIRECTORY ==="
	ls -la code/

setup: prepare-docker
	cd code && npm ci

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
