import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
    return res.render('user/index.ejs')
}

module.exports = {
    getHomePage
}