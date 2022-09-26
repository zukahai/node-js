import pool from "../configs/connectDB";

export function pthh(str){
    //remove space
    str = str.replaceAll(' ','');
    //get left right
    let left = str.split('=')[0];
    let right = str.split('=')[1];

    left = left.split('+');
    right = right.split('+');

    let result = [];

    const dataLeft = {};
    for (let x in left) {
        dataLeft[left[x]] = component_analysis(left[x]);
    }

    const dataRight = {};
    for (let x in right) {
        dataRight[right[x]] = component_analysis(right[x]);
    }
    return {
        left: left,
        right: right,
        data: {
            dataLeft: dataLeft,
            dataRight: dataRight,
        },
        hello: component_analysis("Cu(OH)2")
    }
}

function component_analysis(str){
    str = str + "Z";
    //Fe2(SO4)3
    const data = {};
    let element = "";
    let quantity = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            quantity = quantity + str[i];
        } else if (str[i] >= 'A' && str[i] <= 'Z') {
            if (element.length > 0) {
                data[element] = ((typeof data[element] !== 'undefined') ? Math.floor(data[element]) : 0) +
                    ((quantity.length > 0) ? Math.floor(quantity) : 1);


                element = "";
                quantity = "";
            }
            element = element + str[i];
        } else if (str[i] >= 'a' && str[i] <= 'z') {
            element = element + str[i];
        } if (str[i] === '(') {
            data[element] = ((typeof data[element] !== 'undefined') ? Math.floor(data[element]) : 0) +
                ((quantity.length > 0) ? Math.floor(quantity) : 1);
            element = "";
            quantity = "";
            let count = 1;
            let str2 = "";
            i++;
            while(count > 0 && i < str.length) {
                console.log((str[i]))
                if (str[i] === '(')
                    count++;
                if (str[i] === ')')
                    count--;
                if (count === 0)
                    break;
                str2 = str2 + str[i];
                i++;
            }
            i++;
            while(str[i] >= '0' && str[i] <= '9' && i < str.length){
                quantity = quantity + str[i++];
            }
            let sub_data = component_analysis(str2);
            console.log(sub_data);
            for (let x in sub_data) {
                data[x] = ((data[x] != null) ? data[x] : 0) +
                    Math.floor(sub_data[x]) * Math.floor(quantity);
            }
            element = "";
            quantity = "";
        }
    }
    return data;
}