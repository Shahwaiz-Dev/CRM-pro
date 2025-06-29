# Turbo Performance Optimization Script
# Run as Administrator for maximum effect

Write-Host "🚀 TURBO OPTIMIZATION - Maximizing Next.js Performance..." -ForegroundColor Green

# 1. Kill any existing Node processes
Write-Host "🔄 Stopping existing Node processes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force -ErrorAction SilentlyContinue

# 2. Clear all caches
Write-Host "🧹 Clearing all caches..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue }
if (Test-Path "node_modules/.cache") { Remove-Item -Recurse -Force "node_modules/.cache" -ErrorAction SilentlyContinue }
npm cache clean --force

# 3. Set aggressive Node.js optimizations
Write-Host "⚡ Setting aggressive Node.js optimizations..." -ForegroundColor Yellow
$env:NODE_OPTIONS = "--max-old-space-size=8192 --optimize-for-size --gc-interval=100"
$env:NEXT_TELEMETRY_DISABLED = "1"
$env:NODE_ENV = "development"

# 4. Disable Windows Defender for project folder (requires admin)
Write-Host "🛡️ Optimizing Windows Defender..." -ForegroundColor Yellow
$projectPath = Get-Location
try {
    Add-MpPreference -ExclusionPath $projectPath.Path -ErrorAction SilentlyContinue
    Add-MpPreference -ExclusionProcess "node.exe" -ErrorAction SilentlyContinue
} catch {
    Write-Host "⚠️  Windows Defender optimization requires Administrator privileges" -ForegroundColor Red
}

# 5. Set high performance power plan
Write-Host "📊 Setting high performance power plan..." -ForegroundColor Yellow
powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c

# 6. Optimize file system
Write-Host "💾 Optimizing file system..." -ForegroundColor Yellow
fsutil behavior set disablelastaccess 1
fsutil behavior set disable8dot3 1

# 7. Set process priority
Write-Host "🎯 Setting process priorities..." -ForegroundColor Yellow
$env:NODE_PRIORITY = "high"

Write-Host "✅ TURBO OPTIMIZATION COMPLETE!" -ForegroundColor Green
Write-Host "🚀 Starting optimized development server..." -ForegroundColor Cyan

# Start the development server with optimized settings
npm run dev 