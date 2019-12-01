const express=require('express');

const router=express.Router();

const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const shortid = require("shortid");
const errorUrl='http://localhost:7000/error';

  router.get("/:code", async (req, res) => {
    const urlCode = req.params.code;
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
      return res.redirect(item.originalUrl);
    } else {
      return res.redirect(errorUrl);
    }
  });
  router.post("/api/item", async (req, res) => {
    const { originalUrl } = req.body;
    const shortBaseUrl="http://localhost:7000";
    const urlCode = shortid.generate();
    const updatedAt = new Date();
    if (validUrl.isUri(originalUrl)) {
      try {
        const item = await UrlShorten.findOne({ originalUrl: originalUrl });
        if (item) {
          res.status(200).json(item);
        } else {
        
          shortUrl = shortBaseUrl + "/" + urlCode;
          const item = new UrlShorten({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt
          });
          await item.save();
          res.status(200).json(item);
        }
      } catch (err) {
        res.status(401).json("Invalid User Id");
      }
    } else {
      return res
        .status(401)
        .json(
          "Invalid Original Url"
        );
    }
  });


module.exports=router;