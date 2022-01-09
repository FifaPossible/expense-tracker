const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const routes = require("./routes");

const app = express();
app.use("/profile_Pictures", express.static("./profile_pictures"));

dotenv.config();

mongoose.connect(
   process.env.DB_CONNECTION,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   },
   () => console.log(" App successfully connected to database")
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((_, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
   );
   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
   next();
});

app.use(routes);

app.listen(process.env.PORT, () => {
   console.log(`App is starting in port ${process.env.PORT}`);
});
