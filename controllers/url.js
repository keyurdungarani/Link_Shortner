import { nanoid } from "nanoid"
import URL from "../models/url.js"
import mongoose from "mongoose";
import fs from 'fs';


async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" })
    const shortId = nanoid(8);

    const urlData = await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.render('home', { id: urlData?.shortId, domain : process.env.DOMAIN });
}

async function handleGetUrl(req, res) {
    const id = req.params.shortId
    // console.log("🚀 ~ handleGetUrl ~ shortId:", id)
    const getFullUrl = await URL.findOne({ shortId: id });
    if (!getFullUrl) res.status(404).json({ msg: "url not found" })
    return res.redirect(getFullUrl.redirectURL);
}

async function handleRedirectUrl(req,res){
    const id = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId: id}, {$push: {
        visitHistory: {timestamps: Date.now()},
    }});
    res.redirect(entry.redirectURL)
}

async function handleGetAnalytics(req,res){
    const entry = await URL.findOneAndUpdate({shortId: req.params.shortId}, {$push: {
        visitHistory: {timestamps: Date.now()},
    }});
    const date = new Date();

    fs.appendFile('analytics.txt', `\n${entry.redirectURL} Total visited:(${entry.visitHistory.length}) ${date}\n`, (err,data)=> console.log("request is coming"));
    
    res.redirect(entry.redirectURL)
}

export { handleGenerateNewShortURL, handleGetUrl, handleRedirectUrl, handleGetAnalytics }