# Naipunnya Digital Requisition System Build Script
# This runs the Vite React compiler and outputs a single self-contained HTML file.

Write-Host "Compiling project using Vite React..." -ForegroundColor Cyan

# Execute Vite build
npm run build

if ($LASTEXITCODE -eq 0) {
    # Copy compiled standalone singlefile bundle to index_standalone.html
    Copy-Item -Path "dist/index.html" -Destination "index_standalone.html" -Force
    Write-Host "`n=========================================================" -ForegroundColor Green
    Write-Host "SUCCESS: Application built successfully!" -ForegroundColor Green
    Write-Host "Stand-alone bundle created at: index_standalone.html" -ForegroundColor Green
    Write-Host "You can double-click index_standalone.html to run it directly." -ForegroundColor Green
    Write-Host "=========================================================" -ForegroundColor Green
} else {
    Write-Host "`nBUILD ERROR: Vite compilation failed. Please verify source files." -ForegroundColor Red
    exit 1
}
