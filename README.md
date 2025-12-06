## Project Deliverables

## Frontend Application
**Live URL:** [https://inventory-frontend-3fdf.vercel.app](https://inventory-frontend-3fdf.vercel.app)

## Backend API
**Base URL:** [https://inventory-store-api.onrender.com](https://inventory-store-api.onrender.com)

## API Documentation

### Available Endpoints

#### Products Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/:id` | Get single product by ID |
| `POST` | `/api/products` | Create new product |
| `PUT` | `/api/products/:id` | Update existing product |
| `DELETE` | `/api/products/:id` | Delete product |
| `POST`  | `/api/deduct-stock/:id` | Deduct Product stock |

#### Suppliers Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/suppliers` | Get all suppliers |
| `GET` | `/api/suppliers/:id` | Get single supplier by ID |
| `POST` | `/api/suppliers` | Create new supplier |
| `PUT` | `/api/suppliers/:id` | Update existing supplier |
| `DELETE` | `/api/suppliers/:id` | Delete supplier |

#### Orders Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/orders` | Get all orders |
| `GET` | `/api/orders/:id` | Get single order by ID |
| `POST` | `/api/orders` | Create new order |
| `PUT` | `/api/orders/:id` | Update existing order |
| `DELETE` | `/api/orders/:id` | Delete order |

## Technology Stack
- **Frontend:** React.js, Vite, CSS3
- **Backend:** Node.js, Express.js, MongoDB
- **Deployment:** Vercel (Frontend), Render (Backend)

---
