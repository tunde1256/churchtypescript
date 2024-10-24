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
exports.deleteFinanceRecord = exports.updateFinanceRecord = exports.getFinanceRecordsByBranch = exports.createFinanceRecord = void 0;
const financeModel_1 = __importDefault(require("../Model/financeModel"));
// Create a new church finance record
const createFinanceRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { branchId, income, expenses, transactions } = req.body;
        const newFinanceRecord = new financeModel_1.default({
            branchId,
            income,
            expenses,
            transactions,
        });
        yield newFinanceRecord.save();
        res.status(201).json({ message: 'Finance record created successfully', finance: newFinanceRecord });
    }
    catch (error) {
        console.error('Error creating finance record:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createFinanceRecord = createFinanceRecord;
// Get all finance records for a specific branch
const getFinanceRecordsByBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { branchId } = req.params;
        const financeRecords = yield financeModel_1.default.find({ branchId }).populate('branchId');
        if (financeRecords.length === 0) {
            res.status(404).json({ message: 'No finance records found for this branch' });
            return;
        }
        res.status(200).json(financeRecords);
    }
    catch (error) {
        console.error('Error fetching finance records:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.getFinanceRecordsByBranch = getFinanceRecordsByBranch;
// Update a church finance record by ID
const updateFinanceRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedFinanceRecord = yield financeModel_1.default.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedFinanceRecord) {
            res.status(404).json({ message: 'Finance record not found' });
            return;
        }
        res.status(200).json({ message: 'Finance record updated successfully', finance: updatedFinanceRecord });
    }
    catch (error) {
        console.error('Error updating finance record:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateFinanceRecord = updateFinanceRecord;
// Delete a church finance record by ID
const deleteFinanceRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedFinanceRecord = yield financeModel_1.default.findByIdAndDelete(id);
        if (!deletedFinanceRecord) {
            res.status(404).json({ message: 'Finance record not found' });
            return;
        }
        res.status(200).json({ message: 'Finance record deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting finance record:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.deleteFinanceRecord = deleteFinanceRecord;
