const express = require("express");
const axios = require("axios");
const app = express();

app.get("/signal", async (req, res) => {

  try {
    // Precio real BTC desde Binance
    const response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
    const price = parseFloat(response.data.price);

    const signal = price > 50000 ? "BUY" : "SELL";

    res.json({
      market: "BTCUSDT",
      signal: signal,
      entry: price,
      sl: price * 0.98,
      tp: price * 1.03
    });

  } catch (error) {
    res.status(500).json({ error: "Error obteniendo datos" });
  }

});

app.listen(3000, () => console.log("API running"));