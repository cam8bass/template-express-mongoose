import mongoose from "mongoose";
import { nodeEnv } from "../types/types";

async function connectToDB(): Promise<void> {
  try {
    const DATABASE = process.env.DATABASE;
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

    const databaseUri = DATABASE?.replace("<password>", DATABASE_PASSWORD!);

    await mongoose.connect(databaseUri);
    console.log("✅ Database connected");
  } catch (error) {
    const nodeEnv = process.env.NODE_ENV as nodeEnv;

    if (nodeEnv === "development") {
      console.error("💥 Database connection error:", error);
    } else if (nodeEnv === "production") {
      console.error("💥 Database connection error:", error.name, error.message);
    }
    process.exit(1);
  }
}

export default connectToDB;
