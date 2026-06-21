import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Resend } from "resend"



export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(201).json({
      token,
      user,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      token,
      user,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    // 1. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // 2. Set 10 min expiry
    const expiresAt = Date.now() + 10 * 60 * 1000

    user.resetPasswordOTP = otp
    user.resetPasswordExpires = expiresAt

    await user.save()

    // 3. Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: "Cosy <onboarding@resend.dev>",
      to: email,
      subject: "Cosy OTP (Valid 10 Minutes)",
      html: `
        <div>
          <h2>Your OTP Code</h2>
          <h1 style="font-size:30px">${otp}</h1>
          <p>This OTP is valid for <b>10 minutes only</b>.</p>
        </div>
      `,
    })

    // 4. Send expiry to frontend (for timer)
    res.json({
      message: "OTP sent successfully",
      expiresAt,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    // expiry check
    if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({
        message: "OTP expired",
      })
    }

    // otp check
    if (user.resetPasswordOTP !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      })
    }

    const hashedPassword = await bcrypt.hash(
  newPassword,
  10
)

user.password = hashedPassword;
    user.resetPasswordOTP = null
    user.resetPasswordExpires = null

    await user.save()

    res.json({
      message: "Password reset successful",
    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {

    const {
      name,
      phone,
      location,
      bio,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.location = location || user.location;
    user.bio = bio || user.bio;

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const uploadProfilePicture = async (req, res) => {
  try {

    console.log("req.file =", req.file);

    const user = await User.findById(req.user._id);

    user.profilePicture = req.file.path;

    await user.save();

    res.json({
      success: true,
      profilePicture: user.profilePicture,
    });

  } catch (error) {

    console.log("UPLOAD ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};