//index.js
const express = require("express");
const session = require("express-session");
const app = express();

app.use(
  session({
    //this mandatory configuration ensures that session IDs are not predictable
    secret: "SunnyB3aches", //or whatever you like <-- what does this mean?
    //thsi option says if you havent changed anything, dont resave. It is recommended and reduces session concurrency issues.
    resave: false,
    //this option says if i am new but not modified still save
    saveUninitialized: true
  })
);

app.use((req, res, next) => {
  console.log("SESSION", req.session);
  next();
});

app.use((req, res, next) => {
  // make sure to put this AFTER your session middleware, but BEFORE you send your response!
  if (!req.session.counter) req.session.counter = 0;
  console.log("counter", ++req.session.counter); //increment THEN log
  next(); // needed to continue through expredd middleware
});

app.get("/", (req, res, next) => {
  res.send("Hello");
});

app.listen(8080, () => console.log("Listening at http://localhost:8080"));
