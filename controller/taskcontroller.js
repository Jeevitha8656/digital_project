const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
// const
const User = require('../model/schema');
const Token = require('../model/token');
const {LocalStorage} = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

module.exports.login =async (req, res) => {
    try{
        const {email,password}=req.body;
        const User1= await User.findOne({email});
        if(!User1){
             return res.status(400).json({"message":"User not found please register first"});
            //res.status(400).redirect('/register');
        }
        if(!email){
            return res.status(400).json({"message":"Email should not be empty"});
        }
        if(!password){
            return res.status(400).json({"message":"Password should not be empty"});
        }
        const Token1 = await Token.findOne({userId:User1._id});
        if(User1){
            const isMatch = await bcrypt.compare(password,User1.password);
            if(isMatch){
                if(Token1){
                    // res.send('User already logged in');
                  res.status(302).redirect('/');
                }
                const token = jwt.sign({id:User1._id},process.env.SECRET_KEY);
            const newToken = await Token.create({ 
            token,
            userId:User1._id
            });
            localStorage.setItem('User1._id', token);
            console.log(localStorage.getItem('User1._id'));
            //newToken.save();
            }
            else{
                res.status(400).send('Invalid credentials');
            }
        }
        // else{
        //     res.send('User not found');
            
        // }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.home = (req, res) => {
    res.render('home', {
        title: 'Home'
    })
}   

module.exports.logout = (req, res) => {
    res.render('logout', {
        title: 'Logout'
    })
}

// 

module.exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, confirmPassword } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }
    if (!email) {
      return res.status(400).send('Email is required');
    }
    if (!password) {
      return res.status(400).send('Password is required');
    }
    if (password !== confirmPassword) {
      return res.status(400).send('Password does not match');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ 
      name,
      email,
      password: hashPassword
    });

    await newUser.save();
    console.log(newUser);

    res.status(302).redirect('/login');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports.loginpage = (req, res) => {
    res.render('login', {
        title: 'Login'
    })
}

module.exports.registerpage = (req, res) => {   
    res.render('register', {
        title: 'Register'
    })
}

module.exports.forgotpassword = async (req, res) => {
    try{
        console.log(req.body);
        const {email,password,confirmPassword}=req.body;
        if(!email){
            return res.status(400).json({"message":"Email is required"});
        }
        if(!password){
            return res.status(400).json({"message":"Password is required"});
        }
        if(password!==confirmPassword){
            return res.status(400).json({"message":"Password does not match"});
        }
        const User1= await User.findOneAndUpdate({email},{password:password});
        console.log(User1);
        if(User1){
            
            res.status(302).redirect('/login');
        }
        else{
            res.status(400).json({"message":"User not found"});
        }   
       
    }
    catch(err){
        console.log(err);
    }
}

module.exports.forgotpass = (req, res) => {
    res.render('forgot', {
        title: 'Forgot Password'
    })
}


module.exports.logout = async (req, res) => {
    try{
        const token = req.headers.authorization;
        const id = req.params.id;
        //const Token1= await Token.findOne
        ({token});
        if(Token1){
            //await Token1.delete();
            localStorage.removeItem('id');  
            res.status(200).send('User logged out').redirect('/login');

        }
        else{
            res.send('User not logged in');
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.logoutpage = (req, res) => {
    res.render('logout', {
        title: 'Logout'
    })
}

module.exports.getlocal = async (req, res) => {
    let key=req.query.key;
    let value = localStorage.getItem(key);
    res.send(value);
}