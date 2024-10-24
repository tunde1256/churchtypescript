import { Request, Response } from 'express';
import Branch, { IBranch } from '../Model/BranchModel'; // Adjust the import path as needed

// Create a new branch
export const createBranch = async (req: Request, res: Response): Promise<void> => {
    try {
        const branchData: IBranch = req.body;
        const branch = new Branch(branchData);
        await branch.save();
        res.status(201).json({ message: 'Branch created successfully', branch });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all branches
export const getBranches = async (req: Request, res: Response): Promise<void> => {
    try {
        const branches = await Branch.find();
        res.status(200).json(branches);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a branch by ID
export const getBranchById = async (req: Request, res: Response): Promise<void> => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) {
            res.status(404).json({ message: 'Branch not found' });
            return;
        }
        res.status(200).json(branch);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a branch
export const updateBranch = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedBranch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBranch) {
            res.status(404).json({ message: 'Branch not found' });
            return;
        }
        res.status(200).json(updatedBranch);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a branch
export const deleteBranch = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedBranch = await Branch.findByIdAndDelete(req.params.id);
        if (!deletedBranch) {
            res.status(404).json({ message: 'Branch not found' });
            return;
        }
        res.status(200).json({ message: 'Branch deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
