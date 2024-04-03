const errorhandler = (error,req,res,next)=>{
    console.log(error.message);
    res.status(error.statusCode).send(error.message)
}

module.exports = errorhandler;