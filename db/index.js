const Pool = require("pg-pool");
const pool = new Pool({
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 20, // set pool max size to 20
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
  maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
});
// this is the right way to export the query method
module.exports.query = (text, values) => {
  console.log("query:", text, values);
  return pool.query(text, values);
};
