const localStrategy = require('passport-local').Strategy

const User = require('../models/User');
const Dhash =require('bcryptjs')

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField:'email'},async (email,password,done) => {

        try {
            const user =await User.findOne({email});
            if(!user){
                return done(null,false,{
                    message:'User not found with that eamil'
                })
            }
            const isMatch = await Dhash.compare(password,user.password);
            if(!isMatch){
                return done(null,false,{message:'Incorrect password'})
            }
            return done(null,user)
        } catch (error) {
            return done(error);
        }
    }
)
)
passport.serializeUser(function(user,done){
    done(null,user.id)
});
passport.deserializeUser(async function(id,done) {
  try {
    const user = await User.findById(id);
    done(null,user)
  } catch (error) {
    done(error)
  }  
})
};
