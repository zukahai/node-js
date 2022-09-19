import connection from "../configs/connectDB";

let getHomePage = (req, res) => {
    // req.toastr.success('Successfully logged in.', "You're in!");
    let data = [];
    connection.query(
        'SELECT * FROM `users` ',
        function (err, results, fields) {
            results.map((row) => {
                data.push({
                    id: row.id,
                    email: row.email,
                    address: row.address,
                    firstName: row.firstName,
                    lastName: row.lastName
                })

            });
            return res.render('index.ejs', { req: req, dataUser: data })
        })
}

module.exports = {
    getHomePage
}