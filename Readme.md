


# Blogging Website

This is a blogging website that uses Hono with Cloudflare for the backend and Prisma for ORM with no-engine. The frontend is built with React, Shadcn, Tailwind, Flowbite, and React-Quill. Additionally, it utilizes a custom npm package published on the npm package manager.

## Technologies Used

### Backend
- Hono: A lightweight, high-performance web framework.
- Cloudflare: For deploying the backend.
- Prisma: An acceleration ORM with no-engine.

### Frontend
- React: A JavaScript library for building user interfaces.
- Shadcn: A component library for React.
- Tailwind CSS: A utility-first CSS framework.
- Flowbite: Components built with Tailwind CSS.
- React-Quill: A rich text editor component for React.

### Custom npm Package
- Your Custom Package: A custom npm package that provides additional functionality for the project.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- Prisma / Prisma Accelration
- DataBase Url for Postgres


### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies for the backend:
    ```bash
    cd backend
    npm install
    ```

3. Install dependencies for the frontend:

    ```bash
    cd frontend
    npm install
    ```
 4. Make a .env file and Paste that Postgres Url.
  
 5. Lastly, Get a Connection Pooled Url from Primsa Acceleration for Connection Pooling.
    
 6. To Initialize Primsa and Prisma/Client
    ```bash
    npx prisma migrate dev

    npx prisma generate --no-engine
    ```


### Running the Application


#### Backend and 
To start the backend server, navigate to the `/backend` directory and run:

```bash
npm run dev
```


#### Frontend
To start the frontend development server, navigate to the `/frontend` directory and run:
```bash
npm run dev
```

### Directory Structure

```
your-repo-name/
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── ...
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── ...
```

### Using the Custom npm Package

Make sure to install the custom npm package in both the backend and frontend if it is required in both parts of the application. You can install it using:

```bash
npm install @100xNavi/Medium
```



## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.