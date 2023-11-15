import mongoose, { Schema } from "mongoose";

type PageDocument = {
  name: string;
  featured?: string;
  info: {
    text: string;
    uri: string;
    display: boolean;
  } | null;
};

const pageSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    featured: { type: Schema.Types.ObjectId, ref: "Painting" },
    info: {
      text: {
        type: String,
      },
      uri: {
        type: String,
      },
      display: { type: Boolean, default: false },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Page = mongoose.model<PageDocument>("Page", pageSchema);

export { Page, PageDocument };
