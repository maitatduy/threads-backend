import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import "dotenv/config";

import express from "express";
import databaseService from "@/services/database.service";
import authRouter from "@/routes/auth.route";
import cors, { type CorsOptions } from "cors";

const app = express();

const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const allowedOrigins = new Set([CLIENT_URL, "http://localhost:5173", "http://127.0.0.1:5173"]);

const corsOptions: CorsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRouter);

async function startServer() {
    try {
        await databaseService.connect();

        console.log("Đã kết nối database thành công!");

        app.listen(PORT, () => {
            console.log(`Server đang chạy ở cổng ${PORT}`);
        });
    } catch (error) {
        console.log("Kết nối database thất bại!");
        console.log(error);
    }
}

startServer();
