module.exports=
{
  db:{
    host: "localhost",
    port: process.env.MYSQL_DATABASE_PORT,
    user: process.env.MYSQL_DATABASE_ROOT,
    password: process.env.MYSQL_DATABASE_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
    dialect: process.env.MYSQL_DATABASE_DIALECT
  },
  cookie:{
    secret: process.env.COOKIE_SECRET
  },
  node:{
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET
  }
}
