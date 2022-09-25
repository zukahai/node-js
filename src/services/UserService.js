import pool from "../configs/connectDB";

export async function getAll(){
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return rows;
}

export async function search(keyword){
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE ' +
        'firstName LIKE \'%' + keyword +'%\'' +
        ' OR lastName LIKE \'%' +keyword +'%\'' +
        ' OR email LIKE \'%'+keyword+'%\'' +
        ' OR address LIKE \'%'+keyword+'%\'');
    return rows;
}

export async function _delete(id){
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return id;
}

export async function find(id){
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

export async function add(data){
    await pool.execute('INSERT INTO users(firstName, lastName, email, address) VALUES(?, ?, ?, ?)',
        data);
    return data;
}

export async function update(data){
    await pool.execute('UPDATE `users` SET firstName=?,lastName=?,email=?,address=? WHERE id=?',
        data);
    return data;
}