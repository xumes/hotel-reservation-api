import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { router } from "./main/routes";
import swaggerDocs from "./docs/swagger.json";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(router);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
