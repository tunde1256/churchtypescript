import express from 'express';
import {
  createFinanceRecord,
  getFinanceRecordsByBranch,
  updateFinanceRecord,
  deleteFinanceRecord,
} from '../Controller/financeController';

const router = express.Router();

router.post('/finance', createFinanceRecord);
router.get('/finance/branch/:branchId', getFinanceRecordsByBranch);
router.put('/finance/:id', updateFinanceRecord);
router.delete('/finance/:id', deleteFinanceRecord);

export default router;
