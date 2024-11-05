import express from "express";
const app = express();

app.use((req, res) => {
  res.send("...running express server");
});

export default app;
