# Huellitas Arcoíris — Vercel Deploy Script

$ErrorActionPreference = "Stop"

$RepoRoot = "$PSScriptRoot"
$AppDir = "$PSScriptRoot/app"
$ProjectName = "huellitas-arcoiris"
$Domain = "huellitasarcoiris.com"

Write-Host "🚀 Deploying Huellitas Arcoíris to Vercel" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build locally
Write-Host "Step 1/4: Building locally..." -ForegroundColor Yellow
Push-Location $AppDir
try {
  & npm run build 2>&1 | Out-Null
  Write-Host "✓ Build successful" -ForegroundColor Green
} catch {
  Write-Host "Build failed!" -ForegroundColor Red
  exit 1
} finally {
  Pop-Location
}
Write-Host ""

# Step 2: Link Vercel project
Write-Host "Step 2/4: Linking Vercel project..." -ForegroundColor Yellow
Push-Location $AppDir
try {
  $LinkOutput = & npx vercel link --yes --project=$ProjectName 2>&1
  Write-Host "✓ Vercel project linked" -ForegroundColor Green
} catch {
  Write-Host "Error linking project (may already be linked)" -ForegroundColor Yellow
} finally {
  Pop-Location
}
Write-Host ""

# Step 3: Set environment variables
Write-Host "Step 3/4: Setting Vercel environment variables..." -ForegroundColor Yellow
Push-Location $AppDir
try {
  $EnvVars = @(
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  )

  foreach ($VarName in $EnvVars) {
    $VarValue = [System.Environment]::GetEnvironmentVariable($VarName, "User")
    if (-not $VarValue) {
      Write-Host "Warning: $VarName not found in local .env" -ForegroundColor Yellow
      continue
    }

    & npx vercel env add $VarName production --value=$VarValue 2>&1 | Out-Null
    Write-Host "  • Set $VarName" -ForegroundColor Gray
  }
  Write-Host "✓ Environment variables set" -ForegroundColor Green
} finally {
  Pop-Location
}
Write-Host ""

# Step 4: Deploy to production
Write-Host "Step 4/4: Deploying to production..." -ForegroundColor Yellow
Push-Location $AppDir
try {
  $DeployOutput = & npx vercel deploy --prod 2>&1
  $Url = $DeployOutput | Select-String -Pattern "https://.*\.vercel\.app" | ForEach-Object { $_.Matches[0].Value } | Select-Object -First 1
  Write-Host "✓ Deployed to: $Url" -ForegroundColor Green
} catch {
  Write-Host "Deploy failed!" -ForegroundColor Red
  Write-Host $_ -ForegroundColor Red
  exit 1
} finally {
  Pop-Location
}
Write-Host ""

# Step 5: Connect domain
Write-Host "Step 5/5: Connecting domain $Domain..." -ForegroundColor Yellow
Push-Location $AppDir
try {
  & npx vercel domains add $Domain 2>&1 | Out-Null
  Write-Host "✓ Domain $Domain connected" -ForegroundColor Green
} catch {
  Write-Host "Domain may already be connected or error occurred:" -ForegroundColor Yellow
  Write-Host $_ -ForegroundColor Gray
} finally {
  Pop-Location
}
Write-Host ""

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Visit: https://$Domain" -ForegroundColor Cyan
Write-Host "Admin:  https://$Domain/admin" -ForegroundColor Cyan
Write-Host ""
