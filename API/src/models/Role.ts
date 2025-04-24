import mongoose, { Document, Schema } from "mongoose";

enum RoleName {
  Moderateur = "Modérateur",
  Administrateur = "Administrateur",
  SuperAdmin = "Super Admin",
  CitoyenConnecte = "Citoyen Connecté",
  CitoyenNonConnecte = "Citoyen non connecté",
}

interface IRole extends Document {
  name: RoleName;
  slug: string;
}

interface IRoleInput {
  name: RoleName;
  slug: string;
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, enum: Object.values(RoleName), required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export { IRole, IRoleInput, RoleName };

export default mongoose.model<IRole>("Role", RoleSchema);
