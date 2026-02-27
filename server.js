const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/signal", async (req, res) => {
  try {
    // Obtener precio actual de BTC desde Binance
    const response = await axios.get(
     "https://api.binance.us/api/v3/ticker/price?symbol=BTCUSDT"
    );

    const price = parseFloat(response.data.price);

    // Lógica simple de ejemplo
    const signal = {
      market: "BTCUSDT",
      signal: "BUY",
      entry: price,
      sl: price * 0.98,
      tp: price * 1.03,
    };

    res.json(signal);

  } catch (error) {
    console.log("ERROR REAL:", error.message);
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