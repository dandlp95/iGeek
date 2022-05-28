const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:8080",
  schemes: ["http"],
  tags: [
    {
      name: "Accounts",
      description:
        "All references needed to get, add, delete and edit accounts.",
    },
    {
      name: "Products",
      description:
        "All references needed to get, add, delete and edit products.",
    },
  ],
  definitions: {
    Account: {
      userName: "TestUserName",
      password: "123456",
      firstName: "Joe",
      lastName: "Doe",
      address: "12 Test Street, ID, USA",
      email: "Joe_Doe@gmail.com",
      purchases: [],
    },
    Accounts: [{ $ref: "#/definitions/Account" }],
    Product: {
      productName: "Test Product",
      productDescription: "This is a test description for test product",
      stock: 5,
      cost: 100,
    },
    Products: [{ $ref: "#/definitions/Product" }],
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js", "./routes/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

//swaggerAutogen(outputFile, endpointsFiles, doc);

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app.js"); // Your project's root file
});
