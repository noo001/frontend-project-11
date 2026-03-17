setup:
	@echo "=== STARTING SETUP ==="
	mkdir -p code
	@echo "Created code directory"
	cp index.html code/
	@echo "Copied index.html"
	ls -la code/
	@echo "=== RUNNING NPM CI ==="
	cd code && npm ci

build:
	@echo "=== STARTING BUILD ==="
	cd code && npm run build
