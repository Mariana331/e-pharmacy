# 💊 E-Pharmacy (Franchise)

A web platform for online pharmacy franchise management. Built with Next.js, it provides a full-featured interface for pharmacy owners to manage their stores, medicine catalogue, and view business statistics.

---

## 🚀 Features

- **Authentication** — Registration and login with form validation and error notifications
- **Shop Management** — Create and edit pharmacy store profiles, including logo upload and delivery settings
- **Medicine Catalogue** — Browse, search, filter, add, edit, and delete medicines per store
- **Statistics Dashboard** — Key metrics, recent customers, and income/expense tracking
- **Responsive Layout** — Adaptive from 320px (mobile) through 768px (tablet) to 1440px (desktop)
- **Role-based UI** — Header and Footer adapt dynamically based on user auth status

---

## 🛠️ Tech Stack

### Frontend:

Next.js (App Router)
React
TypeScript
TanStack React Query
Yup
Axios
React Select
React Hook Form
modern-normalize
Zustand

### Backend:

Node.js + Express
MongoDB + Mongoose
bcrypt
Cloudinary
Multer
dotenv
pino-http

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx               # Root layout (SharedLayout)
│   ├── (public)/
│   │   ├── register/
│   │   │   └── page.tsx         # /register
│   │   └── login/
│   │       └── page.tsx         # /login
│   └── (private)/
│       ├── create-shop/
│       │   └── page.tsx         # /create-shop
│       ├── edit-shop/
│       │   └── page.tsx         # /edit-shop
│       ├── shop/
│       │   └── page.tsx         # /shop
│       ├── medicine/
│       │   └── page.tsx         # /medicine
│       └── statistics/
│           └── page.tsx         # /statistics
├── components/
│   ├── layout/
│   │   ├── Header/              # Logo, nav links, logout button
│   │   └── Footer/              # Logo, social links, nav, copyright
│   └── ui/                      # Shared UI components
└── ...
```

---

## 🗺️ Routing

| Route          | Access  | Description                      |
| -------------- | ------- | -------------------------------- |
| `/register`    | Public  | User registration                |
| `/login`       | Public  | User login                       |
| `/create-shop` | Private | Create a new pharmacy            |
| `/edit-shop`   | Private | Edit pharmacy details            |
| `/shop`        | Private | Shop overview with medicine tabs |
| `/medicine`    | Private | Medicine detail page             |
| `/statistics`  | Private | Business statistics dashboard    |

---

## 🔐 Auth Behaviour

- **Unauthenticated** — Only logo is shown in the Header; Footer is hidden
- **Authenticated** — Full navigation (Shop, Medicine, Statistics) and Footer become visible
- After **registration**, the user is automatically logged in and redirected to the private area
- After **login**, the user is redirected to the main private page
- After **logout**, the user is returned to the unauthenticated view

---

## 📄 Pages

### RegisterPage `/register`

Registration form with fields validated on submit. On success, auto-authenticates and redirects. Errors from the backend are shown as notifications.

### LoginPage `/login`

Login form validated on submit. On success, redirects to the main page. Backend errors are shown as notifications.

### CreateShopPage `/create-shop`

Form to create a new pharmacy store, including:

- Shop Name, Owner Name, Email, Phone, Address, City, ZIP, Password
- Logo upload (validated on backend; returns URL for display)
- Has Own Delivery System (Yes / No radio)

### EditShopPage `/edit-shop`

Pre-filled form to update existing pharmacy data. Validates and saves changes to the backend.

### ShopPage `/shop`

Main pharmacy dashboard with two tabs:

- **Drug Store** — Products belonging to this pharmacy (Edit / Delete per item)
- **All Medicine** — Full catalogue with category filter and search; Add to Shop / Details actions

Includes modals for: adding medicine, editing medicine, and confirming deletion.

### MedicinePage `/medicine`

Detailed product view with:

- Product image, name, price, and "Add to shop" button
- **Edit** — opens a modal to update medicine name, price, description, and category; changes are saved to the backend
- **Delete** — opens a confirmation modal before permanently removing the medicine; closes without changes on cancel or outside click
- **Description** tab — full product description
- **Reviews** tab — paginated user reviews with ratings

### StatisticsPage `/statistics`

Business overview including:

- Key metrics: total products, suppliers, customers
- Recent customers table with "View" modal for purchase history
- Today's income/expense log (colour-coded: green / red / grey)

---

## 🎨 Layout & Assets

- **Adaptive breakpoints:** `375px` (mobile), `768px` (tablet), `1440px` (desktop)
- Fonts connected via `@font-face` or Google Fonts
- SVG icons connected via sprite
- Raster images optimised for retina screens with `srcset`
- Static images use lazy loading
- Favicon included
- All markup is validated

---

## 🔗 Social Links (Footer)

| Platform  | URL                                 |
| --------- | ----------------------------------- |
| Facebook  | https://www.facebook.com/goITclub/  |
| Instagram | https://www.instagram.com/goitclub/ |
| YouTube   | https://www.youtube.com/c/GoIT      |

---

## ⚙️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

---

© E-Pharmacy. All Rights Reserved.
