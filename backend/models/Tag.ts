import mongoose, { Schema } from "mongoose";

type TagDocument = {
  name: string;
};

const tagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
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

const Tag = mongoose.model<TagDocument>("Tag", tagSchema);

export { Tag, TagDocument };
