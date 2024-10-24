import { Request, Response } from 'express';
import ChurchFinance, { IChurchFinance } from '../Model/financeModel';

// Create a new church finance record
export const createFinanceRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId, income, expenses, transactions } = req.body;

    const newFinanceRecord: IChurchFinance = new ChurchFinance({
      branchId,
      income,
      expenses,
      transactions,
    });

    await newFinanceRecord.save();
    res.status(201).json({ message: 'Finance record created successfully', finance: newFinanceRecord });
  } catch (error) {
    console.error('Error creating finance record:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all finance records for a specific branch
export const getFinanceRecordsByBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId } = req.params;

    const financeRecords = await ChurchFinance.find({ branchId }).populate('branchId');
    if (financeRecords.length === 0) {
      res.status(404).json({ message: 'No finance records found for this branch' });
      return;
    }
    
    res.status(200).json(financeRecords);
  } catch (error) {
    console.error('Error fetching finance records:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a church finance record by ID
export const updateFinanceRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedFinanceRecord = await ChurchFinance.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updatedFinanceRecord) {
      res.status(404).json({ message: 'Finance record not found' });
      return;
    }

    res.status(200).json({ message: 'Finance record updated successfully', finance: updatedFinanceRecord });
  } catch (error) {
    console.error('Error updating finance record:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a church finance record by ID
export const deleteFinanceRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedFinanceRecord = await ChurchFinance.findByIdAndDelete(id);
    if (!deletedFinanceRecord) {
      res.status(404).json({ message: 'Finance record not found' });
      return;
    }

    res.status(200).json({ message: 'Finance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting finance record:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
