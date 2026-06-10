import mongoose from "mongoose";

const platformWalletSchema = new mongoose.Schema(
{
    balance: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
}
);

export default mongoose.model(
    "PlatformWallet",
    platformWalletSchema
);