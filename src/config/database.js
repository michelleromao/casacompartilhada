const dbConfig = {
  dialect: "postgres",
  host: process.env.HOST || "localhost",
  username: process.env.USER || "postgres",
  password: process.env.PASSWORD || "admin",
  database: process.env.DATABASE || "casacompartilhada",
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
  //ssl: process.env.NODE_ENV==="production" ? true : false,
};

module.exports = dbConfig;
