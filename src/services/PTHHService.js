import pool from "../configs/connectDB";

export function pthh(str){
    //remove space
    str = str.replaceAll(' ','');
    //get left right
    let left = str.split('=')[0];
    let right = str.split('=')[1];
    return {
        left: left.split('+'),
        right: right.split('+')
    }
}