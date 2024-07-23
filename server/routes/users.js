import { Router } from "express";
import { createUser } from "../controllers/users.js";
import multer from "multer";

const upload = multer({
  dest: "./uploads",
});

const router = Router();

router.post("/upload-profile", upload.single("profile"), (req, res, next) => {
  res.send({
    success: true,
    originalName : req.file.originalname,
    url : `http://localhost:${process.env.PORT}/images/${req.file.filename}`
  });
});

router.post("/create", async (req, res, next) => {
  try {
    let user = await createUser(req.body);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

router.delete("/", (req, res, next) => {});

export default router;
