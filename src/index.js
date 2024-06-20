const express = require("express");

const moviesRouter = require("./routers/movies");
const { errorHandler } = require("./utils/errors");

const app = express();

// Middleware for logging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - ${new Date()}`);
  next();
});
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server running 🚀🚀🚀");
});

// Use the movies router
app.use("/api/movies", moviesRouter);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
