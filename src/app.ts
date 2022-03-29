import "./paths";
import express from "express";
import "dotenv/config";
import routes from "./routes";
import cors from "cors";

const app = express();
const PORT: number = Number(process.env.PORT) || 3010;

const allowedOrigins = [
  "http://localhost:" + String(PORT),
  "http://localhost:3000",
  "http://localhost:3001",
  "https://namury-rtctest.herokuapp.com/",
  
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(options));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  routes(app);
});
