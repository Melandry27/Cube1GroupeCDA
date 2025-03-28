import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roleId: string;
  adress: string;
  phone: string;
  validateEmail: boolean;
  validatePassword: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roleId: { type: String, required: true },
    adress: { type: String, required: true },
    phone: { type: String, required: true },
    validateEmail: { type: Boolean, default: false },
    validatePassword: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
