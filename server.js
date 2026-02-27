const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/signal", async (req, res) => {
  try {
    const symbol = req.query.symbol || "BTCUSDT";

    const response = await axios.get(
      `https://api.binance.us/api/v3/ticker/price?symbol=${symbol}`
    );

    const price = parseFloat(response.data.price);

    const signal = {
      market: symbol,
      signal: "BUY",
      entry: price,
      sl: price * 0.98,
      tp: price * 1.03,
    };

    res.json(signal);

  } catch (error) {
    res.json({
      error: "Error obteniendo datos",
      detalle: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("API running on port " + PORT);
});