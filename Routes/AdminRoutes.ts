import {Router} from "express";
 import {
     createAdmin,
     getAdminById,
     updateAdmin,
     deleteAdmin,
     adminLogin,
     adminLogout,
   } from "../Controller/AdminController";
  
;

const router: Router = Router();

// Route to create a new admin
router.post('/create', createAdmin);

// Route to get a admin by ID
router.get('/:id', getAdminById);

// Route to update an admin
router.patch('/:id', updateAdmin);

// Route to delete an admin
router.delete('/:id', deleteAdmin);

// Route to admin login
router.post('/login', adminLogin);

// Route to admin logout
router.post('/logout', adminLogout);


export default router;

