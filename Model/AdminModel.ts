import mongoose, { Document, Model } from 'mongoose';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'e2cb72474cc158a5dbe5cc691ada15bbf4878beb94ac1bc116bd06cbc6b02b4367d13905ae6dca89b6240c292d8e3b65a5ef99dddbd992fea55c3b12a7f50a2f';


export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken: () => string; // Method to generate JWT
}

const adminSchema = new mongoose.Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Adding the method to the schema
adminSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ id: this._id, email: this.email, role: this.role }, JWT_SECRET, {
    expiresIn: '1h', // Adjust token expiration time as needed
  });
  return token;
};

const Admin: Model<IAdmin> = mongoose.model<IAdmin>('Admin', adminSchema);
export default Admin;
