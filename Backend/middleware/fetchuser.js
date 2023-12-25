const jwt = require('jsonwebtoken');

const JWT_SECERET = "MynameisShreeyogGaikwad@$";

const fetchuser = (req, res, next) =>{
    const token = req.header("auth-token");
    if(!token)
    {
        res.status(401).send({error : "Please Authenticate using a valid Token."});
    }
    try {
        const data = jwt.verify(token, JWT_SECERET);
        req.user = data.user;
        next();
    } 
    catch (error) 
    {
        res.status(401).send({error : "Please Authenticate using a valid Token."});
    }
}

module.exports = fetchuser;