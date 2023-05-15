/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI:
      "mongodb+srv://Taifur:Taifur123@cluster0.hhn8y4e.mongodb.net/next-todo",
    JWT_SECRET: "adsflgjhdfkgdkljg",
    baseUrl: "http://localhost:3000",
  },
};

module.exports = nextConfig;
