# Document Management System

A scalable and secure document management system built with **NestJS**, **TypeORM**, and **PostgreSQL**. This application supports user authentication, role-based access control, document management, and ingestion processes.

## **Features**
- **Authentication**: Secure login and registration using JWT.
- **Role-Based Access Control (RBAC)**: Admin, Editor, and Viewer roles to control access to resources.
- **Document Management**: Upload, retrieve, update, and delete documents.
- **Ingestion Process**: Trigger and monitor ingestion processes for documents.
- **Rate Limiting**: Protect endpoints from abuse using rate limiting.
- **Scalable Architecture**: Modular design for easy scalability and maintainability.


## Project Structure
The project follows a modular structure for better organization and scalability:

```
src/
├── app.module.ts          # Root application module
├── main.ts                # Application entry point
├── auth/                  # Authentication module
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts    # JWT authentication strategy
├── common/                # Shared utilities
│   ├── roles.decorator.ts # Role-based access decorator
│   └── roles.guard.ts     # Role-based access guard
├── document/              # Document management
│   ├── document.controller.ts
│   ├── document.entity.ts
│   ├── document.module.ts
│   ├── document.service.ts
│   └── multer.config.ts   # File upload configuration
├── ingestion/             # Document processing
│   ├── ingestion.controller.ts
│   ├── ingestion.module.ts
│   ├── ingestion.service.ts
│   ├── ingestion-process.entity.ts
│   └── dto/               # Data transfer objects
│       └── trigger-ingestion.dto.ts
└── user/                  # User management
    ├── user.controller.ts
    ├── user.entity.ts
    ├── user.module.ts
    ├── user.service.ts
    └── dto/
        └── update-role.dto.ts
```

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd doc-manager
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
DB_HOST=hostname
DB_PORT=port
DB_USERNAME=db-username
DB_PASSWORD=db-password
DB_NAME=doc_manager
JWT_SECRET=your_jwt_secret
PORT=port
```

4. Run the application:
```bash
npm run start:dev
```

## API Documentation

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Users
- `GET /users` - Get all users (Admin only)
- `PATCH /users/:id/role` - Update user role (Admin only)

### Documents
- `POST /documents/upload` - Upload a document
- `GET /documents` - List all documents
- `GET /documents/:id` - Get document details
- `DELETE /documents/:id` - Delete a document

### Ingestion
- `POST /ingestion/trigger` - Trigger document processing

## Development

### Running the app
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

### Testing
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

### Linting
```bash
# lint and fix
npm run lint
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start:prod
```

For containerized deployment, you can use Docker. A sample Dockerfile is recommended:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT](https://choosealicense.com/licenses/mit/)
