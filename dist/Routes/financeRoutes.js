"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const financeController_1 = require("../Controller/financeController");
const router = express_1.default.Router();
router.post('/finance', financeController_1.createFinanceRecord);
router.get('/finance/branch/:branchId', financeController_1.getFinanceRecordsByBranch);
router.put('/finance/:id', financeController_1.updateFinanceRecord);
router.delete('/finance/:id', financeController_1.deleteFinanceRecord);
exports.default = router;
