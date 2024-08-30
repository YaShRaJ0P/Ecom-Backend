import createHttpError from "http-errors";
import usermodel from "../models/userModel.js";
import createActivationToken from "../helper/activationToken.js";
import emailHelper from "../utils/EmailHelper.js";
import cookieToken from "../utils/cookieToken.js";
import jwt from "jsonwebtoken";
import { _config } from "../config/config.js";
import { redis } from "../config/redis.js";

const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !email || !password) {
      return next(createHttpError(400, "All fields are required"));
    }

    const User = {
      firstname,
      lastname,
      email,
      password,
    };

    //get activation token
    const activationToken = createActivationToken(User);

    //get code
    const activationCode = activationToken.activationCode;

    //extract  data before send code
    const data = {
      user: { firstname: User.firstname, lastname: User.lastname },
      activationCode,
    };

    //call emailhelper
    try {
      await emailHelper({
        email: User.email,
        subject: "Activate Your Account",
        template: "activationMail.ejs",
        data,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email ${User.email} to verify account.`,
        activationToken: activationToken.token,
      });
    } catch (error) {
      return next(
        createHttpError(401, "Error while sending activation email", error)
      );
    }
  } catch (error) {
    return next(
      createHttpError(401, "error While Registering user", error.message)
    );
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { activation_code, activation_token } = req.body;

    const newUser = jwt.verify(activation_token, _config.ACTIVATION_SECRET);

    //check code
    if (String(newUser.activationCode) !== String(activation_code)) {
      return next(createHttpError(400, "invalid activation code"));
    }

    const { firstname, lastname, email, password } = newUser.user;

    //check user exist by email
    const existUser = await usermodel.findOne({ email });

    if (existUser) {
      return next(createHttpError(401, "user already exist with this email"));
    }

    const user = await usermodel.create({
      firstname,
      lastname,
      email,
      password,
      isVerified: true,
    });

    //send cookie
    cookieToken(user, res, 200);
  } catch (error) {
    return next(createHttpError(400, "error while activating user", error));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, "All fields are required"));
    }

    const user = await usermodel.findOne({ email }).select("+password");

    if (!user) {
      return next(createHttpError(401, "Invalid email or password"));
    }

    //checck password
    const isPasswordMatch = await user.isValidatedPassword(password);

    if (!isPasswordMatch) {
      return next(createHttpError(400, "invalid email or password.."));
    }

    //send cookie
    cookieToken(user, res, 200);
  } catch (error) {
    return next(createHttpError(500, "login  error...." , error.message));
  }
};

const logout = async (req, res, next) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });

    //delete from redis db
    const userId = req.user?._id || "";

    redis.del(userId);

    res.status(200).json({
      success: true,
      message: "logout successfully..",
    });
  } catch (error) {
    return next(createHttpError(400, "logout error..."));
  }
};

export { register, verifyOtp, login, logout };
