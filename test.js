var jwt = require('jsonwebtoken');
const secret = 'shhhhh';
var token = jwt.sign({ name: 'Alex', password: 'dsfdsf34nb3', id: 5 }, secret);

console.log(token);

console.log( jwt.verify(token, secret) );

try {
    console.log( jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..xXjrZISgK86btjBpUXybC5XmxSj3qBlJXC-FMn2tR_c', secret) );
} catch {
    console.log("Невалидный токен");
}