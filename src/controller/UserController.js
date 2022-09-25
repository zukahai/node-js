import pool from "../configs/connectDB";
import {getAll, _delete, find, add as abc, update, search} from "../services/UserService"
import multer from 'multer';

let getHomePage = async (req, res) => {
    let message =  req.session.secret ? req.session.secret.message : null;
    delete req.session.secret;
    let users = (req.query.keyword == null) ? await getAll() : await search(req.query.keyword)
    return res.render('admin/user/index.ejs', { dataUser: users, message: message, keyword: req.query.keyword })
}

let Delete = async (req, res) => {
    let id = req.params.id;
    await _delete(id);
    return res.redirect('/admin/user');
}

let detail = async (req, res) => {
    let id = req.params.id;
    let user = await find(id);
    res.send(user);
}

let showCreatePage = async (req, res) => {
    return res.render('admin/user/create.ejs')
}

let create = async (req, res) => {
    console.log(req);
    let { firstName, lastName, email, address } = req.body;
    await abc([firstName, lastName, email, address]);
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
    let user = await find(id);
    return res.render('admin/user/edit.ejs', {user: user})
}

let edit = async (req, res) => {
    let id = req.params.id;
    let { firstName, lastName, email, address } = req.body;
    await update([firstName, lastName, email, address, id]);
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