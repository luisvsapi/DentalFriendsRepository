module.exports = {
  treatments: [
    { descr: "Limpieza Dental" },
    { descr: "Blanqueamiento de Dientes" },
    { descr: "Calces Dentales" },
    { descr: "Checkeo Rutinario" },
  ],
  states: {
    0: "Approved",
    1: "Pending",
    2: "Completed",
    3: "Cancelled",
  },
  MAX_AGE_COOKIE: 1000 * 60 * 100,
  mailCredentials: [
    {
      mail: "dentalfriends.ec@gmail.com",
      clientId:
        "987967593710-bu9f8qd71vnmhr9t1pmhq9jsrq4hrr97.apps.googleusercontent.com",
      clientSecret: "qSWjtAMz8sFr61wEciUaSkTs",
      redirectURI: "https://developers.google.com/oauthplayground",
      refreshToken:
        "1//04CJQxQEBeuRYCgYIARAAGAQSNwF-L9IrPEWth_zK27Dq3dEONikria-m-PLpg5qItzeuABh5V2r0p7lYtM0dgq_Owcso3hOsfbI",
    },
    {
      mail: "info@dentalfriends.ec",
      host: "us2.smtp.mailhostbox.com",
      secure: false,
      port: 587,
      pass: "WsScavY9",
    },
  ],
};
