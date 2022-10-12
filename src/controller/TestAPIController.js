import axios from "axios";
import {response} from "express";

let index = (req, res) => {
    return res.render('api/pthh.ejs')
}

let solve = async (req, res) => {
    const { pthh } = req.body;
    let result = "";
    await axios.post('https://api-balance-chemical-equations.herokuapp.com/api/v1/pthh', {
        pthh: pthh
    })
    .then(function (response, res) {
        result = response.data.result.text;
    })
    .catch(function (error) {
        console.log(error);
    });
    return res.render('api/pthh.ejs', {result: result})
}

module.exports = {
    index,
    solve
}