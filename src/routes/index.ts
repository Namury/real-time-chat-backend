import { response_not_found } from "$utils/response.utils";
import { Express, Request, Response } from "express";
import chatRoutes from "./chatRoutes";
import userRoutes from "./userRoutes";

export default function routes(app: Express) {
  app.use("/chat", chatRoutes);
  app.use("/user", userRoutes);
  app.all("*", (req: Request, res: Response) => {
    return response_not_found(res);
  });
}
