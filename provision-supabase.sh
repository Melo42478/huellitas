#!/bin/bash
set -e

# Huellitas Arcoíris — Supabase + Vercel Provision Script
# Requires: npm, supabase CLI, vercel CLI (all pre-authenticated)

APP_DIR="$(dirname "$0")/app"
ORG_ID="cvacpkldhaestavhzcsd"  # Melo's Org
PROJECT_NAME="huellitas-arcoiris"
REGION="us-west-1"
ADMIN_EMAIL="cme.can16@gmail.com"

echo "🐾 Huellitas Arcoíris — Full Provisioning Script"
echo "================================================"
echo ""

# Step 1: Create Supabase project
echo "Step 1/7: Creating Supabase project..."
DB_PASSWORD=$(openssl rand -base64 16 | tr -d '=' | cut -c1-16)

CREATE_OUTPUT=$(npx supabase projects create $PROJECT_NAME \
  --org-id $ORG_ID \
  --region $REGION \
  --db-password $DB_PASSWORD 2>&1)

PROJECT_REF=$(echo "$CREATE_OUTPUT" | grep -oP '"ref":"\K[^"]+' | head -1)

if [ -z "$PROJECT_REF" ]; then
  echo "Error creating project. Output:"
  echo "$CREATE_OUTPUT"
  exit 1
fi

echo "✓ Project created: $PROJECT_REF"
echo ""

# Step 2: Get API keys
echo "Step 2/7: Retrieving API keys..."
KEYS_OUTPUT=$(npx supabase projects api-keys --project-ref $PROJECT_REF 2>&1)

ANON_KEY=$(echo "$KEYS_OUTPUT" | grep -oP '"anonKey":"\K[^"]+' | head -1)
SERVICE_ROLE_KEY=$(echo "$KEYS_OUTPUT" | grep -oP '"serviceRoleKey":"\K[^"]+' | head -1)
SUPABASE_URL="https://$PROJECT_REF.supabase.co"

if [ -z "$ANON_KEY" ] || [ -z "$SERVICE_ROLE_KEY" ]; then
  echo "Error retrieving keys. Output:"
  echo "$KEYS_OUTPUT"
  exit 1
fi

echo "✓ Keys retrieved"
echo ""

# Step 3: Create .env.local
echo "Step 3/7: Creating .env.local..."
cat > "$APP_DIR/.env.local" <<EOF
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SERVICE_ROLE_KEY
EOF

echo "✓ .env.local created"
echo ""

# Step 4: Link and apply migrations
echo "Step 4/7: Applying database migrations..."
(
  cd "$APP_DIR"
  npx supabase link --project-ref $PROJECT_REF >/dev/null 2>&1
  npx supabase db push >/dev/null 2>&1
)
echo "✓ Migrations applied"
echo ""

# Step 5: Seed data
echo "Step 5/7: Seeding database..."
(
  cd "$APP_DIR"
  npm run seed >/dev/null 2>&1
)
echo "✓ Database seeded"
echo ""

# Step 6: Create admin user
echo "Step 6/7: Creating admin user..."
(
  cd "$APP_DIR"
  ADMIN_PASSWORD=$(npx tsx scripts/create-admin.ts 2>&1)
  echo "$ADMIN_PASSWORD"
)
echo "✓ Admin user created"
echo ""

# Step 7: Initialize git
echo "Step 7/7: Initializing git repository..."
REPO_ROOT="$(dirname "$0")"

if [ ! -d "$REPO_ROOT/.git" ]; then
  (
    cd "$REPO_ROOT"
    git init
    git config user.name "Claude"
    git config user.email "noreply@anthropic.com"
    git add -A
    git commit -m "Initial commit: Huellitas Arcoiris Phase 3a setup with Supabase + Admin panel" 2>&1 >/dev/null || true
  )
  echo "✓ Git repository initialized"
else
  echo "✓ Git repository already exists"
fi

echo ""
echo "🎉 Supabase provisioning complete!"
echo ""
echo "Next steps:"
echo "1. Review .env.local (gitignored, contains secrets)"
echo "2. Deploy to Vercel: npx vercel deploy --prod"
echo ""
