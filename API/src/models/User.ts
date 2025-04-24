import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roleId: string;
  adress: string;
  phone: string;
  isVerified: boolean;
  validateEmail: boolean;
  validatePassword: boolean;
}

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  roleId: string;
  adress: string;
  phone: string;
  isVerified: boolean;
};

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roleId: { type: String, required: true },
    adress: { type: String, required: true },
    phone: { type: String, required: true },
    validateEmail: { type: Boolean, default: false, required: false },
    validatePassword: { type: Boolean, default: false, required: false },
    isVerified: { type: Boolean, default: false, required: false },
  },
  {
    timestamps: true,
  }
);

export { IUser };

export default mongoose.model<IUser>("User", UserSchema);
