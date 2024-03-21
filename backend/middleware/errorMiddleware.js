const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

//error is passed in as forst argument here, so express knows its a custom error middleware
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;  //if I throw a manual error I created, the status might still be 200, so forcing it to be 500 here
    let message = err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId') { //with mongoose, there's a specific type of error called cast error, and gives a weird message, so just checking for it 
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
};

export {
    notFound,
    errorHandler
};