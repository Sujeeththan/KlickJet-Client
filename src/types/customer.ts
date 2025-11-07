export type CustomerItem = {
  _id: string;
  name: string;
  email?: string;
  phone_no: string;
  address?: string | null;
  isActive: boolean;
  deletedAt: Date | null;
  createdBy?: string | null; 
  updatedBy?: string | null; 
  createdAt: Date;
};