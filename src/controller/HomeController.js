import pool from "../configs/connectDB";
import multer from 'multer';

let getHomePage = async (req, res) => {
    let message =  req.session.secret ? req.session.secret.message : null;
    delete req.session.secret;
    console.log(req.session);
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index.ejs', { req: req, dataUser: rows, message: message })
}

let Delete = async (req, res) => {
    let id = req.params.id;
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return res.redirect('/');
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
    // console.log(req.body);
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('INSERT INTO users(firstName, lastName, email, address) VALUES(?, ?, ?, ?)',
        [firstName, lastName, email, address]);
    req.session.secret = {
        message: {
            type: 'success',
            text: 'Thêm thành công người dùng ' + lastName + ' ' + firstName
        }
    }
    return res.redirect('/');
}

let showEditPage = async (req, res) => {
    let id = req.params.id;
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return res.render('edit.ejs', {user: rows[0]})
}

let edit = async (req, res) => {
    let id = req.params.id;
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('UPDATE `users` SET firstName=?,lastName=?,email=?,address=? WHERE id=?',
        [firstName, lastName, email, address, id]);
    req.session.secret = {
        message: {
            type: 'success',
            text: 'Cập nhật thành công người dùng ' + lastName + ' ' + firstName
        }
    }
    return res.redirect('/');
}

let showUploadPage = async (req, res) => {
    return res.render('upload.ejs')
}

let upload = async (req, res) => {
    return res.send("Hello");
}

module.exports = {
    getHomePage,
    Delete,
    detail,
    showCreatePage, create,
    showEditPage, edit,
    showUploadPage, upload
}