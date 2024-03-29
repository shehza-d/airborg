import { db } from "../db/index.mjs";
import { ObjectId } from "mongodb";
import { ILink } from "../types/index.js";
import type { Request, Response } from "express";
import { isValid } from "../helpers/index.js";
import { verifyHash } from "bcrypt-inzi";

const collection = "links";
const linksCol = db.collection<ILink>(collection);

const getLinksByClassId = async (req: Request, res: Response) => {
  const { classId } = req.params;

  try {
    const data = await linksCol
      .find<ILink>({ classId })
      .sort({ _id: -1 })
      // .project({ password: 0 })
      .limit(150)
      .toArray();

    if (!data.length) {
      res.status(404).send({ message: "Links Not Found", data });
      return;
    }

    res.status(200).send({ message: "All Links fetched", data });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const addLink = async (req: Request, res: Response) => {
  const { content, ipAddress } = req.body as ILink;
  const { classId } = req.params;

  // Validation
  if (!isValid(content, 500) || !isValid(classId, 10)) {
    res.status(403).send({ message: "Required parameter missing!" });
    return;
  }

  try {
    const doc: ILink = {
      content,
      classId,
      ipAddress: ipAddress || "192.233.32.01",
      createdOn: new Date(),
    };

    const data = await linksCol.insertOne(doc);

    if (data.acknowledged)
      res.status(201).send({
        message: "New Link added!",
        id: data.insertedId.toString(),
        acknowledged: data.acknowledged,
        data: doc,
      });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const updateLink = async (req: Request, res: Response) => {
  const { content, ipAddress } = req.body as ILink;
  const { id } = req.params;

  // Validation
  if (!ObjectId.isValid(id)) {
    res.status(403).send({ message: "Incorrect Link id" });
    return;
  }

  if (!isValid(content, 500) || !id) {
    res.status(403).send({ message: "Required parameter missing!" });
    return;
  }

  let link: Partial<ILink> = {};

  content && (link.content = content);

  try {
    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: link };
    const data = await linksCol.updateOne(filter, updateDoc);

    if (!data.matchedCount) throw Error("Link Not Found!");

    res.status(201).send({ message: "Link updated" });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const deleteLinkById = async (req: Request, res: Response) => {};

const deleteAllLinksByClassId = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const { password } = req.body;

  const isCorrectPassword = await verifyHash(
    password,
    "$2b$10$.Gtr4t7cGLO6l/nVm/dOPe73ckvJ/OaMoej1Q.8kQXVkQCoJgQ7pq"
  );

  if (!isValid(classId, 10) || !isCorrectPassword) {
    res.status(403).send({ message: "Incorrect Password or Class id" });
    return;
  }

  try {
    const query = { classId };
    const result = await linksCol.deleteMany(query);

    if (!result.deletedCount)
      throw new Error("No Links found with this Class ID.");

    res.status(200).send({ message: "Successfully deleted documents." });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

export {
  getLinksByClassId,
  addLink,
  updateLink,
  deleteLinkById,
  deleteAllLinksByClassId,
};
