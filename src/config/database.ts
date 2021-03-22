const dbConfig = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "admin",
  database: "casacompartilhada",
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};

export default dbConfig;
