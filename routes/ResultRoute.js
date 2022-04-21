const express = require('express');
const ResultRoute = express.Router();
const resultModel = require('../models/resultModel');
const questionModel = require('../models/questionModel')
const userModel = require('../models/userModel')

ResultRoute.get('/viewresult', async (req, res) => {
    let user = await req.user.id;
    let currentUser = await userModel.find({ _id: user });
    let userName = currentUser[0].name


    let testTakenList = await resultModel.find({ userid: user })
        .sort('-createdAt')
        .populate('userid')
        .populate('testseriesid')
        .populate('subjectid')


    let dateList = []
    let List = []
    
    testTakenList.forEach(element => {
        let date = new Date(element.createdAt).toLocaleDateString('en-us',{day: 'numeric'})
        let month = new Date(element.createdAt).toLocaleDateString('en-us',{month: 'numeric'})
        let year = new Date(element.createdAt).toLocaleDateString('en-us',{year: 'numeric'})
        const FormattedDate = `${date}/${month}/${year}`
        dateList.push(FormattedDate);
        
        List.push(element.testseriesid._id)
    
    });
    
    
    let  len = [];
    // let allquestions = []
    // List.forEach( async item=>{
        
    //     allquestions = await questionModel.find({ subjectId: item })
    //     len.push(allquestions.length)
    // })

    console.log(List)
    data = {
        title: "View Result",
    }
    res.render('admin/view_result', {
        testTakenList: testTakenList,
        userName: userName,
        len:len,
        dateList:dateList
    });
})


ResultRoute.get('/result/:id', async (req, res) => {
    let id = req.params.id
    
    let result = await resultModel.find({ _id: id })
        .sort('-createdAt')
        .populate('userid')
        .populate('testseriesid')
        .populate('subjectid')

    if (result) {
        var quesidList = [];
        var choiceList = [];
        var outcomeList = [];
        let element = result[0].resultmeta;
       
        
        let allquestions = await questionModel.find({ subjectId: result[0].testseriesid._id })
        quesidList = element.map(item => item.quesid)
        // console.log(quesidList.length)
        let i = 0;
        
        let choiceBucket = []
        let outcomeBucket = []

        choiceList = element.map(item => item.userchoice)
        outcomeList = element.map(item => item.outcome)
        
        allquestions.forEach(element => {
           if(i<quesidList.length)
           {
                if(element._id == quesidList[i])
                {
                    
                    choiceBucket.push(choiceList[i])
                    outcomeBucket.push(outcomeList[i])
                    i++;
                }
                else
                {
                    choiceBucket.push(`<p>Unanswered</p>`);
                    outcomeBucket.push(`0`);
                }
                
           }
        });
           
        
            let data = {

                testSeries: result[0].testseriesid,
                subject: result[0].subjectid,
               
                allquestions:allquestions,
                
                choiceList: choiceBucket,
                outcomeList: outcomeBucket,
                others: result[0],
            }
            
            return res.render('admin/result', { data });  

    }
    else{
        return res.end('Wrong id');
    }

})
module.exports = ResultRoute;