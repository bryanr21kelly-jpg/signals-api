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

  catch (error) {
  console.log("ERROR REAL:", error.message);
  res.json({ 
    error: "Error obteniendo datos",
    detalle: error.message
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});