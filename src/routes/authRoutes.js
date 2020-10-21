import Router from 'express';
import authController from '../controllers/authController';
import loginController from '../controllers/loginController';
import validateUser from '../middlewares/validateUser';
import auth from '../middlewares/authenticateUser';

const router = Router();

router.get('/', auth.authUser, authController.user_get);
// router.get('/', [auth.authUser, auth.authAdmin], authController.user_index);

router.get('/:id', auth.authUser, authController.user_getOne);

router.post('/signup', validateUser.validate_user, authController.user_signup);

router.post('/login', loginController.user_login);

// router.put('/myblogs/:id', blog_update);

router.delete('/:id', auth.authUser, authController.user_delete);

export default router;
