require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 2003;
const WS_TARGET = process.env.WS_TARGET;
const API_TARGET = process.env.API_TARGET;

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

// Proxy API requests
app.use(
	"/",
	createProxyMiddleware({
		target: API_TARGET,
		changeOrigin: true,
		logLevel: "debug",
		pathRewrite: { "^/api": "" },
	}),
);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
