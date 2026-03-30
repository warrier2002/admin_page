# Sentinel Admin Panel — The Precise Monolith

A production-ready React Admin Panel with JWT authentication, Role-Based Access Control (RBAC), and Axios API integration.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react) ![Router](https://img.shields.io/badge/React_Router-v6-red) ![Build](https://img.shields.io/badge/Vite-5-purple?logo=vite)

---

## Features

- **JWT Authentication** — Login/logout with token stored in `localStorage`, persists on page refresh
- **Role-Based Access Control (RBAC)** — Three roles: `super_admin`, `admin`, `user`
- **Protected Routes** — `PrivateRoute` (auth check) + `RoleRoute` (role check)
- **Axios Integration** — Centralized instance with JWT request interceptor and global 401 handler
- **RBAC Sidebar** — Navigation items rendered dynamically based on user role
- **Mock Fallback** — Fully functional without a backend (mock users + mock API data)
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

## Project Structure

```
src/
├── api/
│   └── axios.js              # Axios instance with JWT + 401 interceptors
├── context/
│   └── AuthContext.jsx       # Auth state, login(), logout(), hasRole()
├── components/
│   ├── AppLayout.jsx         # Sidebar + Navbar shell for authenticated pages
│   ├── Sidebar.jsx           # RBAC-filtered navigation
│   ├── Navbar.jsx            # Top bar with user menu
│   ├── PrivateRoute.jsx      # Blocks unauthenticated access
│   └── RoleRoute.jsx         # Blocks unauthorized roles
└── pages/
    ├── LoginPage.jsx         # Public auth portal
    ├── DashboardPage.jsx     # admin + super_admin
    ├── UsersPage.jsx         # super_admin only
    ├── ProfilePage.jsx       # All authenticated users
    └── UnauthorizedPage.jsx  # 403 page
```

---

## RBAC Matrix

| Route | `user` | `admin` | `super_admin` |
|---|:---:|:---:|:---:|
| `/login` | ✅ | ✅ | ✅ |
| `/profile` | ✅ | ✅ | ✅ |
| `/dashboard` | ❌ | ✅ | ✅ |
| `/users` | ❌ | ❌ | ✅ |

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env and set VITE_API_URL to your backend
```

### 3. Run development server
```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## Demo Accounts (Mock Mode)

No backend required. Use these credentials to test all roles:

| Email | Password | Role |
|---|---|---|
| super@admin.com | password | super_admin |
| admin@admin.com | password | admin |
| user@user.com | password | user |

---

## Connecting a Real Backend

1. In `.env`, set:
   ```
   VITE_API_URL=https://your-api.com/api
   ```

2. In `src/context/AuthContext.jsx`, uncomment:
   ```js
   const { data } = await api.post('/auth/login', { email, password });
   ```
   and remove the mock block below it.

3. Ensure your backend returns:
   ```json
   { "token": "jwt-string", "user": { "id", "name", "email", "role", "avatar" } }
   ```

---

## License

MIT
