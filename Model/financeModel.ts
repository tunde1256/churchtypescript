import mongoose, { Document, Model } from 'mongoose';

export interface IChurchFinance extends Document {
  branchId: mongoose.Types.ObjectId; // Reference to the branch
  income: number; // Total income for the branch
  expenses: number; // Total expenses for the branch
  balance: number; // Current balance (income - expenses)
  createdAt: Date; // Date of record creation
  updatedAt: Date; // Date of record update
  transactions: ITransaction[]; // List of transactions associated with the branch
}

export interface ITransaction {
  amount: number; // Amount of the transaction
  type: 'income' | 'expense'; // Type of transaction
  description: string; // Description of the transaction
  date: Date; // Date of the transaction
}

const transactionSchema = new mongoose.Schema<ITransaction>({
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const churchFinanceSchema = new mongoose.Schema<IChurchFinance>({
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true }, // Assuming you have a Branch model
  income: { type: Number, default: 0 },
  expenses: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  transactions: { type: [transactionSchema], default: [] }, // Array of transactions
});

// Middleware to calculate the balance
churchFinanceSchema.pre<IChurchFinance>('save', function (next) {
  this.balance = this.income - this.expenses;
  next();
});

const ChurchFinance: Model<IChurchFinance> = mongoose.model<IChurchFinance>('ChurchFinance', churchFinanceSchema);
export default ChurchFinance;
