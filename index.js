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
	const wsc = new WebSockets(WS_TARGET);

	wsc.on("open", () => {
		console.log("WebSocket connected to target server");
	});

	wsc.on("message", (event) => {
		ws.send(event);
	});

	wsc.on("close", () => {
		console.log("WebSocket connection to target server closed");
	});

	wsc.on("error", (error) => {
		console.error("WebSocket error:", error);
	});

	ws.on("message", (message) => {
		if (wsc.readyState === WebSockets.OPEN) {
			wsc.send(message);
		} else {
			console.warn("WebSocket is not open, message not sent.");
		}
	});

	ws.on("close", () => {
		console.log("[WebSocket] Client disconnected.");
		wsc.close();
	});
});
