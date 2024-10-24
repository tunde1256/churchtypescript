"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userrController_1 = require("../Controller/userrController");
const router = (0, express_1.Router)();
// Route to create a new user
router.post('/create', userrController_1.createUser);
// Route to get a user by ID
router.get('/:id', userrController_1.getUserById);
// Route to update a user
router.put('/:id', userrController_1.updateUser);
// Route to delete a user
router.delete('/:id', userrController_1.deleteUser);
// Route to user login
router.post('/login', userrController_1.loginUser);
exports.default = router;
