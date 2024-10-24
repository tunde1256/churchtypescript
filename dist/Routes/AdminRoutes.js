"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = require("../Controller/AdminController");
;
const router = (0, express_1.Router)();
// Route to create a new admin
router.post('/create', AdminController_1.createAdmin);
// Route to get a admin by ID
router.get('/:id', AdminController_1.getAdminById);
// Route to update an admin
router.patch('/:id', AdminController_1.updateAdmin);
// Route to delete an admin
router.delete('/:id', AdminController_1.deleteAdmin);
// Route to admin login
router.post('/login', AdminController_1.adminLogin);
// Route to admin logout
router.post('/logout', AdminController_1.adminLogout);
exports.default = router;
