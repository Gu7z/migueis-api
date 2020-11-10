import { ErrorRequestHandler, response } from "express";
import { ValidationError } from "yup";
import path from "path";
import fs from "fs";

interface ValidationErrors {
  [key: string]: string[];
}

const deleteLastFile = () => {
  const files = fs.readdirSync(path.join(__dirname, "..", "..", "uploads", ""));

  // Remove Readme from list
  files.pop();

  fs.unlink(
    path.join(__dirname, "..", "..", "uploads", files[files.length - 1]),
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  deleteLastFile();

  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });

    return res.status(400).json({ message: "Validation fails", errors });
  }

  console.error(error);

  return res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
