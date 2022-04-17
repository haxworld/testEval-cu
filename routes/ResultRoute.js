const express = require('express');
const ResultRoute = express.Router();
const resultModel = require('../models/resultModel');
const questionModel = require('../models/questionModel')

ResultRoute.post('/fetch', (req, res) => {
    console.log(req.body)
    const result = new resultModel(req.body);
    result.save();
    // return res.render(`<p>Success</p>`);
    return res.end('success')
})
ResultRoute.get('/result/:id',async(req, res) => {
    let id = req.params.id
    // console.log(id)
    let result = await resultModel.find({_id:id})
        .sort('-createdAt')
        .populate('userid')
        .populate('testseriesid')
        .populate('subjectid')

        if(result)
        {
            var quesidList = [];
            // var quesList = [];
            var choiceList = [];
            var outcomeList = [];
            let element = result[0].resultmeta;
            // console.log(result)
    
       
       quesidList = element.map(item => item.quesid)
       console.log(quesidList)
        // quesidList.forEach(async(element) => {
        //     console.log(element)
        //         var question = await questionModel.find({_id:element})
                
        //     quesList.push(question[0])
        //     console.log("I am ",question)
        // });
        // console.log("Hola ",quesList)

        choiceList = element.map(item => item.userchoice)
        outcomeList = element.map(item => item.outcome)
        async function lookForQuestions(quesidList) {
            let quesList = [];
            for (let ques of quesidList) {
                try {
                    let found = await questionModel.find({_id:ques}).exec();
                    quesList.push(found);
                } catch(e) {
                    console.log(`did not find it in database`);
                }
            }
            console.log(quesList[0][0]);
            return quesList;
        }
        
        lookForQuestions(quesidList).then(quesList => {
            // process results here
            let data = {
                testid : result[0].userid.currentTestId,
                testSeries: result[0].testseriesid,
                subject: result[0].subjectid,
                result_parameters:result[0].resultmeta,
                Questions:quesList[0],
                Qid:quesidList,
                choiceList:choiceList,
                outcomeList:outcomeList,
                others: result[0],
            }
            console.log(result[0])
            return res.render('result',{data});
            
        }).catch(err => {
            // process error here
        })
        
            
        }
        else{
            return res.end('Wrong id');
        }
    
})
module.exports = ResultRoute;