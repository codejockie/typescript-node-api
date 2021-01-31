import * as http from "http";
import * as bodyparser from "body-parser";
import * as cors from "cors";
import debug from "debug";
import * as express from "express";
import * as expressWinston from "express-winston";
import * as winston from "winston";

import { CommonRoutesConfig } from "@/common/common.routes.config";
import { UserRoutes } from "@/users/user.routes.config";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: Number = +(process.env.PORT ?? 3000);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

app.use(bodyparser.json());
app.use(cors());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

routes.push(new UserRoutes(app));

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server up and running!`);
});

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
