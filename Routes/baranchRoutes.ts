import express from 'express';
import {
    createBranch,
    getBranches,
    getBranchById,
    updateBranch,
    deleteBranch
} from '../Controller/branchController'; // Adjust the import path as needed

const router = express.Router();

// Define routes for Branch
router.post('/', createBranch);              // Create a new branch
router.get('/', getBranches);                 // Get all branches
router.get('/:id', getBranchById);           // Get a specific branch by ID
router.put('/:id', updateBranch);             // Update a specific branch by ID
router.delete('/:id', deleteBranch);          // Delete a specific branch by ID

export default router;
