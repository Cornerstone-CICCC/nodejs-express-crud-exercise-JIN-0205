import { Router, Request, Response } from "express";

const pageRouter = Router();

pageRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to our products site");
});

export default pageRouter;
