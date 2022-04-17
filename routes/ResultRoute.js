const express = require('express');
const ResultRoute = express.Router();
const resultModel = require('../models/resultModel');
const questionModel = require('../models/questionModel')


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
            console.log('Result',result[0])
    
       
       quesidList = element.map(item => item.quesid)
    //    console.log(quesidList)
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
            // console.log(quesList[0][0]);
            return quesList;
        }
        
        lookForQuestions(quesidList).then(quesList => {
            // process results here
            let data = {
                
                testSeries: result[0].testseriesid,
                subject: result[0].subjectid,
                result_parameters:result[0].resultmeta,
                Questions:quesList,
                Qid:quesidList,
                choiceList:choiceList,
                outcomeList:outcomeList,
                others: result[0],
            }
            console.log(data.Questions)
            return res.render('result',{data});
            
        }).catch(err => {
            // process error here
        })
        
            
        }
        // else{
        //     return res.end('Wrong id');
        // }
    
})
module.exports = ResultRoute;