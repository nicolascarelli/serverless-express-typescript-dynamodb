# Aws Lambda(Serverless) Express TypeScript Dynamo DB CRUD API Starter

This project is a starter kit for building serverless APIs with TypeScript, Node.js, and AWS Lambda. It includes a basic Express server, a DynamoDB database, and some example endpoints for managing categories and products.

## Getting Started

To get started with this project, you should have the following software installed on your computer:

- Node.js
- npm or yarn
- The Serverless Framework CLI

Then, follow these steps:

1. Clone this repository to your local machine.
2. Run `npm install` to install the project's dependencies.
3. Set up your AWS credentials using the Serverless Framework CLI or environment variables.
4. Run `npm run build` to compile the TypeScript code to JavaScript.
5. Run `npm run start` to start the local development server.
6. Run `npm run deploy` to start the deploy it.
6. Run `npm run test` to run tests.

You can now access the example endpoints at `http://localhost:3000`.

## API Endpoints

This starter kit includes the following API endpoints:

### Categories

- `GET /categories`: Get all categories.
- `GET /categories/{id}`: Get a category by ID.
- `POST /categories`: Create a new category with an optional image.
- `PUT /categories/{id}`: Update a category by ID with an optional image.
- `DELETE /categories/{id}`: Delete a category by ID.

### Products

- `GET /products`: Get all products.
- `GET /products/{id}`: Get a product by ID.
- `POST /products`: Create a new product with an optional list of images.
- `PUT /products/{id}`: Update a product by ID with an optional list of images.
- `DELETE /products/{id}`: Delete a product by ID.

## Contributing

Contributions to this project are welcome! If you find a bug or want to add a new feature, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.