# SuprDM Migration Plan: Replit Project → Next.js 14+ with TanStack

## Overview

This document provides a complete step-by-step guide to migrate the SuprDM Instagram DM automation platform from its current Replit/Express/Vite/Wouter stack to a fresh Next.js 14+ project with:

- **Next.js 14+** with App Router
- **TanStack Router** (client-side routing within Next.js)
- **TanStack Table** (for data tables)
- **TanStack Query** (already in use - will be retained)
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **shadcn/ui** (New York style)
- **Drizzle ORM** (already in use - will be retained)
- **PostgreSQL** (already in use)

---

## Current Project Analysis

### Tech Stack Being Replaced

| Current | New |
|---------|-----|
| Express.js backend | Next.js API Routes / Server Actions |
| Vite build system | Next.js built-in bundler |
| Wouter routing | Next.js App Router + TanStack Router |
| Manual static serving | Next.js automatic optimization |
| Replit-specific plugins | Standard Next.js plugins |

### Tech Stack Being Retained

| Technology | Notes |
|------------|-------|
| React 19 | Compatible with Next.js 14+ |
| TanStack Query | Keep existing hooks |
| Drizzle ORM | Schema portable, just change connection |
| PostgreSQL | Same database, same schema |
| shadcn/ui components | All 76 components copy over |
| Tailwind CSS | Same config, minor adjustments |
| Razorpay | Same integration |
| Zod schemas | All portable |

---

## Project Structure Comparison

### Current Replit Structure
```
SuprDM/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── lib/
│   └── index.html
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── ...
├── shared/
│   └── schema.ts
└── [config files]
```

### New Next.js Structure
```
suprdm-next/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # Public pages group
│   │   │   ├── page.tsx              # Landing page (/)
│   │   │   └── layout.tsx
│   │   ├── (auth)/                   # Auth pages group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/              # Protected dashboard group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── automations/
│   │   │   │   ├── page.tsx          # List
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx      # Create
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # Edit
│   │   │   ├── billing/
│   │   │   │   └── page.tsx
│   │   │   ├── contacts/
│   │   │   │   └── page.tsx
│   │   │   ├── integrations/
│   │   │   │   └── page.tsx
│   │   │   ├── guides/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [guideId]/
│   │   │   │       └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx            # DashboardLayout wrapper
│   │   ├── (admin)/                  # Admin pages group
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx          # Admin dashboard
│   │   │   │   ├── users/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── permissions/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── plans/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── features/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── payments/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx            # AdminLayout wrapper
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── user/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.ts
│   │   │   │   └── callback/
│   │   │   │       └── route.ts
│   │   │   ├── automations/
│   │   │   │   ├── route.ts          # GET all, POST create
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts      # GET, PATCH, DELETE
│   │   │   ├── plans/
│   │   │   │   ├── route.ts
│   │   │   │   └── [planId]/
│   │   │   │       └── features/
│   │   │   │           └── route.ts
│   │   │   ├── features/
│   │   │   │   └── route.ts
│   │   │   ├── roles/
│   │   │   │   └── route.ts
│   │   │   ├── payments/
│   │   │   │   ├── create-order/
│   │   │   │   │   └── route.ts
│   │   │   │   └── verify/
│   │   │   │       └── route.ts
│   │   │   └── admin/
│   │   │       ├── users/
│   │   │       │   ├── route.ts
│   │   │       │   └── [id]/
│   │   │       │       ├── route.ts
│   │   │       │       ├── full/
│   │   │       │       │   └── route.ts
│   │   │       │       ├── role/
│   │   │       │       │   └── route.ts
│   │   │       │       ├── plan/
│   │   │       │       │   └── route.ts
│   │   │       │       └── status/
│   │   │       │           └── route.ts
│   │   │       ├── plans/
│   │   │       │   ├── route.ts
│   │   │       │   └── [id]/
│   │   │       │       └── route.ts
│   │   │       ├── features/
│   │   │       │   ├── route.ts
│   │   │       │   └── [id]/
│   │   │       │       └── route.ts
│   │   │       ├── roles/
│   │   │       │   ├── route.ts
│   │   │       │   └── [id]/
│   │   │       │       └── route.ts
│   │   │       └── analytics/
│   │   │           ├── stats/
│   │   │           │   └── route.ts
│   │   │           └── activity/
│   │   │               └── route.ts
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   ├── not-found.tsx             # 404 page
│   │   └── error.tsx                 # Error boundary
│   ├── components/
│   │   ├── ui/                       # All 76 shadcn components
│   │   ├── layout/
│   │   │   ├── AdminLayout.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── Footer.tsx
│   │   ├── permissions/
│   │   │   ├── FeatureGate.tsx
│   │   │   ├── PermissionGate.tsx
│   │   │   ├── LimitReachedBanner.tsx
│   │   │   └── UpsellDialog.tsx
│   │   ├── motion-primitives/
│   │   │   ├── animated-number.tsx
│   │   │   └── text-effect.tsx
│   │   └── Navbar.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── usePermissions.ts
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── db.ts                     # Drizzle connection
│   │   ├── auth.ts                   # Auth utilities
│   │   ├── razorpay.ts               # Payment utilities
│   │   ├── storage.ts                # Database operations
│   │   ├── queryClient.ts            # TanStack Query config
│   │   └── utils.ts                  # Utility functions
│   ├── schemas/
│   │   └── index.ts                  # Drizzle + Zod schemas (from shared/schema.ts)
│   └── types/
│       └── index.ts                  # TypeScript type definitions
├── public/
│   ├── favicon.png
│   ├── opengraph.jpg
│   └── assets/                       # Brand images
├── drizzle/
│   └── migrations/                   # Database migrations
├── .env.local                        # Environment variables
├── .env.example                      # Environment template
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── drizzle.config.ts                 # Drizzle configuration
├── components.json                   # shadcn configuration
├── postcss.config.mjs                # PostCSS configuration
├── package.json
└── README.md
```

---

## Step-by-Step Migration Guide

### Phase 1: Project Setup (New Next.js Project)

#### Step 1.1: Create New Next.js Project
```bash
# Navigate to parent directory
cd C:\Development

# Create new Next.js project with all options
npx create-next-app@latest suprdm-next --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate into project
cd suprdm-next
```

#### Step 1.2: Install Core Dependencies
```bash
# TanStack packages
npm install @tanstack/react-query @tanstack/react-table @tanstack/react-router

# Database & ORM
npm install drizzle-orm pg
npm install -D drizzle-kit @types/pg

# Authentication (we'll use next-auth instead of Replit OpenID)
npm install next-auth @auth/drizzle-adapter

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod drizzle-zod

# UI & Styling
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
npm install next-themes

# Animation
npm install framer-motion motion

# Payments
npm install razorpay
npm install -D @types/razorpay

# Charts
npm install recharts

# Date utilities
npm install date-fns

# Flow builder
npm install reactflow

# Toast notifications
npm install sonner

# Additional UI dependencies (for shadcn)
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip

# Other utilities
npm install cmdk embla-carousel-react input-otp react-day-picker react-resizable-panels vaul
```

#### Step 1.3: Initialize shadcn/ui
```bash
npx shadcn@latest init

# Select options:
# - Style: New York
# - Base color: Neutral
# - CSS variables: Yes
```

#### Step 1.4: Add All shadcn Components
```bash
# Add all components at once
npx shadcn@latest add accordion alert alert-dialog aspect-ratio avatar badge breadcrumb button calendar card carousel chart checkbox collapsible command context-menu dialog drawer dropdown-menu form hover-card input input-otp label menubar navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet skeleton slider sonner switch table tabs textarea toast toggle toggle-group tooltip
```

---

### Phase 2: Environment Configuration

#### Step 2.1: Create Environment Files

**.env.local**
```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/suprdm

# Authentication (NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-generate-with-openssl

# OAuth Providers (replace Replit with Google/GitHub)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Or use credentials-based auth
# No additional env vars needed for email/password

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**.env.example**
```env
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_APP_URL=
```

---

### Phase 3: Database Setup

#### Step 3.1: Copy Schema File
Copy `SuprDM/shared/schema.ts` to `suprdm-next/src/schemas/index.ts`

Modify the imports:
```typescript
// Before (Replit)
import { pgTable, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

// After (Next.js) - same, just ensure path is correct
import { pgTable, text, integer, boolean, timestamp, jsonb, serial } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// ... rest of schema stays the same
```

#### Step 3.2: Create Database Connection

**src/lib/db.ts**
```typescript
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/schemas";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool, { schema });
export type DbClient = typeof db;
```

#### Step 3.3: Create Drizzle Config

**drizzle.config.ts**
```typescript
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schemas/index.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

#### Step 3.4: Copy Storage Operations
Copy `SuprDM/server/storage.ts` to `suprdm-next/src/lib/storage.ts`

Update imports:
```typescript
// Change
import { db } from "./db";
import * as schema from "../shared/schema";

// To
import { db } from "./db";
import * as schema from "@/schemas";
```

---

### Phase 4: Authentication Migration

#### Step 4.1: Setup NextAuth

**src/lib/auth.ts**
```typescript
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { users } from "@/schemas";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email as string),
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          image: user.profileImageUrl,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;

        // Fetch additional user data
        const dbUser = await db.query.users.findFirst({
          where: eq(users.id, token.sub),
          with: {
            role: true,
            plan: true,
          },
        });

        if (dbUser) {
          session.user.roleId = dbUser.roleId;
          session.user.planId = dbUser.planId;
          session.user.role = dbUser.role;
          session.user.plan = dbUser.plan;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
```

#### Step 4.2: Create Auth API Routes

**src/app/api/auth/[...nextauth]/route.ts**
```typescript
import { handlers } from "@/lib/auth";
export const { GET, POST } = handlers;
```

**src/app/api/auth/user/route.ts**
```typescript
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/schemas";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
    with: {
      role: true,
      plan: {
        with: {
          planFeatures: {
            with: {
              feature: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
```

---

### Phase 5: Copy Components

#### Step 5.1: Copy UI Components
Copy all files from `SuprDM/client/src/components/ui/` to `suprdm-next/src/components/ui/`

Update imports in each file:
```typescript
// Change
import { cn } from "@/lib/utils"

// To (should be the same, verify path alias works)
import { cn } from "@/lib/utils"
```

#### Step 5.2: Copy Layout Components
Copy from `SuprDM/client/src/components/layout/` to `suprdm-next/src/components/layout/`

Update routing imports:
```typescript
// Before (Wouter)
import { Link, useLocation } from "wouter";

// After (Next.js)
import Link from "next/link";
import { usePathname } from "next/navigation";

// Update usage
const pathname = usePathname();
// instead of const [location] = useLocation();
```

#### Step 5.3: Copy Section Components
Copy from `SuprDM/client/src/components/sections/` to `suprdm-next/src/components/sections/`

#### Step 5.4: Copy Permission Components
Copy from `SuprDM/client/src/components/permissions/` to `suprdm-next/src/components/permissions/`

#### Step 5.5: Copy Motion Primitives
Copy from `SuprDM/client/src/components/motion-primitives/` to `suprdm-next/src/components/motion-primitives/`

#### Step 5.6: Copy Navbar
Copy `SuprDM/client/src/components/Navbar.tsx` to `suprdm-next/src/components/Navbar.tsx`

---

### Phase 6: Copy Hooks

#### Step 6.1: Copy All Hooks
Copy from `SuprDM/client/src/hooks/` to `suprdm-next/src/hooks/`

#### Step 6.2: Update useAuth Hook

**src/hooks/useAuth.ts**
```typescript
"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: session, status } = useSession();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    enabled: status === "authenticated",
    queryFn: async () => {
      const res = await fetch("/api/auth/user");
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
  });

  return {
    user: user || session?.user,
    isLoading: status === "loading" || isUserLoading,
    isAuthenticated: status === "authenticated",
  };
}
```

---

### Phase 7: Copy and Adapt Pages

#### Step 7.1: Landing Page

**src/app/(marketing)/page.tsx**
```typescript
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}
```

#### Step 7.2: Auth Pages

**src/app/(auth)/login/page.tsx**
```typescript
// Copy content from SuprDM/client/src/pages/auth/Login.tsx
// Change:
// - import { Link } from "wouter" → import Link from "next/link"
// - Add "use client" at top
// - Update form submission to use signIn from next-auth
```

**src/app/(auth)/signup/page.tsx**
```typescript
// Copy content from SuprDM/client/src/pages/auth/Signup.tsx
// Same changes as login
```

#### Step 7.3: Dashboard Layout

**src/app/(dashboard)/layout.tsx**
```typescript
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
```

#### Step 7.4: Dashboard Pages

For each page in `SuprDM/client/src/pages/dashboard/`:

1. Create corresponding directory in `src/app/(dashboard)/`
2. Create `page.tsx` file
3. Copy component content
4. Add `"use client"` directive at top
5. Update imports:
   - `import { Link } from "wouter"` → `import Link from "next/link"`
   - `import { useLocation } from "wouter"` → `import { usePathname } from "next/navigation"`
   - Update hook usage accordingly

Example for **src/app/(dashboard)/dashboard/page.tsx**:
```typescript
"use client";

// Copy content from SuprDM/client/src/pages/dashboard/Dashboard.tsx
// Update imports as described above
```

#### Step 7.5: Admin Layout and Pages

**src/app/(admin)/layout.tsx**
```typescript
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/schemas";
import { eq } from "drizzle-orm";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
    with: { role: true },
  });

  if (user?.role?.id !== "admin") {
    redirect("/dashboard");
  }

  return <AdminLayout>{children}</AdminLayout>;
}
```

---

### Phase 8: API Routes Migration

#### Step 8.1: Create API Route Template

For each endpoint in `SuprDM/server/routes.ts`, create corresponding route files:

**Example: src/app/api/automations/route.ts**
```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { automations } from "@/schemas";
import { eq } from "drizzle-orm";
import { z } from "zod";

// GET /api/automations
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userAutomations = await db.query.automations.findMany({
    where: eq(automations.userId, session.user.id),
    orderBy: (automations, { desc }) => [desc(automations.createdAt)],
  });

  return NextResponse.json(userAutomations);
}

// POST /api/automations
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Validate with Zod schema
  const automationSchema = z.object({
    name: z.string().min(1),
    category: z.enum(["COMMENT", "STORY", "DM"]),
    triggerType: z.enum(["specific", "any"]),
    keywords: z.array(z.string()),
    messageContent: z.string(),
    // ... other fields
  });

  const validated = automationSchema.parse(body);

  const newAutomation = await db.insert(automations).values({
    ...validated,
    userId: session.user.id,
  }).returning();

  return NextResponse.json(newAutomation[0], { status: 201 });
}
```

**Example: src/app/api/automations/[id]/route.ts**
```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { automations } from "@/schemas";
import { eq, and } from "drizzle-orm";

// GET /api/automations/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const automation = await db.query.automations.findFirst({
    where: and(
      eq(automations.id, parseInt(params.id)),
      eq(automations.userId, session.user.id)
    ),
  });

  if (!automation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(automation);
}

// PATCH /api/automations/:id
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const updated = await db.update(automations)
    .set({ ...body, updatedAt: new Date() })
    .where(
      and(
        eq(automations.id, parseInt(params.id)),
        eq(automations.userId, session.user.id)
      )
    )
    .returning();

  return NextResponse.json(updated[0]);
}

// DELETE /api/automations/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.delete(automations).where(
    and(
      eq(automations.id, parseInt(params.id)),
      eq(automations.userId, session.user.id)
    )
  );

  return NextResponse.json({ success: true });
}
```

#### Step 8.2: API Routes to Create

Based on `routes.ts`, create these API route files:

| Original Endpoint | New File |
|-------------------|----------|
| GET /api/auth/user | src/app/api/auth/user/route.ts |
| GET/POST /api/automations | src/app/api/automations/route.ts |
| GET/PATCH/DELETE /api/automations/:id | src/app/api/automations/[id]/route.ts |
| GET /api/plans | src/app/api/plans/route.ts |
| GET /api/features | src/app/api/features/route.ts |
| GET /api/plans/:planId/features | src/app/api/plans/[planId]/features/route.ts |
| GET /api/roles | src/app/api/roles/route.ts |
| POST /api/payments/create-order | src/app/api/payments/create-order/route.ts |
| POST /api/payments/verify | src/app/api/payments/verify/route.ts |
| GET /api/admin/users | src/app/api/admin/users/route.ts |
| GET /api/admin/users/:id | src/app/api/admin/users/[id]/route.ts |
| GET /api/admin/users/:id/full | src/app/api/admin/users/[id]/full/route.ts |
| PATCH /api/admin/users/:id/role | src/app/api/admin/users/[id]/role/route.ts |
| PATCH /api/admin/users/:id/plan | src/app/api/admin/users/[id]/plan/route.ts |
| PATCH /api/admin/users/:id/status | src/app/api/admin/users/[id]/status/route.ts |
| GET/POST /api/admin/plans | src/app/api/admin/plans/route.ts |
| PATCH/DELETE /api/admin/plans/:id | src/app/api/admin/plans/[id]/route.ts |
| GET/POST /api/admin/features | src/app/api/admin/features/route.ts |
| PATCH/DELETE /api/admin/features/:id | src/app/api/admin/features/[id]/route.ts |
| GET/POST /api/admin/roles | src/app/api/admin/roles/route.ts |
| PATCH /api/admin/roles/:id | src/app/api/admin/roles/[id]/route.ts |
| GET /api/admin/analytics/stats | src/app/api/admin/analytics/stats/route.ts |
| GET /api/admin/analytics/activity | src/app/api/admin/analytics/activity/route.ts |

---

### Phase 9: Styling Migration

#### Step 9.1: Copy Global Styles

Copy CSS custom properties from `SuprDM/client/src/index.css` to `suprdm-next/src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 8%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 8%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 8%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;
    --accent: 0 0% 96%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 90%;
    --input: 0 0% 90%;
    --ring: 0 0% 9%;
    --radius: 0.5rem;

    /* Custom SuprDM colors */
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }

  .dark {
    --background: 0 0% 4%;
    --foreground: 0 0% 98%;
    /* ... dark mode variables */
  }
}

/* Copy all custom animations and styles from original */
```

#### Step 9.2: Configure Tailwind

**tailwind.config.ts**
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shimmer-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shimmer-width)) 0",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 8s infinite",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

### Phase 10: TanStack Query Provider Setup

#### Step 10.1: Create Query Provider

**src/components/providers/QueryProvider.tsx**
```typescript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

#### Step 10.2: Create Session Provider

**src/components/providers/SessionProvider.tsx**
```typescript
"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
```

#### Step 10.3: Create Theme Provider

**src/components/providers/ThemeProvider.tsx**
```typescript
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
```

#### Step 10.4: Update Root Layout

**src/app/layout.tsx**
```typescript
import type { Metadata } from "next";
import { Outfit, Poppins } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SuprDM - Instagram DM Automation",
  description: "Automate your Instagram DMs and grow your business",
  openGraph: {
    images: ["/opengraph.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body className={`${outfit.variable} ${poppins.variable} font-sans`}>
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider>
              {children}
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
```

---

### Phase 11: TanStack Table Integration

For tables with complex features (Users, Payments, Automations), implement TanStack Table:

**Example: src/app/(admin)/admin/users/page.tsx**
```typescript
"use client";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
  planId: string;
  status: string;
  createdAt: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "roleId",
    header: "Role",
  },
  {
    accessorKey: "planId",
    header: "Plan",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </div>
    ),
  },
];

export default function UsersPage() {
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      return res.json();
    },
  });

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Input
          placeholder="Search users..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
```

---

### Phase 12: Static Assets Migration

#### Step 12.1: Copy Public Assets
```bash
# Copy from SuprDM/client/public/ to suprdm-next/public/
cp -r SuprDM/client/public/* suprdm-next/public/

# Copy brand assets
cp -r SuprDM/attached_assets/* suprdm-next/public/assets/
```

---

### Phase 13: Testing & Verification

#### Step 13.1: Run Development Server
```bash
cd suprdm-next
npm run dev
```

#### Step 13.2: Verification Checklist

- [ ] Landing page loads correctly
- [ ] Login/Signup pages work
- [ ] Authentication flow completes
- [ ] Dashboard loads for authenticated users
- [ ] All dashboard pages render correctly
- [ ] Admin pages load (for admin users)
- [ ] API routes return correct data
- [ ] Forms submit correctly
- [ ] TanStack Query caching works
- [ ] TanStack Table pagination/sorting works
- [ ] Razorpay checkout initiates
- [ ] Dark mode toggle works
- [ ] Mobile responsiveness works
- [ ] All styles render correctly

#### Step 13.3: Database Sync
```bash
# Push schema changes to database
npm run db:push

# Or generate and run migrations
npm run db:generate
npm run db:migrate
```

---

### Phase 14: Cleanup

#### Step 14.1: Delete Old Project

Once the new project is verified working in development:

```bash
# Navigate to development folder
cd C:\Development

# Backup old project (optional)
mv SuprDM SuprDM-backup-$(date +%Y%m%d)

# Or delete permanently
rm -rf SuprDM
```

#### Step 14.2: Rename New Project (Optional)
```bash
# Rename new project to original name
mv suprdm-next suprdm
```

---

## File Migration Reference

### Files to Copy Directly (No Changes)

| Source | Destination |
|--------|-------------|
| `client/src/components/ui/*` | `src/components/ui/*` |
| `client/src/components/motion-primitives/*` | `src/components/motion-primitives/*` |
| `client/public/*` | `public/*` |
| `attached_assets/*` | `public/assets/*` |

### Files to Copy with Minor Changes

| Source | Destination | Changes |
|--------|-------------|---------|
| `client/src/components/sections/*` | `src/components/sections/*` | Update Link imports |
| `client/src/components/layout/*` | `src/components/layout/*` | Update router imports |
| `client/src/components/permissions/*` | `src/components/permissions/*` | Add "use client" |
| `client/src/components/Navbar.tsx` | `src/components/Navbar.tsx` | Update Link imports |
| `client/src/hooks/*` | `src/hooks/*` | Update auth hook for NextAuth |
| `shared/schema.ts` | `src/schemas/index.ts` | Update imports |
| `client/src/lib/utils.ts` | `src/lib/utils.ts` | No changes |

### Files to Rewrite

| Source | Destination | Reason |
|--------|-------------|--------|
| `server/routes.ts` | `src/app/api/**` | Express → Next.js API Routes |
| `server/replitAuth.ts` | `src/lib/auth.ts` | Replit Auth → NextAuth |
| `server/index.ts` | N/A | Not needed in Next.js |
| `server/static.ts` | N/A | Not needed in Next.js |
| `server/vite.ts` | N/A | Not needed in Next.js |
| `client/src/App.tsx` | `src/app/layout.tsx` | Wouter → App Router |
| All pages | `src/app/**/page.tsx` | Route structure change |

### Files to Delete (Not Needed in Next.js)

- `vite.config.ts`
- `script/build.ts`
- `server/index.ts`
- `server/static.ts`
- `server/vite.ts`
- `client/index.html`
- All Replit-specific plugins

---

## Package.json Scripts

**New scripts for suprdm-next:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
  }
}
```

---

## Important Notes

### Authentication Changes

The original project uses Replit OpenID Connect. For the new project, you have options:

1. **NextAuth with Credentials** - Email/password (implemented in this guide)
2. **NextAuth with OAuth** - Google, GitHub, etc.
3. **Clerk** - Third-party auth service
4. **Auth.js** - NextAuth successor

If you need to keep Replit auth, you'll need to configure it as a custom OAuth provider in NextAuth.

### TanStack Router vs App Router

This guide uses **Next.js App Router** as the primary routing mechanism. TanStack Router can be used for:
- Client-side only SPAs
- Complex nested layouts
- Type-safe route params

For most Next.js apps, App Router is sufficient. TanStack Table is included for data table functionality.

### Database Migration

The Drizzle schema is portable. If using the same PostgreSQL database:
1. No data migration needed
2. Just update the connection string
3. Run `db:push` to sync schema

If setting up a new database:
1. Run `db:push` to create tables
2. Seed initial data (plans, roles, permissions, features)

---

## Summary

This migration involves:

1. **Creating** a new Next.js 14+ project with TypeScript and Tailwind
2. **Installing** all required dependencies
3. **Copying** 76 shadcn UI components, hooks, and utilities
4. **Restructuring** pages into App Router layout
5. **Rewriting** API routes from Express to Next.js Route Handlers
6. **Migrating** authentication from Replit OpenID to NextAuth
7. **Configuring** TanStack Query and Table
8. **Testing** all functionality
9. **Deleting** the old Replit project

Estimated file count for new project: ~150 files (vs ~200 in original due to consolidation)
