# Inventory Manager

A modern and intuitive Product Management System built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Bootstrap. This application provides a seamless experience for managing a product inventory, allowing users to perform CRUD (Create, Read, Update, Delete) operations with ease.

![Screenshot of the Inventory Manager application](placeholder-for-screenshot.png)
*(A screenshot of the application dashboard would go here)*

## ✨ Features

This system is packed with features to make inventory management simple and efficient:

*   **Dashboard View**: View all products at a glance with a clean, card-based layout.
*   **Add & Edit Products**: A user-friendly modal form allows for easily adding new products or updating existing ones.
*   **Delete Products**: Safely remove products with a confirmation step to prevent accidental deletions.
*   **Dynamic Search**: Instantly find products by name with a real-time search bar.
*   **Smart Filtering**: Filter the product view by category.
*   **Price Sorting**: Sort products by price in either ascending or descending order.
*   **Stock Status**: Quickly see if a product is "In Stock" or "Out of Stock" with clear visual badges.
*   **Responsive Design**: A fully responsive interface that works seamlessly on desktop, tablet, and mobile devices.
*   **Error Handling**: Robust error handling on both the client and server to guide the user.

## 🛠️ Tech Stack

The application is built with a modern, robust, and scalable tech stack:

*   **Frontend**:
    *   [React](https://react.dev/): A JavaScript library for building user interfaces.
    *   [Vite](https://vitejs.dev/): A next-generation frontend tooling for a fast development experience.
    *   [Bootstrap](https://getbootstrap.com/): A popular CSS framework for responsive, mobile-first front-end web development.
    *   [Axios](https://axios-http.com/): A promise-based HTTP client for the browser and Node.js.
    *   [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/): For beautiful and consistent icons.

*   **Backend**:
    *   [Node.js](https://nodejs.org/): A JavaScript runtime built on Chrome's V8 JavaScript engine.
    *   [Express.js](https://expressjs.com/): A minimal and flexible Node.js web application framework.
    *   [MongoDB](https://www.mongodb.com/): A general-purpose, document-based, distributed database.
    *   [Mongoose](https://mongoosejs.com/): An elegant MongoDB object modeling for Node.js.
    *   [CORS](https://www.npmjs.com/package/cors): For handling Cross-Origin Resource Sharing.
    *   [Dotenv](https://www.npmjs.com/package/dotenv): For managing environment variables.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or later)
*   [npm](https://www.npmjs.com/)
*   [MongoDB](https://www.mongodb.com/try/download/community) installed and running on your local machine or a connection string to a cloud instance (e.g., MongoDB Atlas).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://your-repository-url/product-management.git
    cd product-management
    ```

2.  **Set up the Backend:**
    ```sh
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install

    # Create a .env file from the example
    cp .env.example .env
    ```
    Now, open the `.env` file and add your MongoDB connection string:
    ```env
    MONGO_URI=mongodb://localhost:27017/product-manager
    PORT=5000
    ```

3.  **Set up the Frontend:**
    ```sh
    # Navigate to the frontend directory from the root
    cd ../frontend

    # Install dependencies
    npm install
    ```

### Running the Application

1.  **Start the Backend Server:**
    ```sh
    # In the /backend directory
    npm run dev
    ```
    The backend server will start on `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    ```sh
    # In the /frontend directory
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173`. Open this URL in your browser to use the application.

## 📂 Project Structure

The project is organized into two main directories:

```
product-management/
├── backend/      # Contains the Node.js/Express server, Mongoose models, routes, etc.
├── frontend/     # Contains the React/Vite client application, components, pages, etc.
└── README.md
```

## 📝 API Endpoints

The backend exposes the following RESTful API endpoints for managing products:

| Method | Endpoint             | Description                |
| :----- | :------------------- | :------------------------- |
| `GET`    | `/products`        | Get all products (with optional search, category, and sort queries) |
| `POST`   | `/products`        | Create a new product       |
| `PUT`    | `/products/:id`    | Update an existing product |
| `DELETE` | `/products/:id`    | Delete a product           |

---

This README was crafted to be helpful and clear. If you have any questions, feel free to open an issue!