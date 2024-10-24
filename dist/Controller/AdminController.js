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
exports.adminLogout = exports.deleteAdmin = exports.adminLogin = exports.updateAdmin = exports.getAdminById = exports.createAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AdminModel_1 = __importDefault(require("../Model/AdminModel"));
const JWT_SECRET = 'e2cb72474cc158a5dbe5cc691ada15bbf4878beb94ac1bc116bd06cbc6b02b4367d13905ae6dca89b6240c292d8e3b65a5ef99dddbd992fea55c3b12a7f50a2f';
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        // Check if admin already exists
        const adminExists = yield AdminModel_1.default.findOne({ email });
        if (adminExists) {
            res.status(400).json({ message: "Admin already exists" });
            return;
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create new admin
        const newAdmin = new AdminModel_1.default({
            name,
            email,
            password: hashedPassword,
            role,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        yield newAdmin.save();
        res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.createAdmin = createAdmin;
const getAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield AdminModel_1.default.findById(req.params.id).select("-password");
        if (!admin) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }
        res.status(200).json(admin);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getAdminById = getAdminById;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAdmin = yield AdminModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedAdmin) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }
        res.status(200).json(updatedAdmin);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.updateAdmin = updateAdmin;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if admin exists
        const admin = yield AdminModel_1.default.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        // Check if password is correct
        const isMatch = yield bcrypt_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Generate JWT token
        const token = admin.generateAuthToken();
        res.status(200).json({ message: "Admin logged in successfully", token });
    }
    catch (error) {
        console.error('Login error:', error); // Log the error for debugging
        res.status(500).json({ message: "Server error", error });
    }
});
exports.adminLogin = adminLogin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield AdminModel_1.default.findByIdAndDelete(req.params.id);
        if (!admin) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }
        res.status(200).json({ message: "Admin deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.deleteAdmin = deleteAdmin;
const adminLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.admin; // Assuming req.admin is typed correctly
        // Check if the tokens array exists
        if (!admin.tokens) {
            res.status(400).json({ message: "No tokens found" });
            return;
        }
        // Filter out the token to logout
        admin.tokens = admin.tokens.filter((t) => t.token !== req.token);
        // Save the updated admin instance
        yield admin.save();
        res.status(200).json({ message: "Admin logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.adminLogout = adminLogout;
