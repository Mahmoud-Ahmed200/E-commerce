const express = require("express");
const PORT = 3000;
const app = express();
const authRouter = require("./src/routes/auth.router");
app.use(express.json());
const { connect } = require("./src/config/db");
app.listen(PORT, () => {
  connect();
  console.log(`Server listening on port ${PORT}`);
});
app.use("/auth", authRouter);
app.get("/", async (req, res) => {});
