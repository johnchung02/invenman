import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/item", routes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});