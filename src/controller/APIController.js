import {getAll as getAllUser, find as findUser} from "../services/UserService";

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


module.exports = {
    allUser,
    findUserAPI
}