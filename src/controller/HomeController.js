import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index.ejs', { req: req, dataUser: rows })
}

let Delete = (req, res) => {
    res.write('delete');
    res.end();
}

module.exports = {
    getHomePage,
    Delete
}