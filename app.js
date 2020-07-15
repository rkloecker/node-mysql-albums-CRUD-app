const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var routes = require("./routes/albumRoutes");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port, () =>
  console.log(`RESTful API server started on port ${port}`)
);
