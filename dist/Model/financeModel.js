"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
});
const churchFinanceSchema = new mongoose_1.default.Schema({
    branchId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Branch', required: true }, // Assuming you have a Branch model
    income: { type: Number, default: 0 },
    expenses: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    transactions: { type: [transactionSchema], default: [] }, // Array of transactions
});
// Middleware to calculate the balance
churchFinanceSchema.pre('save', function (next) {
    this.balance = this.income - this.expenses;
    next();
});
const ChurchFinance = mongoose_1.default.model('ChurchFinance', churchFinanceSchema);
exports.default = ChurchFinance;
