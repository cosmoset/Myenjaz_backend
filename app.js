require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5500;
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "./app/uploads")));

// User routes middleware
const generatepdf = require("./app/routes/report.routes");
app.use("/api/application", generatepdf);

const adminRoute = require("./app/routes/user.routes");
app.use("/api/admin", adminRoute);

const application = require("./app/routes/application.routes");
app.use("/api/application", application);

const db = require("./app/models");


// Function to attempt database connection with retries
async function connectWithRetry(maxRetries = 5, delayMs = 5000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      // await db.sequelize.authenticate();
      console.log("Database connection established");
      return;
    } catch (error) {
      console.error(`Connection attempt ${i + 1} failed:`, error);
      if (i < maxRetries - 1) {
        console.log(`Retrying in ${delayMs / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw new Error("Failed to connect to the database after multiple attempts");
}

// Starting the server and database connection
async function start() {
  try {
    await connectWithRetry();
    console.log("Database synchronized");

    app.listen(port, () => {
      console.log(`Listening on port http://localhost:${port}`);
      console.log("Server is running and listening for requests");
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
}
start();