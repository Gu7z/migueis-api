import path from "path";
import fs from "fs";

const deleteImages = (images: string[]) => {
  try {
    images.map((imagePath) => {
      fs.unlink(
        path.join(__dirname, "..", "..", "uploads", imagePath),
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
    });
  } catch (error) {
    console.log("Could not delete image");
    console.log(error);
  }
};

export default deleteImages;
