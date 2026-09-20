Run the project:

```bash
npm run dev
```

The server runs on:

`http://localhost:3000`

## Environment Variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
JWT_SECRET=your_secret_here
```

## Authentication

### Register

POST `/api/auth/register`

Request body:

```json
{
  "name": "mohammadMehdi",
  "email": "test@gmail.com",
  "password": "12345678"
}
```

### Login

POST `/api/auth/login`

Request body:

```json
{
  "email": "mohammadMehdi10@gmail.com",
  "password": "12345678"
}
```

### Admin Account

- Email: `mohammadMehdi10@gmail.com`
- Password: `12345678`
- Role: `ADMIN`

After login, copy the returned token and use it as a Bearer Token for protected endpoints.

### Get Profile

GET `/api/auth/profile`

Authorization:

`Bearer Token`

## Categories

### Get All Categories

GET `/api/categories`

### Get Category By ID

GET `/api/categories/:id`

### Create Category

POST `/api/categories`

Request body:

```json
{
  "name": "Mobile",
  "description": "Mobile phones and smartphones"
}
```

### Update Category

PUT `/api/categories/:id`

Request body:

```json
{
  "name": "Smartphones",
  "description": "All kinds of smartphones"
}
```

### Delete Category

DELETE `/api/categories/:id`

## Products

### Get All Products

GET `/api/products`

### Get Product By ID

GET `/api/products/:id`

### Create Product

POST `/api/products`

This endpoint requires an ADMIN account.

Authorization:

`Bearer Token`

Body type:

`form-data`

Fields:

- `name` - Text
- `description` - Text
- `price` - Text
- `stock` - Text
- `categoryId` - Text
- `image` - File

### Update Product

PUT `/api/products/:id`

This endpoint requires an ADMIN account.

Authorization:

`Bearer Token`

Request body:

```json
{
  "name": "iPhone 15 Pro",
  "description": "Updated Apple smartphone",
  "price": 60000,
  "stock": 15,
  "categoryId": "CATEGORY_ID"
}
```

### Delete Product

DELETE `/api/products/:id`

This endpoint requires an ADMIN account.

Authorization:

`Bearer Token`

## User Images

### Get User Images

GET `/api/users/images`

Authorization:

`Bearer Token`

### Upload User Image

POST `/api/users/images`

Authorization:

`Bearer Token`

Body type:

`form-data`

Field:

- `image` - File

### Delete User Image

DELETE `/api/users/images/:id`

Authorization:

`Bearer Token`

## Favorites

### Get Favorites

GET `/api/favorites`

Authorization:

`Bearer Token`

### Add Favorite

POST `/api/favorites`

Authorization:

`Bearer Token`

Request body:

```json
{
  "productId": "PRODUCT_ID"
}
```

### Remove Favorite

DELETE `/api/favorites/:productId`

Authorization:

`Bearer Token`

## Static Files

Uploaded images are available through:

`http://localhost:3000/files`

Example:

`http://localhost:3000/files/users/image.jpg`

## API Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Postman

All API endpoints were added to a Postman collection.

Collection structure:

- Auth
- Categories
- Products
- Users
- Favorites

All endpoints were tested using Postman.

## Authorization

Some endpoints require authentication.

Use the JWT token returned from the login endpoint:

```text
Authorization: Bearer YOUR_TOKEN
```

Admin-only product endpoints require an account with the `ADMIN` role.
