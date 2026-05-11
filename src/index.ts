import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import "dotenv/config";

import express from "express";
import databaseService from "@/services/database.service";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Threads API");
});

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
