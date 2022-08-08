const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if(!accessToken){
        return res.json({error: "User is not Logged In"});
    }
    else{
        try{
            const validToken = verify(accessToken, "importantSecret");
            if(validToken){
                return next();
            }
        }
        catch(err){
            res.json({error: err});
        }
    }
};

module.exports = { validateToken };