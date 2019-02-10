module.exports=
{
  cookie:{
    secret: process.env.COOKIE_SECRET
  },
  node:{
    port: process.env.PORT,
    client_secret: process.env.CLIENT_SECRET
  }
}