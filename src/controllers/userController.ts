import { Request, Response } from "express";
import User from "../models/user";
import hashPassword from "../utils/crypt";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import atob from "atob";
import bcrypt from "bcryptjs";
import userView from "../views/userView";

export default {
  async auth(req: Request, res: Response) {
    if (req.headers.authorization) {
      const authToken = req.headers.authorization.replace("Basic ", "");
      const [email, hashedPassword] = atob(authToken).split(":");

      const userRepository = getRepository(User);

      const user = await userRepository.findOne({ where: { email } });
      if (user) {
        const canAuth = await bcrypt.compare(
          hashedPassword,
          user.storedPassword
        );

        if (canAuth) {
          return res.status(200).json(userView.render(user));
        } else {
          return res.status(400).send();
        }
      } else {
        return res.status(400).send();
      }
    }
    return res.status(400).send();
  },

  async create(req: Request, res: Response) {
    if (req.headers.authorization) {
      const { name, encryptedPrivateKey, publicKey } = req.body;
      const authToken = req.headers.authorization.replace("Basic ", "");
      const [email, password] = atob(authToken).split(":");

      const dataToValidate = {
        name,
        email,
        storedPassword: password,
        encryptedPrivateKey,
        publicKey,
        isAdmin: 0,
      };

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        storedPassword: Yup.string().required(),
        encryptedPrivateKey: Yup.string().required(),
        publicKey: Yup.string().required(),
      });

      await schema.validate(dataToValidate, {
        abortEarly: false,
      });

      const hashedPassword = await hashPassword(password);
      const userRepository = getRepository(User);

      const data = {
        ...dataToValidate,
        storedPassword: hashedPassword,
      };

      const user = userRepository.create(data);

      await userRepository.save(user);

      return res.status(200).json(userView.render(user));
    } else {
      return res.status(400).send();
    }
  },

  async registerAdmin(req: Request, res: Response) {
    if (req.headers.authorization) {
      const { name, encryptedPrivateKey, publicKey } = req.body;
      const authToken = req.headers.authorization.replace("Basic ", "");
      const [email, password] = atob(authToken).split(":");

      const dataToValidate = {
        name,
        email,
        storedPassword: password,
        encryptedPrivateKey,
        publicKey,
        isAdmin: 1,
      };

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        storedPassword: Yup.string().required(),
        encryptedPrivateKey: Yup.string().required(),
        publicKey: Yup.string().required(),
      });

      await schema.validate(dataToValidate, {
        abortEarly: false,
      });

      const hashedPassword = await hashPassword(password);
      const userRepository = getRepository(User);

      const data = {
        ...dataToValidate,
        storedPassword: hashedPassword,
      };

      const user = userRepository.create(data);

      await userRepository.save(user);

      return res.status(200).json(userView.render(user));
    } else {
      return res.status(400).send();
    }
  },
};
