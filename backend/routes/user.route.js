import express from "express";
import { addBook, getAllBooks, getBookByAuthor, getBookByGenre, getBookByTitle, updateBookDetails } from "../controllers/user.controller.js";
import { protectAdminRoute, protectUserRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post('/add',protectAdminRoute,addBook);
router.post('/update/:id',protectAdminRoute,updateBookDetails);
router.get('/get/:author',protectUserRoute,getBookByAuthor);
router.get('/getAll',protectUserRoute,getAllBooks);
router.get('/get/title/:title',protectUserRoute,getBookByTitle);
router.get('/get/genre/:genre',protectUserRoute,getBookByGenre);

export default router;
