import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Admin, { IAdmin } from "../Model/AdminModel";
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'e2cb72474cc158a5dbe5cc691ada15bbf4878beb94ac1bc116bd06cbc6b02b4367d13905ae6dca89b6240c292d8e3b65a5ef99dddbd992fea55c3b12a7f50a2f';

export const createAdmin =  async (req:Request, res:Response):Promise<any>=> {
    try{
        const {name, email, password, role} = req.body

        // Check if admin already exists
        const adminExists = await Admin.findOne({email})
        if(adminExists){
            res.status(400).json({message: "Admin already exists"})
            return
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create new admin
        const newAdmin: IAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            role,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await newAdmin.save()
        res.status(201).json({message: "Admin created successfully", admin: newAdmin})

    } catch(error){
        res.status(500).json({message: "Server error", error})
    }
}

export const getAdminById = async (req:Request, res:Response):Promise<void>=> {
    try{
        const admin = await Admin.findById(req.params.id).select("-password")
        if(!admin){
            res.status(404).json({message: "Admin not found"})
            return
        }
        res.status(200).json(admin)


    }catch(error){
        res.status(500).json({message: "Server error", error})

    }
}

export const updateAdmin = async (req:Request, res:Response):Promise<any>=> {
    try{
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!updatedAdmin){
            res.status(404).json({message: "Admin not found"})
            return
        }
        res.status(200).json(updatedAdmin)

    }catch(error){
        res.status(500).json({message: "Server error", error})
    }
}

export const adminLogin = async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;
  
      // Check if admin exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = admin.generateAuthToken();
      res.status(200).json({ message: "Admin logged in successfully", token });
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging
      res.status(500).json({ message: "Server error", error });
    }
  };
export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const admin = await Admin.findByIdAndDelete(req.params.id);
      if (!admin) {
        res.status(404).json({ message: "Admin not found" });
        return;
      }
      res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

 

export const adminLogout = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = req.admin; // Assuming req.admin is typed correctly
    
    // Check if the tokens array exists
    if (!admin.tokens) {
      res.status(400).json({ message: "No tokens found" });
      return;
    }

    // Filter out the token to logout
    admin.tokens = admin.tokens.filter((t: { token: string }) => t.token !== req.token);

    // Save the updated admin instance
    await admin.save();

    res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
