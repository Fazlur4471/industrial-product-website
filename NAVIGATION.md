# Fast-Map Website Navigation Guide

## Customer-Facing Pages

### Home Page
- **Route**: `/`
- **Description**: Landing page with hero section and featured products showcase
- **Features**: 
  - Hero section with call-to-action buttons
  - Featured products grid (4 products)
  - Header with navigation
  - Footer with contact info

### Trading Products
- **Route**: `/trading`
- **Description**: Browse all trading category products
- **Products**: Steel Plates, Pipes, Aluminum Ingots, Copper Rods

### Manufacturing Services
- **Route**: `/manufacturing`
- **Description**: Browse all manufacturing category products
- **Products**: CNC Turning, Welding & Fabrication, Metal Stamping, Heat Treatment

### Product Detail Page
- **Route**: `/{product-slug}`
- **Example**: `/industrial-steel-plate`, `/cnc-turning-services`
- **Features**:
  - Product images gallery
  - Detailed specifications
  - Price information
  - Request Enquiry button
  - Place Order button
  - Related products suggestions

### Enquiry Form
- **Route**: `/enquiry`
- **Description**: Submit product enquiries
- **Fields**: Name, Email, Phone, Company, Product Interest, Message

### Order Form
- **Route**: `/order`
- **Description**: Direct ordering form
- **Fields**: Customer Name, Email, Phone, Company, Product, Quantity, Delivery Address

## Admin Dashboard Pages

### Admin Dashboard (Home)
- **Route**: `/admin`
- **Description**: Admin overview with stats
- **Cards**: Total Products, Enquiries, Orders, Revenue

### Products Management
- **Route**: `/admin/products`
- **Description**: Manage product catalog
- **Features**: Product table with Edit/Delete actions

### Enquiries Management
- **Route**: `/admin/enquiries`
- **Description**: View and manage customer enquiries
- **Features**: Enquiry table with customer details and dates

### Orders Management
- **Route**: `/admin/orders`
- **Description**: Track customer orders
- **Features**: Order table with status tracking

## Available Product Slugs

### Trading Products
- `industrial-steel-plate`
- `industrial-pipe`
- `aluminum-ingots`
- `copper-rods`

### Manufacturing Products
- `cnc-turning-services`
- `welding-fabrication`
- `metal-stamping`
- `heat-treatment`

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/[slug]` - Get single product
- `POST /api/enquiries` - Submit enquiry
- `POST /api/orders` - Submit order

## Design Colors

- **Primary**: Dark Industrial Blue (#1a3a5f)
- **Accent**: Gold/Copper (#d4a574)
- **Background**: Very Dark Gray (#0f1419)
- **Secondary**: Dark Gray (#1a2332)
- **Text**: Light Gray (#e8eaed)

## Mobile Responsive

All pages are fully responsive:
- Mobile (320px+): Single column layouts, collapsible menus
- Tablet (768px+): Two column layouts
- Desktop (1024px+): Full layouts with sidebars (admin)
