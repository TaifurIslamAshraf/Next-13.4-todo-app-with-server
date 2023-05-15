import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Mongodb is connected");
    })
    .catch((e) => {
      console.log(e.message);
    });
};
