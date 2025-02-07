const client = require('../config/db');


async function createStudent(req, res) {
    try {
        const { name, email, age } = req.body;        
        if (!name || !email || !age) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingStudent = await client.query('SELECT * FROM student WHERE email = $1', [email]);

        if (existingStudent.rows.length > 0) {
            return res.status(400).json({ message: "A student with this email already exists" });
        }
        const result = await client.query(
            'insert into student (name,email,age) values($1,$2,$3)', [name, email, age]
        )
        res.status(201).send({ message: 'Student created successfully', data: result.rows[0] })
    } catch (error) {
        console.log(error);
        
        res.status(500).send({ message: 'Internal server error : Error', error })

    }
}

async function getAllStudents(req, res) {
    try {
        const { page=1, limit=10 } = req.query;
        const offset = (page - 1) * limit
        const result = await client.query(
            `select * from student limit $1 offset $2`,
            [limit, offset]
        );
        const total = await client.query('select count (*) from student')
        res.status(200).send({
            message: 'Student fetched successfully', data: result.rows, total: total.rows[0].count,
            page,
            limit
        })
    } catch (error) {
        res.status(500).send({ message: 'Internal server error : Error', error })

    }


}

async function getStudentById(req, res) {
 try {
     const { id } = req.params;
    const result = await client.query(
        `SELECT student.id, student.name, student.email, student.age, marks.subject, marks.score 
         FROM student
         LEFT JOIN marks ON student.id = marks.student_id
         WHERE student.id = $1`,
        [id]
    );

    if (result.rows.length === 0) return res.status(404).json({ message: "Student not found" });
    return res.status(200).json({ message: "Student fetched successfully", data: result.rows[0] });

 } catch (error) {
    console.log(error);
    
    res.status(500).send({ message: 'Internal server error : Error', error })

 }


}

async function updateStudent(req, res) {
    try {
        const { id } = req.params;        
        const { name, email, age } = req.body;
        const result = await client.query(
            `update student set name=$1,email=$2,age=$3 where id=$4`,
            [name, email, age, id]
        )
        const updatedStudent = await client.query(
            `SELECT * FROM student WHERE id = $1`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ message: "Student updated successfully", data: updatedStudent.rows[0] });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error : Error', error })

    }

}

async function deleteStudent(req, res) {
    try {
        const { id } = req.params;
        const result = client.query(`delete from student where id=$1`, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error : Error', error:error })

    }
}



module.exports = {
    createStudent, updateStudent, getAllStudents, getStudentById,deleteStudent
}