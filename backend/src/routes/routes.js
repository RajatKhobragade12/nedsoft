const express = require('express');
const {createStudent,getAllStudents,getStudentById, updateStudent,deleteStudent} = require("../controllers/students_controller");
const {addMark} = require("../controllers/mark_controller");
const routes = express.Router();


routes.post('/student',createStudent)
routes.get('/students',getAllStudents)
routes.get('/student/:id',getStudentById)
routes.put('/student/:id',updateStudent)
routes.delete('/student/:id',deleteStudent)

routes.post('/mark',addMark)


module.exports = routes