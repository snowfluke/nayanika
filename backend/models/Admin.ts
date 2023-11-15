import bcrypt from "bcrypt";
import mongoose, { Schema, Document } from "mongoose";
import { generatePassword } from "../utils";
import { ADMIN_ROLE } from "../utils/constant";
import { adminRoles } from "../utils/types";

interface MergedAdminDocument extends AdminDocument, Document {}

type AdminDocument = {
  email: string;
  password: string;
  name: string;
  role: adminRoles;
  refreshToken?: string[];
  lastlogin?: Date;
};
const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    refreshToken: [{ type: String }],
    lastlogin: { type: Date },
    role: {
      type: String,
      enum: ADMIN_ROLE,
      default: ADMIN_ROLE[ADMIN_ROLE.length - 1],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret._id;
        delete ret.refreshToken;
      },
    },
    timestamps: true,
  }
);

adminSchema.pre<MergedAdminDocument>("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await generatePassword(this.password);
      next();
    } catch (err: any) {
      next(err);
    }
  } else {
    next();
  }
});

adminSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model<AdminDocument>("Admin", adminSchema);

export { Admin, AdminDocument };
