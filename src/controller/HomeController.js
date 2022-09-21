import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index.ejs', { req: req, dataUser: rows })
}

let Delete = (req, res) => {
    res.write('delete');
    res.end();
}

let detail = async (req, res) => {
    let id = req.params.id;
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    res.send(rows);
}

let showCreatePage = async (req, res) => {
    return res.render('create.ejs')
}

let create = async (req, res) => {
    console.log(req.body);
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('INSERT INTO users(firstName, lastName, email, address) VALUES(?, ?, ?, ?)',
        [firstName, lastName, email, address]);
    return res.redirect('/');
}

module.exports = {
    getHomePage,
    Delete,
    detail,
    showCreatePage,
    create
}