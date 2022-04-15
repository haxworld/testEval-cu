const express = require('express');
const ResultRoute = express.Router();
const resultModel = require('../models/resultModel');
const testSeriesModel = require('../models/testSeriesModel');

ResultRoute.get('/result/:id',async(req, res) => {
    let id = req.params.id
    let result = await resultModel.find({_id:id})
        .sort('-createdAt')
        .populate('userid')
        .populate('testseriesid')
        .populate('subjectid')

        console.log(result);
        if(result)
        {
            // let sub_info = await testSeriesModel.find({
            //     category: result[0].subjectid._id
            // }).populate(
            //     "count"
            // );

            // console.log("ihjv",sub_info)
            let data = {
                testid : result[0].userid.currentTestId,
                testSeries: result[0].testseriesid,
                subject: result[0].subjectid,
                marks:result[0].result
                // sub_information:sub_info
            }
            

            res.render('result');
        }
        else{
            return res.end('Wrong id');
        }
    
})
module.exports = ResultRoute;