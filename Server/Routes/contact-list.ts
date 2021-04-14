// Express Configuration
import express from 'express';
import { DisplayAddPage, DisplayContactListPage, DisplayEditPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage } from '../Controllers/contact-list';
const router = express.Router();
export default router;

import { AuthGuard } from '../Util/index';

/* GET contact-list page - with /contact-list */
router.get('/', AuthGuard, DisplayContactListPage);

/* Display edit/:id page - with /edit/:id */
router.get('/edit/:id', AuthGuard, DisplayEditPage);

/* Display add page - with /add */
router.get('/add', AuthGuard, DisplayAddPage);

/* Process edit/:id page - with /edit/:id */
router.post('/edit/:id', AuthGuard, ProcessEditPage);

/* Process edit/:id page - with /edit/:id */
router.post('/add', AuthGuard, ProcessAddPage);

/* Process delete/:id page - with /delete/:id */
router.get('/delete/:id', AuthGuard, ProcessDeletePage);