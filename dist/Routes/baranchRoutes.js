"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const branchController_1 = require("../Controller/branchController"); // Adjust the import path as needed
const router = express_1.default.Router();
// Define routes for Branch
router.post('/', branchController_1.createBranch); // Create a new branch
router.get('/', branchController_1.getBranches); // Get all branches
router.get('/:id', branchController_1.getBranchById); // Get a specific branch by ID
router.put('/:id', branchController_1.updateBranch); // Update a specific branch by ID
router.delete('/:id', branchController_1.deleteBranch); // Delete a specific branch by ID
exports.default = router;
