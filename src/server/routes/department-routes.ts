import { Router } from 'express';
import DepartmentController from '../controllers/department-controller';

const router = Router();

router.post('/departments/new', DepartmentController.createDepartment);
router.get('/departments/all', DepartmentController.getAllDepartments);
router.get('/departments/:id', DepartmentController.getDepartment);
router.put('/departments/:id', DepartmentController.updateDepartment);
router.delete('/departments/:id', DepartmentController.deleteDepartment);

export default router;
