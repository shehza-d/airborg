import express from "express";
import cors from "cors";

const router = express.Router();

//middleware configuration

router.use(express.json());

// router.use(tokenVerification)

router.use(
  cors({
    origin: ["http://localhost:3000", "https://airborg.web.app", "*"],
    credentials: true,
  })
);

export { router as middlewareRouter };
