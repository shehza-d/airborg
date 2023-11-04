import express from "express";
import {
  getLinksByClassId,
  addLink,
  updateLink,
  deleteLinkById,
  deleteAllLinksByClassId,
} from "../controllers/links.js";

const router = express.Router();

router.get("/links/:classId", getLinksByClassId);
router.post("/link/:classId", addLink);

router.patch("/link/:id", updateLink); // not now
router.delete("/link/:id", deleteLinkById); // not now
router.delete("/links/:classId", deleteAllLinksByClassId);

export { router as linksRouter };
