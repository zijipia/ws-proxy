require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const http = require("http");

const PORT = process.env.PORT || 2003;
const WS_TARGET = process.env.WS_TARGET;
const API_TARGET = process.env.API_TARGET;

const app = express();
const server = http.createServer(app);

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST"],
		credentials: true,
	}),
);
// Proxy API requests
app.use(
	"/",
	createProxyMiddleware({
		target: API_TARGET,
		changeOrigin: true,
		logLevel: "debug",
	}),
);
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// Proxy WebSocket
// app.use(
// 	"/ws",
// 	createProxyMiddleware({
// 		target: WS_TARGET,
// 		ws: true,
// 		changeOrigin: true,
// 		logLevel: "debug",
// 	}),
// );
const WebSockets = require("ws");
const wss = new WebSockets.Server({ server });
wss.on("connection", (ws) => {
	const wsc = new WebSocket(WS_TARGET);
	wsc.onopen = () => {
		console.log("WebSocket connected");
	};

	wsc.onmessage = (event) => {
		ws.send(event);
	};

	wsc.onclose = () => {
		console.log("WebSocket disconnected");
	};

	wsc.onerror = (error) => {
		console.error("WebSocket error:", error);
	};

	ws.on("message", async (message) => {
		wsc.send(message);
	});

	ws.on("close", () => {
		console.log("[WebSocket] Client disconnected.");
	});
});
