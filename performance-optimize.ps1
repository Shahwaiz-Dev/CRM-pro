# Performance Optimization Script for Next.js CRM Pro
# This script helps optimize the build and development process

Write-Host "🚀 CRM Pro Performance Optimization Script" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Clean up previous builds
Write-Host "🧹 Cleaning up previous builds..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ Removed .next directory" -ForegroundColor Green
}

if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
    Write-Host "✅ Removed node_modules cache" -ForegroundColor Green
}

# Install dependencies with optimization
Write-Host "📦 Installing dependencies with optimization..." -ForegroundColor Yellow
npm ci --production=false --prefer-offline

# Build the application
Write-Host "🔨 Building the application..." -ForegroundColor Yellow
npm run build

# Analyze bundle size (if @next/bundle-analyzer is installed)
if (Test-Path "node_modules/@next/bundle-analyzer") {
    Write-Host "📊 Analyzing bundle size..." -ForegroundColor Yellow
    $env:ANALYZE = "true"
    npm run build
    $env:ANALYZE = $null
}

Write-Host "✅ Performance optimization complete!" -ForegroundColor Green
Write-Host "🎯 Your website should now be significantly faster!" -ForegroundColor Green

Write-Host "`n📋 Performance Tips:" -ForegroundColor Cyan
Write-Host "• Use 'npm run dev:turbo' for faster development" -ForegroundColor White
Write-Host "• Use 'npm run build:turbo' for faster builds" -ForegroundColor White
Write-Host "• Enable compression in production" -ForegroundColor White
Write-Host "• Use image optimization for better loading times" -ForegroundColor White
Write-Host "• Implement lazy loading for components" -ForegroundColor White 