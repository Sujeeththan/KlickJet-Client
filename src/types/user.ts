export type UserItem = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "cashier";
  createdAt: Date;
  updatedAt: Date;
};