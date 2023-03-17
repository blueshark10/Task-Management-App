const User = require('../models/users');

const login = async (req, res) => { // Create and save a new blog
  try {
    const { username, password } = req;
    let response = await User.find({ username,password});
    if (response.length>0) {res.json({status:"good",message:"User Logged In!"});}
    else {res.json({status:"bad",message:"Invalid User Name or Password"});}
  } catch (error) {
    console.log("Error", error.message)
    res.json({ message: error.message });
  }
}
exports.login = login;
