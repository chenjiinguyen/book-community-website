let swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Analytics Project",
      version: "1.0.0",
      description: "Analytics API swagger documentation",
      contact: {
        name: "chenjinguyen",
        url: "https://chenjinguyen.com",
        email: "info@email.com",
      },
    }
  },
  servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  apis: ["./routes/api.js"],
};
const specs = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs),
};
