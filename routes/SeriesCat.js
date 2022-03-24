const express = require('express');
const SeriesCatRoute = express.Router();
var seriesCat = require('../model/seriesCatModel');

SeriesCatRoute
    .get("/seriescategory", (req, res) => {
        seriesCat.find({}, (err, data) => {
            if (!err) {
                return res.json({ subjects: data, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })
    .post("/seriescategory/create/", (req, res) => {
        var SeriesCat = new seriesCat(req.body)
        SeriesCat.save((err, data) => {
            if (!err) {
                return res.json({ msg: `${data.title} created successfully!`, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })


module.exports = SeriesCatRoute