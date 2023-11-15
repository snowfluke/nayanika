import mongoose, { Schema } from "mongoose";

type ArtistDocument = {
  name: string;
  slug: string;
  bio: string;
  photo?: {
    name: string;
    extension: string;
  };
};
const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: "Artist's short bio",
    },
    photo: {
      name: {
        type: String,
      },
      extension: {
        type: String,
      },
      path: {
        type: String,
        default: "/public/photo/",
      },
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

const Artist = mongoose.model<ArtistDocument>("Artist", artistSchema);

export { Artist, ArtistDocument };
