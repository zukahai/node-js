import pool from "../configs/connectDB";
import multer from 'multer';

let getHomePage = async (req, res) => {
    let message =  req.session.secret ? req.session.secret.message : null;
    delete req.session.secret;
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('admin/user/index.ejs', { req: req, dataUser: rows, message: message })
}

let Delete = async (req, res) => {
    let id = req.params.id;
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return res.redirect('/admin/user');
}

let detail = async (req, res) => {
    let id = req.params.id;
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    res.send(rows);
}

let showCreatePage = async (req, res) => {
    return res.render('admin/user/create.ejs')
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
    return res.redirect('/admin/user');
}

let showEditPage = async (req, res) => {
    let id = req.params.id;
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return res.render('admin/user/edit.ejs', {user: rows[0]})
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
    return res.redirect('/admin/user');
}

let showUploadPage = async (req, res) => {
    return res.render('admin/user/upload.ejs')
}

let upload = async (req, res) => {
    if (req.fileValidationError)
        return res.send(req.fileValidationError);
    if (!req.file)
        return res.send('Please select an image to upload');
    res.send(`You have uploaded this image: <hr/><img src="/images/uploads/${req.file.filename}" width="500"><hr /><a href="/admin/user/upload">Upload another image</a>`);
}

module.exports = {
    getHomePage,
    Delete,
    detail,
    showCreatePage, create,
    showEditPage, edit,
    showUploadPage, upload
}