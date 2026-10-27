# TechCart — Full-Stack Electronics Shopping Web Application

TechCart is a full-stack, responsive modern electronics e-commerce web platform engineered with **React (Vite)**, **Node.js**, **Express.js**, and **MongoDB**. Designed specifically as a high-distinction college web development capstone project, it delivers a real-world shopping experience for high-performance laptops, smartphones, studio headphones, smartwatches, and desktop peripherals.

---

## 🌟 Key Features

### 🛍️ Customer Experience & Navigation
- **10 Core Functional Tabs & Sections:**
  1. **Home**: Hero banner, trust badges, category showcases, flash offers, handpicked flagships, developer banner.
  2. **All Products**: Full electronic catalog with multi-facet sidebar filtering.
  3. **Smartphones**: Category-filtered view (iPhones, Galaxy S24, Pixel 9 Pro, OnePlus).
  4. **Laptops**: Category-filtered view (MacBook Pro M3, Dell XPS, ROG Zephyrus, ThinkPad).
  5. **Headphones**: Category-filtered view (Sony WH-1000XM5, Bose Ultra, AirPods Max).
  6. **Accessories**: Keyboards (Keychron), mice (MX Master 3S), fast chargers (Anker 100W GaN), Thunderbolt docks.
  7. **Offers & Hot Deals**: Filtered view for products with active discounts and limited-time deals.
  8. **My Account**: Profile management, default shipping addresses, security settings.
  9. **Shopping Cart**: Real-time quantity controls, promo code engine (`TECH10`), price breakdown.
  10. **My Orders**: Complete order tracking history with chronological status badges.

- **Dynamic Search & Filtering:**
  - Live keyword search across product names, descriptions, and brands.
  - Multi-attribute sidebar: Category selection, Brand selection, dynamic Price range slider ($50 to $4000), Customer rating filter (4★ & up).
  - Sorting: Newest Arrivals, Price Low-to-High, Price High-to-Low, Highest Rated, Biggest Discount.

- **Product Detail & Stock Guard:**
  - High-res photo gallery with hover zoom.
  - Live inventory tracking (In Stock, Low Stock Warning, Out of Stock disable).
  - Specifications table & key highlights checklist.
  - Quantity selector and instant "Buy Now" fast-checkout.

- **Cart & Server-Validated Checkout:**
  - Cart persists in `localStorage` across refreshes and page reloads.
  - Free express delivery auto-applied for orders over $100.
  - Server-side price & stock recalculation to prevent client-side price tampering.
  - Flexible demo payment options:
    - **Cash on Delivery (Demo)**
    - **Credit / Debit Card (Demo Simulation)**
    - **UPI / QR Code (Demo Instant)**
  - Automated Order ID generation (e.g., `TC-2026-827419`).

### 🔐 Security & Architecture
- **JWT Authentication**: Secure Bearer tokens with 30-day expiry.
- **Bcrypt Password Hashing**: Pre-save salted hash rounds; plaintext passwords never stored or returned in responses.
- **Route Guards**: Protected React Router wrappers for `/my-account`, `/my-orders`, `/checkout`, and `/admin`.
- **Admin Portal**: Live revenue metrics, real-time inventory management, one-click order status progression (`Placed` &rarr; `Processing` &rarr; `Shipped` &rarr; `Delivered`).

---

## 🏗️ Folder Structure

```text
25070521054/
├── client/                          # React + Vite Frontend
│   ├── public/                      # Static assets & favicon
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/                  # Images & brand assets
│   │   ├── components/              # Reusable React components
│   │   │   ├── Navbar.jsx           # Main navigation with search & cart badge
│   │   │   ├── Footer.jsx           # Footer with links & guarantees
│   │   │   ├── HeroBanner.jsx       # Homepage hero carousel/banner
│   │   │   ├── ProductCard.jsx      # E-commerce product card
│   │   │   ├── CategoryCard.jsx     # Department category showcase
│   │   │   ├── TrustBadges.jsx      # Shipping, warranty & support badges
│   │   │   ├── FilterSidebar.jsx    # Price, brand & rating filters
│   │   │   ├── ToastContainer.jsx   # Dynamic floating alert notifications
│   │   │   ├── ProtectedRoute.jsx   # User route guard
│   │   │   ├── AdminRoute.jsx       # Admin route guard
│   │   │   └── ScrollToTop.jsx      # Window scroll reset
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # User session, login, register, logout
│   │   │   └── CartContext.jsx      # Cart items, totals, toast triggers
│   │   ├── pages/
│   │   │   ├── HomePage.jsx         # Homepage
│   │   │   ├── ProductsPage.jsx     # Catalog, search & category page
│   │   │   ├── ProductDetailPage.jsx# Product specs, gallery & add-to-cart
│   │   │   ├── CartPage.jsx         # Cart items & promo code
│   │   │   ├── CheckoutPage.jsx     # Shipping address & demo payment
│   │   │   ├── OrderSuccessPage.jsx # Order confirmation & invoice
│   │   │   ├── MyOrdersPage.jsx     # Order history & status tracking
│   │   │   ├── MyAccountPage.jsx    # Profile & address settings
│   │   │   ├── LoginPage.jsx        # Login with one-click demo credentials
│   │   │   ├── RegisterPage.jsx     # Registration with validation
│   │   │   ├── AdminDashboardPage.jsx# Admin metrics, orders & products
│   │   │   └── NotFoundPage.jsx     # 404 error page
│   │   ├── services/
│   │   │   ├── api.js               # Axios interceptor instance
│   │   │   ├── authService.js       # Auth API client
│   │   │   ├── productService.js   # Products API client
│   │   │   └── orderService.js      # Orders API client
│   │   ├── App.jsx                  # React Router routes
│   │   ├── main.jsx                 # React root DOM mounting
│   │   └── index.css                # Custom CSS design system
│   ├── index.html                   # HTML entry point with Google Fonts
│   ├── package.json                 # Client dependencies & scripts
│   ├── vite.config.js               # Vite config with backend API proxy
│   └── .env.example                 # Frontend env template
├── server/                          # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                    # Mongoose MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Register, login, profile endpoints
│   │   ├── productController.js     # Search, filter, CRUD endpoints
│   │   └── orderController.js       # Order creation, validation & history
│   ├── data/
│   │   └── products.js              # 24+ Seed electronic products
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verify & admin check
│   │   └── errorMiddleware.js       # 404 & centralized error handler
│   ├── models/
│   │   ├── User.js                  # User schema with bcrypt hooks
│   │   ├── Product.js               # Product schema with specs & indexes
│   │   └── Order.js                 # Order schema with verified prices
│   ├── routes/
│   │   ├── authRoutes.js            # /api/auth routes
│   │   ├── productRoutes.js         # /api/products routes
│   │   └── orderRoutes.js           # /api/orders routes
│   ├── scripts/
│   │   └── seed.js                  # Database seeder script
│   ├── server.js                    # Express application entry
│   ├── package.json                 # Server dependencies & scripts
│   └── .env.example                 # Backend env template
├── run-techcart.bat                 # One-click Windows starter script
├── package.json                     # Root workspace convenience package
├── README.md                        # Documentation & setup guide
└── .gitignore                       # Git ignore definitions
```

---

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router v6, Axios, Lucide React Icons |
| **Backend** | Node.js, Express.js, JSON Web Tokens (JWT), Morgan, CORS |
| **Database** | MongoDB (tested with MongoDB Compass, Local MongoDB, and MongoDB Atlas) |
| **ORM / ODM** | Mongoose 8 |
| **Security** | Bcrypt.js (10 salt rounds), JWT Bearer Auth, HTTP-only best practices |
| **Styling** | Modern CSS Variables, Responsive Grid/Flexbox, Space Grotesk & Plus Jakarta Sans typography |

---

## ⚙️ Software Prerequisites

Ensure you have installed:
1. **Node.js**: v18.0.0 or later ([Download Node.js](https://nodejs.org/))
2. **npm**: v9.0.0 or later (bundled with Node.js)
3. **MongoDB**:
   - **Option A (Recommended for Local Testing):** [MongoDB Compass](https://www.mongodb.com/products/tools/compass) & MongoDB Community Server running at `mongodb://127.0.0.1:27017/techcart`.
   - **Option B (Cloud Testing):** A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster connection string.
4. **Code Editor**: Visual Studio Code ([Download VS Code](https://code.visualstudio.com/))

---

## 🚀 Step-by-Step Installation & Setup

### Step 1: Open the Project in VS Code
1. Extract `25070521054.zip` to your computer.
2. Open Visual Studio Code.
3. Click **File > Open Folder...** and select the extracted `25070521054` folder.
4. Open the integrated terminal (`Ctrl + ~` or **Terminal > New Terminal**).

---

### Step 2: Configure Environment Variables

#### Backend Configuration:
1. In the `server/` directory, copy `.env.example` to `.env`:
   ```bash
   # Windows PowerShell
   copy server/.env.example server/.env
   ```
2. Verify or update `server/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://127.0.0.1:27017/techcart
   JWT_SECRET=techcart_super_secret_jwt_key_2026_secure
   JWT_EXPIRE=30d
   CLIENT_URL=http://localhost:5173
   ```
   > **Note for MongoDB Atlas Users:** Replace `MONGODB_URI` with your connection string:
   > `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/techcart?retryWrites=true&w=majority`

#### Frontend Configuration:
1. In the `client/` directory, copy `.env.example` to `.env`:
   ```bash
   copy client/.env.example client/.env
   ```
2. Verify `client/.env`:
   ```env
   VITE_API_BASE_URL=/api
   ```

---

### Step 3: Install Dependencies

#### Install Backend Dependencies:
```bash
cd server
npm install
cd ..
```

#### Install Frontend Dependencies:
```bash
cd client
npm install
cd ..
```

*(Alternatively, run `npm run install:all` from the root directory).*

---

### Step 4: Seed Sample Electronics Products

Populate MongoDB with 24+ realistic electronic products (smartphones, laptops, headphones, smartwatches, keyboards, SSDs, and chargers) and test accounts:

```bash
cd server
npm run seed
```

Output:
```text
 Connected to MongoDB for seeding.
 Cleaning old records...
 Creating demo accounts...
 Seeding electronic products catalogue...
 Inserted 24 high-quality electronic products.
 Sample demo order created for test user.

=============================================
🎉 SEEDING COMPLETED SUCCESSFULLY!
=============================================
Default Credentials:
  Admin: admin@techcart.com / adminpassword123
  User:  alex@example.com   / userpassword123
=============================================
```

---

### Step 5: Start Development Servers

You can start both servers simultaneously:

#### Option A: Quick Windows Batch Launcher
Double-click `run-techcart.bat` in the project root folder. It opens two terminal windows for the backend and frontend automatically.

#### Option B: Separate Terminals in VS Code

**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
```
Backend will start on: **`http://localhost:5000`**

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```
Frontend will start on: **`http://localhost:5173`**

Open your web browser and navigate to: **`http://localhost:5173`**

---

## 🔑 Pre-Configured Test Credentials

For fast evaluation, the Login page includes one-click buttons to auto-fill credentials:

| Role | Email Address | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Customer** | `alex@example.com` | `userpassword123` | Browsing, Cart, Checkout, Order History, Profile |
| **Administrator** | `admin@techcart.com` | `adminpassword123` | Full access + Admin Portal (Product CRUD & Order management) |

You can also click **Sign Up** to register any new account with automated password hashing.

---

## 📡 API Endpoints Reference

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & issue JWT token |
| `GET` | `/api/auth/profile` | Private | Get authenticated user profile |
| `PUT` | `/api/auth/profile` | Private | Update user profile, address, or password |

### 2. Products (`/api/products`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | Get products with search, category, brand, price & sort |
| `GET` | `/api/products/meta/filters` | Public | Get distinct categories, brands & max price |
| `GET` | `/api/products/:id` | Public | Get single product by ID with full specs |
| `POST` | `/api/products` | Admin | Create a new electronic product |
| `PUT` | `/api/products/:id` | Admin | Update an existing product |
| `DELETE`| `/api/products/:id` | Admin | Remove a product from the database |

### 3. Orders (`/api/orders`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Private | Validate stock/price and create an order |
| `GET` | `/api/orders/myorders` | Private | Get logged-in user's order history |
| `GET` | `/api/orders/:id` | Private | Get specific order details by ID |
| `GET` | `/api/orders` | Admin | View all customer orders |
| `PUT` | `/api/orders/:id/status` | Admin | Update order status (`Processing`, `Shipped`, `Delivered`) |

### 4. Health Check
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Returns server status and MongoDB connection state |

---

## 🧪 Verification & Testing Checklist

- [x] **Backend Server Starts**: Connects on port 5000 and logs active connection.
- [x] **Frontend Starts**: Vite hot-reloading dev server on port 5173.
- [x] **MongoDB Seeding**: Creates admin, demo user, 24+ items, and an initial order.
- [x] **10 Navigation Tabs**:
  - Home (`/`)
  - All Products (`/products`)
  - Smartphones (`/category/Smartphones`)
  - Laptops (`/category/Laptops`)
  - Headphones (`/category/Headphones`)
  - Accessories (`/category/Accessories`)
  - Offers & Deals (`/offers`)
  - My Account (`/my-account`)
  - Shopping Cart (`/cart`)
  - My Orders (`/my-orders`)
- [x] **Product Search**: Type "MacBook", "Sony", or "Keyboard" in top search bar to view instant filtered results.
- [x] **Sidebar Filters**: Slider filters products dynamically up to selected price; rating checkbox filters 4★ & above.
- [x] **Cart Math & Persistence**: Modifying quantities updates subtotal, 5% tax, and shipping calculation live; cart state remains intact after page refresh.
- [x] **Demo Promo Code**: Entering `TECH10` applies an instant 10% coupon discount.
- [x] **Checkout & Order Creation**: Select Cash on Delivery or Demo Card; server validates stock and generates unique order number `TC-2026-XXXXXX`.
- [x] **Order History**: Check `/my-orders` to see newly placed orders with shipping breakdown.
- [x] **Admin Controls**: Login as admin and navigate to `/admin` to update order delivery status or create products.
- [x] **Responsive Layout**: Fluid design tested across desktop (1920x1080), tablet (768px), and mobile (375px).

---

## 📸 Adding Screenshots to Your Submission

To add screenshots of TechCart in action to your college report:
1. Run the application and open `http://localhost:5173`.
2. Take screenshots of:
   - **Homepage**: Hero banner, category department cards, and featured deals.
   - **Catalog & Filters**: Filter sidebar with price slider and search results.
   - **Product Details**: Specifications table, stock status, and add-to-cart controls.
   - **Cart & Promo Code**: Cart summary with `TECH10` discount applied.
   - **Checkout**: Shipping address form and payment selector.
   - **Order Confirmation**: Order ID receipt screen.
   - **My Orders**: Chronological order history with status badges.
   - **Admin Portal**: Revenue metrics and order status updater.
3. Save the images in `client/src/assets/screenshots/` and embed them into your documentation or report.

---

## 🐙 Uploading to GitHub

To push this project to your GitHub profile:

1. Create a new repository on [GitHub](https://github.com/new) named `techcart-electronics` (leave README unchecked).
2. Open terminal in the `25070521054` root directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Complete TechCart Full-Stack Electronics Shopping Web App"
   git branch -M main
   git remote add origin https://github.com/<your-username>/techcart-electronics.git
   git push -u origin main
   ```
*(The provided `.gitignore` automatically prevents `node_modules` and local environment files from being uploaded).*

---

## 📄 License & Attribution

Developed as an academic full-stack web development project.
All product trademarks, names, and images belong to their respective manufacturers and are utilized under fair educational demonstration principles.
