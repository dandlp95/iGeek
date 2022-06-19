const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  // host: "igeekb.herokuapp.com",
  // schemes: ["https"],
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
      interests: [],
    },
    Accounts: [{ $ref: "#/definitions/Account" }],
    Product: {
      productName: "Test Product",
      productDescription: "This is a test description for test product",
      stock: 5,
      cost: 100,
    },
    Products: [{ $ref: "#/definitions/Product" }],
    ReceiptResponse: {
      accountId: "62a54ac57d0c23aca502a25c",
      purchase: [
        {
          productId: "62895a86d7c8591701dd2be4",
          productName: "Justice League #45",
          cost: 4,
          quantity: 1,
        },
      ],
    },
    ReceiptRequest: {
      purchase: [
        {
          productId: "62895a86d7c8591701dd2be4",
          productName: "Justice League #45",
          cost: 4,
          quantity: 1,
        },
      ],
    },
    LoginCreds: {
      userName: "userName",
      password: "123456"
    },
    LoginConfirm: {
      token: "String",
      password: "String",
    }
  },
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
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
