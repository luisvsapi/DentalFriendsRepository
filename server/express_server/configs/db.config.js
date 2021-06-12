module.exports = {
  HOST: "67.205.165.126",
  USER: "admin",
  PASSWORD: "dentalfriends",
  DB: "dentalfriends",
  dialect: "postgres",
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  "dialectOptions": {
    "useUTC": true
  },
  "timezone": "-05:00"

};
