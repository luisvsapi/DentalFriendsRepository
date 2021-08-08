module.exports = {
  HOST: "67.205.165.999",
  USER: "admin",
  PASSWORD: "friends",
  DB: "friends",
  dialect: "postgres",
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    useUTC: true,
  },
  timezone: "-05:00",
  logging: false,
};
