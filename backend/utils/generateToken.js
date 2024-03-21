import jwt from 'jsonwebtoken';


//we can add something in the payload. 
//We add the userId because we need that when we validate the token, we need to be able to pull that userId out so we can get out stuff like profile etc.

const generateToken = (res, userId) => {
    const token = jwt.sign({userId: userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true, //HttpOnly Cookie is a tag added to a browser cookie that prevents client-side scripts from accessing data
        secure: process.env.NODE_ENV !== 'development', //the site has to be https, only n prod though
        sameSite: 'strict', //to prevent CSRF attacks: an attack that forces authenticated users to submit a request to a Web application against which they are currently authenticated
        maxAge: 30 * 86400
    });
};

export default generateToken; 