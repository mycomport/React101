//import express from "express";
import express, { json } from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

console.log(process.env.MONO_URL);

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
	//console.log("Server started at http://localhost:5000 Hello");
});
