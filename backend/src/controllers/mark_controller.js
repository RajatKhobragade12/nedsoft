const client = require("../config/db");

async function addMark(req, res) {
    const { studentId, subject, score } = req.body;

    try {
        const result = await client.query(
            'INSERT INTO marks (student_id, subject, score) VALUES ($1, $2, $3) RETURNING *',
            [studentId, subject, score]
        );
        res.status(201).json({ message: 'Mark added successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding mark', err });
    }
}


module.exports = { addMark }