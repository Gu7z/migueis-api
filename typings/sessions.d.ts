import expressSession from "express-session";
import "express";

interface User {
  user?: {
    id: number;
    name: string;
    email: string;
    encryptedPrivateKey: string;
    publicKey: string;
    storedPassword: string;
    isAdmin: number;
  };
}

type Session = expressSession.Session &
  Partial<expressSession.SessionData> &
  User;

declare module "express" {
  interface Request extends Express.Request {
    session: Session;
  }
}
