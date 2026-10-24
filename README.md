# Node RESTful Web Service

[![CI](https://github.com/Rob-Leggett/node_restful_webservice/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/Rob-Leggett/node_restful_webservice/actions/workflows/ci.yml) [![License](https://img.shields.io/github/license/Rob-Leggett/node_restful_webservice)](LICENSE) [![Node.js 26](https://img.shields.io/badge/Node.js-26-5FA04E?logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![Express 5.3](https://img.shields.io/badge/Express-5.3-000000?logo=express&logoColor=white)](https://expressjs.com/) [![Mongoose 9.11](https://img.shields.io/badge/Mongoose-9.11-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)

A RESTful Node.js API built with Express, MongoDB, and JWT authentication.

## Features

- 🚀 Modern ES Modules (ESM) syntax
- 🔐 JWT-based authentication
- 📦 MongoDB with Mongoose ODM
- ✅ Unit tests with Mocha, Chai, and Sinon
- 🔄 GitHub Actions CI/CD pipeline
- 📝 Request logging with Morgan

## Requirements

- Node.js >= 26 (see `.nvmrc`)
- MongoDB (local or remote)

## Installation

```bash
# Clone the repository
git clone https://github.com/Rob-Leggett/node_restful_webservice.git
cd node_restful_webservice

# Install dependencies
npm install
```

## Configuration

The application uses environment variables for configuration:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `MONGODB_URI` | `mongodb://localhost:27017/node_restful_example` | MongoDB connection string |
| `JWT_SECRET` | `examplesecret` | Secret key for JWT signing |
| `RATE_LIMIT_MAX` | `300` | Requests per 15 min per IP for `/customer` routes |
| `AUTH_RATE_LIMIT_MAX` | `20` | Requests per 15 min per IP for `/authenticate` |
| `NODE_ENV` | - | Set to `development` to seed the database |

## Usage

### Development

```bash
# Start with database seeding
npm run dev
```

### Production

```bash
npm start
```

The server runs on **http://localhost:3000** by default.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/authenticate` | Get JWT token |

**Request body:**
```json
{
  "name": "example",
  "password": "password"
}
```

### Customers (Protected)

All customer endpoints require a valid JWT token in the `token` header or `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/customer` | Get all customers |
| GET | `/customer/:id` | Get customer by ID |
| POST | `/customer` | Create new customer |
| PUT | `/customer/:id` | Update customer |
| DELETE | `/customer/:id` | Delete customer |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |

## Testing

```bash
npm test
npm run lint
```

## Project Structure

```
├── app/
│   ├── authenticate/     # Authentication module
│   ├── configuration/    # App configuration
│   ├── customer/         # Customer module
│   ├── user/            # User models and queries
│   ├── exceptionHandler.js
│   └── server.js
├── config/
│   └── seed.js          # Database seeding
├── test/                # Unit tests
└── .github/workflows/   # CI/CD pipelines
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Robert Leggett

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

