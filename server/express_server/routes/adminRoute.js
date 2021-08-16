const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroSequelize = require("@admin-bro/sequelize");

const User = require("../models/user");
const UserDetails = require("../models/userDetails");
const appointment = require("../models/appointment");
const pacient = require("../models/pacient");

AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
  resources: [User, UserDetails, appointment, pacient],
  rootPath: "/admin",
});

const ADMIN = {
  email: process.env.ADMIN_Email || 'rogwinalex2@hotmail.com',
  password: process.env.ADMIN_PASSWORD || 'password-admin',
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'password-admin-xd',
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password){
      return ADMIN;
    }
    return null;
  }
});

module.exports = router;
