const express = require('express');
const cors = require('cors')
const router = require("./routes/routes")
const tables = require("../src/models/student_model")
const app = express();
app.use(express.json());
app.use(cors())
app.use("/",router)
tables()
app.listen(8000,()=>{
console.log('server is running on port 8000')
})