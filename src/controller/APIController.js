import pool from "../configs/connectDB";
import {getAll, _delete, find, add as abc, update} from "../services/UserService"
import multer from 'multer';
import {getAll as getAllUser} from "../services/UserService";

let allUser = async (req, res) => {
    let users = await getAllUser();
    return res.status(200).json({
        message: 'ok',
        data: users
    })
}


module.exports = {
    allUser
}