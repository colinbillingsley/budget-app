import pool from "../config/db.js";

// Get all users
export const getAllUsers = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM users");
		res.json(result.rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
