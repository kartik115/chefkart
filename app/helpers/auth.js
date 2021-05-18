var jwt = require('jsonwebtoken');
var conf = require("../../config/" + process.env.NODE_ENV + ".js");

module.exports.generateJwt = (usr) => {
    // return "aaaaaaaaaaaaaaaaaaaaaaaaaa";
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    let payload = {
        "id": usr.id,
        "email": usr.email,
        "name": usr.name,
    }
    return jwt.sign(
        payload,
        conf.secret,
        {expiresIn: "1 days"}
    ); 
}

module.exports.validateJwt = (token) => {
    // return (token == "aaaaaaaaaaaaaaaaaaaaaaaaaa") ? true : false;
    return new Promise((resolve, reject) => {
        jwt.verify(token, conf.secret, function (err, decoded) {
            if (err) {
                console.log(' ****  The error is  **** -->', err);
                return reject({
                    statusCode: 401,
                    message: 'Unauthorized',
                    data: []
                });
            } else {
                console.log('The decoded value is -->', decoded);
                return resolve({
                    statusCode: 200,
                    message: 'Success',
                    data: decoded
                });
            }
        });
    });
}


// const generateJwt1 = (usr) => {
//     var expiry = new Date();
//     expiry.setDate(expiry.getDate() + 1);
//     let payload = {
//         "id": usr.id,
//         "email": usr.email,
//         "name": usr.name,
//     }
//     return jwt.sign(
//         payload,
//         conf.secret,
//         {expiresIn: 24*60*60}
//     ); 
// };

// const validateJwt1 = () => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, conf.secret, function (err, decoded) {
//             if (err) {
//                 console.log(' ****  The error is  **** -->', err);
//                 return resolve({
//                     statusCode: 401,
//                     message: 'Unauthorized',
//                     data: []
//                 });
//             } else {
//                 // console.log('The decoded value is -->', decoded);
//                 return resolve({
//                     statusCode: 200,
//                     message: 'Success',
//                     data: decoded
//                 });
//             }
//         });
//     });
// }

// console.log(generateJwt1({"id":1, "email": "abc@gmail.com", "phone": "1234567890"}));
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhYmNAZ21haWwuY29tIiwiaWF0IjoxNjIxMzU2MzI1LCJleHAiOjE2MjE0NDI3MjV9.QFIy8lSJWT3hLKsLvbIcZomqqAXl5kMtUa03mO1nd_s";
// let resp = validateJwt1(token);
// console.log(resp);
// console.log(new Date(resp.data.exp));