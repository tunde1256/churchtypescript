"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBranch = exports.updateBranch = exports.getBranchById = exports.getBranches = exports.createBranch = void 0;
const BranchModel_1 = __importDefault(require("../Model/BranchModel")); // Adjust the import path as needed
// Create a new branch
const createBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branchData = req.body;
        const branch = new BranchModel_1.default(branchData);
        yield branch.save();
        res.status(201).json({ message: 'Branch created successfully', branch });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createBranch = createBranch;
// Get all branches
const getBranches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branches = yield BranchModel_1.default.find();
        res.status(200).json(branches);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getBranches = getBranches;
// Get a branch by ID
const getBranchById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branch = yield BranchModel_1.default.findById(req.params.id);
        if (!branch) {
            res.status(404).json({ message: 'Branch not found' });
            return;
        }
        res.status(200).json(branch);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getBranchById = getBranchById;
// Update a branch
const updateBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBranch = yield BranchModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBranch) {
            res.status(404).json({ message: 'Branch not found' });
            return;
        }
        res.status(200).json(updatedBranch);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateBranch = updateBranch;
// Delete a branch
const deleteBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBranch = yield BranchModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedBranch) {
            res.status(404).json({ message: 'Branch not found' });
            return;
        }
        res.status(200).json({ message: 'Branch deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteBranch = deleteBranch;
