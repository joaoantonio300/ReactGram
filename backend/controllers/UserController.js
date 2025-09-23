const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });

  // here i verify if user exists
  if (user) {
    res.status(422).json({ erros: ["Por favor, utilize outro e-mail"] });
    return;
  }

  // Generate password hash
  // To search more about salt methods (bcrypt)
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user ( and a new password )
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  //If user was created sucessfully, return the token
  if (!newUser) {
    res
      .status(422)
      .json({ erros: ["Houve um erro, por favor teste mais tarde."] });
    return;
  }

  // if no one error ocurred then i send to user your token to acess your new account
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// Sign in
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //Check if user exists
  if (!user) {
    res.status(404).json({ erros: ["Usuário não encontardo."] });
    return;
  }

  //Check if password matches
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ erros: ["Senha inválida."] });
    return;
  }

  //Return user with token
  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

// Update an user
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  // the string of mongo is a string, then we have to turn that on object

  const user = await User.findById(
    new mongoose.Types.ObjectId(reqUser._id)
  ).select("-password");

  if (name) {
    user.name = name;
  }

  if (password) {
    // Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

// Get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(
      mongoose.Types.ObjectId.createFromHexString(id)
    ).select("-password");

    // Check if user exists

    if (!mongoose.Types.ObjectId.isValid(user)) {
      res.status(400).json({ errors: [`Identificação incorreta do usuário.`] });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errros: ["Usuário não encontrado."] });

    return;
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};
