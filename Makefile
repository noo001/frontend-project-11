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

ci: install lint build

.PHONY: install dev build preview lint ci
