import mongoose, { Schema } from "mongoose";

type PaintingDocument = {
  name: {
    slug?: string;
    title: string;
  };
  artist: string;
  tags: string[];
  dimension: {
    width: number;
    height: number;
  };
  metadata: {
    price?: number;
    qty?: number;
    soldout?: boolean;
    year: number;
    featured?: boolean;
  };
  file: {
    name: string;
    extension: string;
    path: string;
  };
  description: string;
  content?: string;
};

const paintingSchema = new Schema(
  {
    name: {
      slug: { type: String },
      title: { type: String, required: true },
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    dimension: {
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    metadata: {
      price: {
        type: Number,
        default: 0,
      },
      qty: {
        type: Number,
        default: 1,
      },
      soldout: {
        type: Boolean,
        default: false,
      },
      year: {
        type: Number,
        required: true,
      },
      featured: {
        type: Boolean,
        default: false,
      },
    },
    file: {
      name: {
        type: String,
        required: true,
      },
      extension: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        default: "/public/art/",
      },
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
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

const Painting = mongoose.model<PaintingDocument>("Painting", paintingSchema);

export { Painting, PaintingDocument };
