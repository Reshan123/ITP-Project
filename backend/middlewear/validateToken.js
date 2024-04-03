const jwt = require('jsonwebtoken')

// const decodeToken = (token) => {
//     return jwt.verify(token, process.env.SECRET , (err, decoded) => {
//         if (err) {
//             return undefined;
//         }
//         return decoded;
//     });
// };

const authorize = (req, res, next) => {
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send({msg: 'Invalid Token'});
        }
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.user = decodedToken
        next();
    } catch (error) {
        return res.status(401).send({message: 'Invalid Token'});
    }
}

module.exports = { authorize };