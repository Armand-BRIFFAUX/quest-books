import express from "express";
import cors from "cors";

import router from "./routes/adventureRoutes.js";

const app = express();
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
