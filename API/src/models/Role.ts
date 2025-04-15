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
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, enum: Object.values(RoleName), required: true },
  },
  {
    timestamps: true,
  }
);

export { IRole, RoleName };

export default mongoose.model<IRole>("Role", RoleSchema);
