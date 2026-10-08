import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL;

const sequelize = connectionString
  ? new Sequelize(connectionString, {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false,
        dialectOptions: {
          ssl:
            process.env.DB_HOST && process.env.DB_HOST.includes("neon")
              ? {
                  require: true,
                  rejectUnauthorized: false,
                }
              : false,
        },
      },
    );

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL!");
    await sequelize.sync({
      alter: process.env.NODE_ENV === "development",
    });
    console.log("Tables Synchronized!");
  } catch (error) {
    console.error("Connection failed", error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
