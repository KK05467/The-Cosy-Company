import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      default: "",
    },

    profilePicture: {
    type: String,
    default: "",
    },

    location: {
    type: String,
    default: "",
  },

    bio: {
      type: String,
      default: "",
    },

    accountType: {
      type: String,
      default: "Rider + Driver",
    },

    membership: {
      type: String,
      default: "Gold Member",
    },

    rating: {
      type: Number,
      default: 5,
    },

    totalTrips: {
      type: Number,
      default: 0,
    },

    totalSaved: {
      type: Number,
      default: 0,
    },

    co2Saved: {
      type: Number,
      default: 0,
    },

    password: {
      type: String,
      required: true,
    },

    resetPasswordOTP: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  earnings: {
    type: Number,
    default: 0
},
    emergencyContacts: 
    {
        name: String,
        phone: String
    },
    currentLocation: {
        lat: Number,
        lng: Number
    }
  },

  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)

export default User