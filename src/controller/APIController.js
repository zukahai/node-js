import {
    getAll as getAllUser,
    find as findUser,
    add as createUser,
    _delete as deleteUser,
    update as updateUser, update
} from "../services/UserService";

let allUser = async (req, res) => {
    let users = await getAllUser();
    return res.status(200).json({
        message: 'ok',
        data: users
    })
}

let findUserAPI = async (req, res) => {
    let id = req.params.id;
    let user = await findUser(id);
    return res.status(200).json({
        message: 'ok',
        data: user
    })
}

let createUserAPI = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await createUser([firstName, lastName, email, address]);
    return res.status(200).json({
        message: 'ok',
        data: req.body
    })
}

let editUserAPI = async (req, res) => {
    let id = req.params.id;
    let user = await findUser(id);
    let { firstName, lastName, email, address } = req.body;
    await updateUser([firstName, lastName, email, address, id]);
    return res.status(200).json({
        message: (user != null) ? 'ok' : 'not found user',
        data: await findUser(id),
        time_edit: new Date(),
    });
}

let deleteAPI = async (req, res) => {
    let id = req.params.id;
    let user = await findUser(id);
    await deleteUser(id);

    return res.status(200).json({
        message: (user != null) ? 'ok' : 'not found user',
        data: user,
        time_delete: new Date(),
    })
}


module.exports = {
    allUser,
    findUserAPI,
    createUserAPI,
    editUserAPI,
    deleteAPI
}