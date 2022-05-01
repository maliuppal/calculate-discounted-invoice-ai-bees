const db = require("../config/database");
const User = db.user;
const jwt = require("jsonwebtoken");

// Register new User
const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    const alreadyExistsUser = await User.findOne({
        where: {
            email
        }
    }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsUser) {
        return res.status(409).json({
            message: "User with email already exists!"
        });
    }

    const newUser = new User({
        fullName,
        email,
        password
    });
    const savedUser = await newUser.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({
            error: "Cannot register user at the moment!"
        });
    });

    if (savedUser) res.json({
        message: "Thanks for registering"
    });
};

// Login User
const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const userWithEmail = await User.findOne({
        where: {
            email
        }
    }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (!userWithEmail)
        return res
            .status(400)
            .json({
                message: "Email or password does not match!"
            });

    if (userWithEmail.password !== password)
        return res
            .status(400)
            .json({
                message: "Email or password does not match!"
            });

    const jwtToken = jwt.sign({
            id: userWithEmail.id,
            email: userWithEmail.email
        },
        process.env.JWT_SECRET
    );

    res.json({
        message: "Welcome Back!",
        token: jwtToken
    });
};

export {
    register,
    login,
};