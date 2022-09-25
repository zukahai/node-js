import pool from "../configs/connectDB";
import {getAll, _delete, find, add as abc, update} from "../services/UserService"
import {getAll as all_role, _delete as delete_role, add as add_role} from "../services/RoleService"

let getHomePage = async (req, res) => {
    let message =  req.session.secret ? req.session.secret.message : null;
    delete req.session.secret;
    let roles = await all_role();
    return res.render('admin/role/index.ejs', { roles: roles, message: message })
}

let Delete = async (req, res) => {
    let id = req.params.id;
    await delete_role(id);
    return res.redirect('/admin/role');
}

let detail = async (req, res) => {
    let id = req.params.id;
    let user = await find(id);
    res.send(user);
}

let showCreatePage = async (req, res) => {
    return res.render('admin/role/create.ejs')
}

let create = async (req, res) => {
    console.log(req.body);

    let { role_name, description, color } = req.body;
    await add_role([role_name, description, color]);
    req.session.secret = {
        message: {
            type: 'success',
            text: 'Thêm thành công quyền ' + role_name
        }
    }
    return res.redirect('/admin/role');
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