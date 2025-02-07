const client = require("../config/db");

async function tables() {
    const studentTable =
        `CREATE TABLE IF NOT EXISTS student(
    id UUID default gen_random_uuid() primary key,
    name varchar(100),
    email varchar(200) unique not null,
    age integer not null
    )`;


    const marksTable = `
    CREATE TABLE IF NOT EXISTS marks (
    id UUID default gen_random_uuid() primary key,
    student_id uuid References student(id) on delete cascade,
    subject varchar(100) not null,
    score integer not null
    )`;
  try {
      await client.query(studentTable);
      await client.query(marksTable)
    
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

module.exports = tables;