module.exports={
    ensureAuthication:(req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/auth/login")
    }
}