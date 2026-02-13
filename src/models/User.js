import mongoose from 'mongoose';

/*
The User model should have the following:
email: string
password: string
companyName: string
transactions: array of Objects → [
{
productId: ObjectId,
price: number(float),
quantity: number(int),
status: enum → PAID, PENDING, CANCEL
} ]
*/

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: String,
    transactions: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        price: mongoose.Schema.Types.Double,
        quantity: Number,
        status: {
          type: String,
          enum: ['PAID', 'PENDING', 'CANCEL'],
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
