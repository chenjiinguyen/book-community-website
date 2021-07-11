let swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Book Community - Doc",
      version: "1.0.0",
      description: "API Book Community - Doc",
      contact: {
        name: "chenjinguyen",
        url: "#",
        email: "#",
      },
    }
  },
  servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  apis: ["./app/docs/api/*.yaml"],
};
const specs = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs),
};
