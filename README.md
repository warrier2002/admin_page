# Sentinel Admin Panel — The Precise Monolith

A production-ready React Admin Panel built with a **modular, microservice-style architecture** featuring centralized JWT authentication, permission-based RBAC, and a clean API → Service → Hook → UI data flow.

![React](https://img.shields.io/badge/React-18-blue?logo=react) ![Router](https://img.shields.io/badge/React_Router-v6-red) ![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite) ![Architecture](https://img.shields.io/badge/Architecture-Modular-green)

---

## Features

- **JWT Authentication** — Login/logout with token persisted in `localStorage`, survives page refresh
- **Centralized RBAC** — 12 named permissions in one file; zero role strings hardcoded in components
- **Permission-based Routes** — `PrivateRoute` (auth check) + `RoleRoute` (permission check)
- **3-Layer Module Architecture** — API → Service → Hook for every feature domain
- **Live Search & CRUD** — Users page with search filter and delete action
- **Mock Fallback** — Fully functional without a backend (auto-detected)
- **Design System** — "The Precise Monolith" — tonal layering, no-border sectioning, Manrope/Inter typography

---

## Tech Stack

| Layer | Tool |
|---|---|
| UI Framework | React 18 (Vite) |
| Routing | React Router v6 |
| HTTP Client | Axios |
| State | Context API |
| Icons | Google Material Symbols |
| Styling | Vanilla CSS (custom design system) |

---

## Architecture

The codebase is organized around two top-level layers: **core infrastructure** (shared by all features) and **feature modules** (self-contained domains).

```
src/
├── core/                            ← Shared infrastructure
│   ├── api/
│   │   └── axios.js                 ← Centralized Axios: JWT injection + global 401 handler
│   └── rbac/
│       ├── roles.js                 ← Role constants: SUPER_ADMIN, ADMIN, USER
│       ├── permissions.js           ← 12 named permissions mapped to roles
│       └── usePermission.js         ← Hook: can(), canAny(), canAll()
│
├── modules/                         ← Feature domains (microservice-style)
│   ├── auth/
│   │   ├── auth.api.js              ← Raw HTTP calls: login, logout, getMe
│   │   ├── auth.service.js          ← Business logic, normalization, mock fallback
│   │   └── auth.context.jsx         ← React state: delegates all logic to service
│   ├── users/
│   │   ├── users.api.js             ← Raw HTTP calls: list, create, update, delete
│   │   ├── users.service.js         ← Normalization, search filter, payload validation
│   │   └── users.hooks.js           ← useUsers(): full CRUD state for UI
│   └── dashboard/
│       ├── dashboard.api.js         ← Raw HTTP calls: stats, audit stream
│       ├── dashboard.service.js     ← Normalize heterogeneous API responses
│       └── dashboard.hooks.js       ← useDashboardStats(), useAuditStream()
│
├── components/
│   ├── AppLayout.jsx                ← Authenticated shell: Sidebar + Navbar + Outlet
│   ├── Navbar.jsx                   ← Top bar with user menu
│   ├── Sidebar.jsx                  ← Permission-filtered navigation
│   ├── PrivateRoute.jsx             ← Blocks unauthenticated users → /login
│   └── RoleRoute.jsx                ← Blocks unauthorized roles → /unauthorized
│
└── pages/                           ← UI rendering only (no logic, no hardcoded data)
    ├── LoginPage.jsx                ← Auth portal
    ├── DashboardPage.jsx            ← Stats grid + audit stream (admin+)
    ├── UsersPage.jsx                ← User management table (super_admin only)
    ├── ProfilePage.jsx              ← Account view + RBAC-derived capabilities
    └── UnauthorizedPage.jsx         ← 403 error page
```

### Data Flow

```
API call (module.api.js)
  ↓
Transform & validate (module.service.js)
  ↓
Stateful hook (module.hooks.js)
  ↓
UI component (pages/*.jsx)  ←  usePermission() for conditional rendering
```

---

## RBAC System

All permissions are defined in a single file: `src/core/rbac/permissions.js`

| Permission | user | admin | super_admin |
|---|:---:|:---:|:---:|
| `canViewProfile` | ✅ | ✅ | ✅ |
| `canViewDashboard` | ❌ | ✅ | ✅ |
| `canViewAuditLogs` | ❌ | ✅ | ✅ |
| `canInviteUser` | ❌ | ✅ | ✅ |
| `canViewUsers` | ❌ | ❌ | ✅ |
| `canCreateUser` | ❌ | ❌ | ✅ |
| `canEditUser` | ❌ | ❌ | ✅ |
| `canDeleteUser` | ❌ | ❌ | ✅ |
| `canConfigureRoles` | ❌ | ❌ | ✅ |
| `canSystemSettings` | ❌ | ❌ | ✅ |

**Usage in components:**

```jsx
const { can } = usePermission();

// Conditional render
{can('canDeleteUser') && <button>Delete</button>}

// Route guard
<RoleRoute permission="canViewDashboard" />
```

**Adding a new permission:**
1. Add to `src/core/rbac/permissions.js` → `{ canNewAction: [ROLES.ADMIN] }`
2. Use `can('canNewAction')` anywhere — no other files change

---

## Route Map

| Route | Guard | Accessible by |
|---|---|---|
| `/login` | Public | Everyone |
| `/unauthorized` | Public | Everyone |
| `/profile` | `PrivateRoute` | All authenticated |
| `/dashboard` | `RoleRoute` (`canViewDashboard`) | admin, super_admin |
| `/users` | `RoleRoute` (`canViewUsers`) | super_admin |

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Set VITE_API_URL to your backend endpoint
```

### 3. Run development server
```bash
npm run dev
# → http://localhost:5173
```

---

## Demo Accounts (Mock Mode)

No backend required — the service layer auto-detects an unreachable API and falls back to mock data.

| Email | Password | Role |
|---|---|---|
| super@admin.com | password | super_admin |
| admin@admin.com | password | admin |
| user@user.com | password | user |

---

## Connecting a Real Backend

### 1. Set the base URL
```env
VITE_API_URL=https://your-api.com/api
```

### 2. Expected API contracts

**`POST /auth/login`**
```json
// Request
{ "email": "string", "password": "string" }

// Response
{ "token": "jwt-string", "user": { "id", "name", "email", "role", "avatar" } }
```

**`GET /users`** — Returns array of user objects

**`GET /dashboard/stats`** — Returns stats object or array

**`GET /dashboard/audit`** — Returns audit event array

### 3. Remove the mock fallback

In `src/modules/auth/auth.service.js`, the `catch` block falls back to mock data when the backend is unreachable. Once your backend is live, remove that block and let the error propagate naturally.

---

## Adding a New Feature Module

```
src/modules/newfeature/
├── newfeature.api.js        # API calls only
├── newfeature.service.js    # Transform + validate
└── newfeature.hooks.js      # React state hooks
```

1. **Add permissions** in `src/core/rbac/permissions.js`
2. **Add a route** in `src/App.jsx` with `<RoleRoute permission="..." />`
3. **Add sidebar link** in `src/components/Sidebar.jsx` NAV array
4. **Build the page** using your new hook — zero business logic in JSX

No other files need to change.

---

## License

MIT
