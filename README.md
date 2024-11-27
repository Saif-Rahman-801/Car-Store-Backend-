# Car Store B4A2V3 - Backend API

## Description

The **Car Store** project is a backend server built using **TypeScript**, **Express**, **Mongoose**, and **MongoDB**. It manages a car store system by providing a RESTful API to perform CRUD operations on cars and orders while ensuring data integrity and scalability.

---

## Features

1. **CRUD Operations**:
   - Create, Read, Update, and Delete Cars.
   - Place and manage Orders.

2. **Inventory Management**:
   - Automatic inventory updates when an order is placed.
   - Stock availability status (`inStock`) management.

3. **Revenue Calculation**:
   - Aggregated revenue calculation from all orders.

4. **Search and Filtering**:
   - Query cars based on `brand`, `model`, or `category`.

5. **Validation**:
   - Schema validation using **Mongoose**.
   - Input validation for user-friendly error messages.

6. **Error Handling**:
   - Detailed error responses for validation failures and other errors.

---

## Tech Stack

- **Programming Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod & Mongoose Schema
- **Development Tools**: ESLint, Prettier, Nodemon, and TypeScript Compiler

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Saif-Rahman-801/Car-Store-Backend-.git
   cd car-store
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=your_PORT
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Start the Server**:
   - For development:
     ```bash
     npm run start:dev
     ```
   - For production:
     ```bash
     npm run build
     npm run start:prod
     ```

---

## API

## API Deployment

The backend of this project is deployed and accessible at the following link:

**Base URL:** [https://your-api-deployment-link.com](https://your-api-deployment-link.com)


## Endpoints

### 1. **Cars**

- **Create a Car**  
  - **POST** `/api/cars`
  - Request body:  
    ```json
    {
      "brand": "Toyota",
      "model": "Camry",
      "year": 2024,
      "price": 25000,
      "category": "Sedan",
      "description": "A reliable family sedan.",
      "quantity": 50,
      "inStock": true
    }
    ```
  - Response: Success message and created car details.

- **Get All Cars**  
  - **GET** `/api/cars`
  - Query: `/api/cars?searchTerm=category`
  - Response: List of cars filtered by search term.

- **Get a Specific Car**  
  - **GET** `/api/cars/:carId`
  - Response: Details of the specified car.

- **Update a Car**  
  - **PUT** `/api/cars/:carId`
  - Request body (fields to update):  
    ```json
    {
      "price": 27000,
      "quantity": 30
    }
    ```
  - Response: Success message and updated car details.

- **Delete a Car**  
  - **DELETE** `/api/cars/:carId`
  - Response: Success message confirming the car deletion.

---

### 2. **Orders**

- **Place an Order**  
  - **POST** `/api/orders`
  - Request body:  
    ```json
    {
      "email": "customer@example.com",
      "car": "carId_from_database",
      "quantity": 1,
      "totalPrice": 25000
    }
    ```
  - Response: Success message and order details.

- **Calculate Revenue**  
  - **GET** `/api/orders/revenue`
  - Response: Total revenue from all orders.

---

## Error Handling

- **Generic Error Response**:
  ```json
  {
    "message": "Validation failed",
    "success": false,
    "error": {
      "name": "ValidationError",
      "errors": {
        "field": {
          "message": "Specific error message",
          "kind": "validation_type"
        }
      }
    },
    "stack": "Error stack trace..."
  }
  ```

- **Common Errors**:
  - `404 Not Found`: If a resource is unavailable.
  - `400 Bad Request`: For invalid input or schema validation failure.
  - `500 Internal Server Error`: For unexpected issues.

---

## Project Structure

```plaintext
car-store/
│
├── src/
│   ├── models/          # Mongoose models for Cars and Orders
│   ├── routes/          # API routes for cars and orders
│   ├── controllers/     # Request handlers for routes
│   ├── middlewares/     # Custom middleware (e.g., error handling)
│   ├── utils/           # Helper functions
│   ├── server.ts        # Entry point for the application
│   └── app.ts           # Express application setup
│
├── .env                 # Environment variables
├── .eslint.config.mjs   # ESLint configuration
├── .prettierrc          # Prettier configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project metadata and dependencies
├── README.md            # Project documentation
└── dist/                # Compiled JavaScript (for production)
```

---

## Run Linting and Formatting

- **Lint Code**:
  ```bash
  npm run lint
  ```
- **Fix Lint Errors**:
  ```bash
  npm run lintFix
  ```
- **Format Code**:
  ```bash
  npm run prettier:fix
  ```

---

## Deployment

The project can be deployed on any Node.js-compatible hosting platform. Ensure the `MONGO_URI` and other environment variables are configured in the hosting environment.

---

## Author

**Saif Rahman**  
Email: [saifurs102@gmail.com](mailto:saifurs102@gmail.com)

---






