const express = require("express");
const helper = require("./crawlerHelper.js");
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`CS497 Project app listening at http://localhost:${port}`);
});

// Provides list of products by gender and metrics
app.get("/products/:category", async (req, res) => {
  res.send(await helper.getProductsAndMetrics(req.params.category));
});

// Provides list of product categories
app.post("/subcategories/:category?", (req, res) => {
  res.send(["disposable"]);
});
