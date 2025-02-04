require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 2003;
const WS_TARGET = process.env.WS_TARGET;

app.use(cors());

// Proxy WebSocket
app.use(
	"/ws",
	createProxyMiddleware({
		target: WS_TARGET,
		ws: true,
		changeOrigin: true,
		logLevel: "debug",
	}),
);

app.get("/", (req, res) => {
	res.send("WebSocket Proxy is running!");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
