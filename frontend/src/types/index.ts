export interface ILink {
  _id: string;
  createdOn: Date;
  content: string;
  classId: string;
  ipAddress?: string; // will not be optional // remove
}
