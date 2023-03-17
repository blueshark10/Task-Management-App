export const getInitials = (name) => {
    return name[0];
}
let sign = require('jwt-encode');

export const getJWTToken = (username, password) => {
    let jwtToken = sign(
        {
            username,
            password
        },
        "secretKey",
        { expiresIn: "1h" }
    );
    return jwtToken;
}

export const formatDate=(date)=>{
    const newDate=new Date(date)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate=newDate.toLocaleDateString("en-US", options)
    return formattedDate
}