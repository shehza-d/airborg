// import type { ObjectId } from "mongodb";

export interface ILink {
  // _id?: ObjectId;
  createdOn: Date;
  content: string;
  classId: string;
  ipAddress?: string; // will not be optional // remove
}
