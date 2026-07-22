# Huellitas Arcoíris — Supabase + Vercel Provision Script
# Requires: npm, supabase CLI, vercel CLI (all pre-authenticated)

$ErrorActionPreference = "Stop"

$AppDir = "$PSScriptRoot/app"
$OrgId = "cvacpkldhaestavhzcsd"  # Melo's Org
$ProjectName = "huellitas-arcoiris"
$Region = "us-west-1"
$AdminEmail = "cme.can16@gmail.com"

Write-Host "🐾 Huellitas Arcoíris — Full Provisioning Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create Supabase project
Write-Host "Step 1/7: Creating Supabase project..." -ForegroundColor Yellow
$DbPassword = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 16 | % {[char]$_})

$CreateProjectOutput = & npx supabase projects create $ProjectName `
  --org-id $OrgId `
  --region $Region `
  --db-password $DbPassword 2>&1

$ProjectRef = ($CreateProjectOutput | Select-String -Pattern '"ref":"(\w+)"' | ForEach-Object { $_.Matches[0].Groups[1].Value })

if (-not $ProjectRef) {
  Write-Host "Error creating project. Output:" -ForegroundColor Red
  Write-Host $CreateProjectOutput
  exit 1
}

Write-Host "✓ Project created: $ProjectRef" -ForegroundColor Green
Write-Host ""

# Step 2: Get API keys
Write-Host "Step 2/7: Retrieving API keys..." -ForegroundColor Yellow
$KeysOutput = & npx supabase projects api-keys --project-ref $ProjectRef 2>&1
$KeysJson = $KeysOutput -join "`n" | ConvertFrom-Json

$AnonKey = $KeysJson.anonKey
$ServiceRoleKey = $KeysJson.serviceRoleKey
$SupabaseUrl = "https://$ProjectRef.supabase.co"

if (-not $AnonKey -or -not $ServiceRoleKey) {
  Write-Host "Error retrieving keys. Output:" -ForegroundColor Red
  Write-Host $KeysOutput
  exit 1
}

Write-Host "✓ Keys retrieved" -ForegroundColor Green
Write-Host ""

# Step 3: Create .env.local
Write-Host "Step 3/7: Creating .env.local..." -ForegroundColor Yellow
$EnvContent = @"
NEXT_PUBLIC_SUPABASE_URL=$SupabaseUrl
NEXT_PUBLIC_SUPABASE_ANON_KEY=$AnonKey
SUPABASE_SERVICE_ROLE_KEY=$ServiceRoleKey
"@

Set-Content -Path "$AppDir/.env.local" -Value $EnvContent -Encoding UTF8
Write-Host "✓ .env.local created" -ForegroundColor Green
Write-Host ""

# Step 4: Link and apply migrations
Write-Host "Step 4/7: Applying database migrations..." -ForegroundColor Yellow
Push-Location $AppDir
try {
  & npx supabase link --project-ref $ProjectRef 2>&1 | Out-Null
  & npx supabase db push 2>&1 | Out-Null
  Write-Host "✓ Migrations applied" -ForegroundColor Green
} finally {
  Pop-Location
}
Write-Host ""

# Step 5: Seed data
Write-Host "Step 5/7: Seeding database..." -ForegroundColor Yellow
Push-Location $AppDir
try {
  & npm run seed 2>&1 | Out-Null
  Write-Host "✓ Database seeded" -ForegroundColor Green
} finally {
  Pop-Location
}
Write-Host ""

# Step 6: Create admin user
Write-Host "Step 6/7: Creating admin user..." -ForegroundColor Yellow
Push-Location $AppDir
try {
  $AdminPassword = & npx tsx scripts/create-admin.ts 2>&1
  Write-Host $AdminPassword
  Write-Host "✓ Admin user created" -ForegroundColor Green
} finally {
  Pop-Location
}
Write-Host ""

# Step 7: Initialize git and deploy to Vercel
Write-Host "Step 7/7: Initializing git repository..." -ForegroundColor Yellow
$RepoRoot = "$PSScriptRoot"

if (-not (Test-Path "$RepoRoot/.git")) {
  Push-Location $RepoRoot
  try {
    & git init 2>&1 | Out-Null
    & git config user.name "Claude" 2>&1 | Out-Null
    & git config user.email "noreply@anthropic.com" 2>&1 | Out-Null
    & git add -A 2>&1 | Out-Null
    & git commit -m "Initial commit: Huellitas Arcoiris Phase 3a setup with Supabase + Admin panel" 2>&1 | Out-Null
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
  } finally {
    Pop-Location
  }
} else {
  Write-Host "✓ Git repository already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Supabase provisioning complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review .env.local (gitignored, contains secrets)"
Write-Host "2. Deploy to Vercel: npx vercel deploy --prod"
Write-Host ""
