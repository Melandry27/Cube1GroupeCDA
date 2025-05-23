export interface CreatedBy {
  _id: string;
  name: string;
  email: string;
  adress?: string;
  phone?: string;
  roleId?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Ressource {
  _id: string;
  title: string;
  createdBy?: CreatedBy;
  content: string;
  categoryId: string;
  views?: number;
  status?: string;
  type?: string;
  createdAt?: string;
  image?: string;
}

export interface Category {
  _id: string;
  name: string;
}
