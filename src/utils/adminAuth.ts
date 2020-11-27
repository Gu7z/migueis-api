import { Request, Response, NextFunction } from "express";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user && req.session.user.isAdmin) {
    next();
    return;
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

export default adminAuth;
