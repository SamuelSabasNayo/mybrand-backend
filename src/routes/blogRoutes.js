import Router from 'express';
import blogController from '../controllers/blogControlller';

const router = Router();

router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post);

router.put('/:id', blogController.blog_update);

router.delete('/:id', blogController.blog_delete);

export default router;
