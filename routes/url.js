import express from "express";
import { handleGenerateNewShortURL, handleGetAnalytics, handleGetUrl, handleRedirectUrl } from "../controllers/url.js";
const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.route('/:shortId').get(handleGetUrl).patch(handleRedirectUrl)
router.route('/analytics/:shortId').get(handleGetAnalytics)

export default router;
