//
// This server will be started by Protractor in end-to-end tests.
// Add your API mocks for your specific project in this file.
//
const express = require("express");
const port = 3000;

let app = express();
let routes = require("express").Router();

// Add CORS headers so our external Angular app is allowed to connect
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

routes.post("/api/login", (req, res, next) => {
  const user = {
    _id: "5fca55a5a9e70733e4445ba5",
    employee: true,
    appointment: [],
    timeslot: [],
    firstName: "Ruben",
    lastName: "van Oers",
    streetAddress: "Magnolia 23",
    postalCode: "5682EL",
    city: "Best",
    dateOfBirth: "1998-03-12T23:00:00.000Z",
    phoneNumber: 618440009,
    email: "Rubenvanoers@outlook.com",
    password: "$2b$10$3uAoCwS3OjPzszkAk0AdXef/IvTCA1GIEeQqU9GTHM43ZnA.eAS1G",
    __v: 0,
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  res.status(200).send({
    message: "Login succesfull",
    token: token,
    user: user,
  });
});

routes.get("/api/location/search/", (req, res, next) => {
  const locations = [
    {
      _id: "5fc92ca206da013f40642cce",
      name: "Best",
      streetAddress: "Magnolia 23",
      postalCode: "5682EL",
      city: "Best",
      phoneNumber: 618440009,
      email: "Rubenvanoers@outlook.com",
      createdOn: new Date(),
      employee: [],
      haircut: [],
    },
    {
      _id: "5fc92ca206da013f40642ccf",
      name: "Eindhoven",
      streetAddress: "Magnolia 23",
      postalCode: "5682EL",
      city: "Best",
      phoneNumber: 618440009,
      email: "Rubenvanoers@outlook.com",
      createdOn: new Date(),
      employee: [],
      haircut: [],
    },
  ];

  res.status(200).send({
    locations,
  });
});

routes.put("/api/user", (req, res, next) => {
  const user = {
    _id: "5fca55a5a9e70733e4445ba5",
    employee: true,
    appointment: [],
    timeslot: [],
    firstName: "Ruben",
    lastName: "van Avans",
    streetAddress: "Magnolia 23",
    postalCode: "5682EL",
    city: "Best",
    dateOfBirth: "1998-03-12T23:00:00.000Z",
    phoneNumber: 618440009,
    email: "Rubenvanoers@outlook.com",
    password: "$2b$10$3uAoCwS3OjPzszkAk0AdXef/IvTCA1GIEeQqU9GTHM43ZnA.eAS1G",
    __v: 0,
  };
  res.status(200).json({
    message: "user updated",
  });
});

routes.get("/api/location/:id", (req, res, next) => {
  const location = {
    _id: "5fc92ca206da013f40642cce",
    name: "Best",
    streetAddress: "Magnolia 23",
    postalCode: "5682EL",
    city: "Best",
    phoneNumber: 618440009,
    email: "Rubenvanoers@outlook.com",
    createdOn: new Date(),
    employee: [],
    haircut: [],
  };

  res.status(200).send({
    succes: "true",
    status: 200,
    message: "Retrieved location",
    location: location,
  });

  console.log(location);
});

//
// Write your own mocking API endpoints here.
//

// Finally add your routes to the app
app.use(routes);

app.use("*", function (req, res, next) {
  next({ error: "Non-existing endpoint" });
});

app.use((err, req, res, next) => {
  res.status(400).json(err);
});

app.listen(port, () => {
  console.log("Mock backend server running on port", port);
});
