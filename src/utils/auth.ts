import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { getRepository } from "typeorm";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers["x-user-email"]) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { email: req.headers["x-user-email"] },
    });
    const authToken = req.headers.authorization.replace("Bearer ", "");

    if (user) {
      try {
        jwt.verify(authToken, user.publicKey, {
          algorithms: ["RS256"],
        });

        req.session.user = user;

        next();
        return;
      } catch {
        return res.status(401).send({ message: "Unauthorized" });
      }
    }
  }

  return res.status(401).send({ message: "Unauthorized" });
};

export default auth;
