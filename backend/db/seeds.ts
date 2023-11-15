import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { Admin, AdminDocument } from "../models/Admin";
import { generatePassword } from "../utils";
import { Tag, TagDocument } from "../models/Tag";
import { Painting, PaintingDocument } from "../models/Painting";
import { Artist, ArtistDocument } from "../models/Artist";
import { Page, PageDocument } from "../models/Page";
const seedAdmin: AdminDocument[] = [
  {
    email: "superadmin@example.com",
    name: "Superadmin",
    role: "superadmin",
    password: "GaleNaya123",
    refreshToken: [],
  },
  {
    email: "updater@example.com",
    name: "Tukang Update",
    role: "updater",
    password: "UpdaterNaya123",
    refreshToken: [],
  },
  {
    email: "uploader@example.com",
    name: "Tukang Upload",
    role: "uploader",
    password: "UploaderNika123",
    refreshToken: [],
  },
  {
    email: "curator@example.com",
    name: "Tukang Kurasi",
    role: "curator",
    password: "CuraNayanikaTor123",
    refreshToken: [],
  },
];
const seedTag: TagDocument = { name: "eggshell" };
const seedPainting: PaintingDocument = {
  artist: "teguh-dwiyono",
  name: {
    title: "Alijoy Coffee",
    slug: "alijoy-coffee-a213sac3",
  },
  dimension: {
    width: 450,
    height: 450,
  },
  tags: ["eggshell"],
  metadata: {
    year: 2023,
  },
  file: {
    name: "alijoy-coffee-a213sac3",
    extension: "jpg",
    path: "/public/art/",
  },
  description:
    "Departing from the spirit and dedication of a farmer originating from Kerinci - Jambi, Sumatra, who later wandered across the island of Java until the end of his life, the noble values of Ali Joy were born, built, and continue to be developed until today.",
};
const seedArtist: ArtistDocument = {
  name: "Teguh Dwiyono",
  slug: "teguh-dwiyono",
  bio: "Artist's short bio",
};
const seedPage: PageDocument = {
  name: "home",
  featured: "alijoy-coffee-a213sac3",
  info: {
    text: "Hello, welcome",
    uri: "https://github.com",
    display: false,
  },
};

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");

    // ADMINS
    const hashedSeedAdmin = await Promise.all(
      seedAdmin.map(async (data) => {
        data.password = await generatePassword(data.password);
        return data;
      })
    );
    await Admin.insertMany(hashedSeedAdmin);

    // TAGS
    const tags = (await Tag.create(seedTag)).toJSON();

    // ARTIST
    const artist = (await Artist.create(seedArtist)).toJSON();

    // PAINTINGS
    const painting = (
      await Painting.create({
        ...seedPainting,
        artist: artist._id,
        tags: [tags._id],
      })
    ).toJSON();

    // PAGES
    await Page.create({
      ...seedPage,
      featured: painting._id,
    });

    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
