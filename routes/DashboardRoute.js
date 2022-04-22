const express=require('express');
const userModel=require('../models/userModel');
const DashboardRoute=express.Router();
const resultModel=require('../models/resultModel');
const fs=require('fs')
const path=require('path')


// ProfileRoute
//     .get('/profile', async (req, res) => {
//         try {
//             let user = await userModel.findOne({ _id: req.user.id })
//             const { name, email, username, photo, collegeName, graduationYear, createdAt } = user
//             return res.json({ name, email, username, photo, collegeName, graduationYear, joined: createdAt })
//         } catch (error) {
//             return res.json("redirect to login")
//         }
//     })

DashboardRoute
    .get('/dashboard', async (req, res) => {
        let user=await userModel.findOne({ _id: req.user.id });
        const { name, email, username, photo, collegeName, graduationYear, createdAt, avatar }=user;
        let totalTestCount=await resultModel.countDocuments({ userid: req.user.id });
        const data={
            title: 'Dashboard',
            name,
            email,
            username,
            avatar,
            collegeName,
            graduationYear,
            createdAt,
            totalTestCount
        }
        return res.render('admin/user_dashboard', { data });
    })

DashboardRoute.get('/edit-profile', async (req, res) => {

    let user=await userModel.findOne({ _id: req.user.id });
    let data={
        title: 'Edit Profile',
        user: user
    }
    return res.render('admin/editProfile', { data });
})

DashboardRoute.post('/edit-profile/update-info', async (req, res) => {

    let user=await userModel.findById(req.user.id)
    userModel.uploadedAvatar(req, res, (err) => {
        if (err) {
            console.log("Multer error");
            return res.redirect('back');
        }

        user.name=req.body.name
        // user.email = req.body.email
        user.username=req.body.username
        user.collegeName=req.body.collegeName
        user.graduationYear=req.body.graduationYear

        // console.log(req.file)
        if (req.file) {
            if (user.avatar) {
                fs.unlinkSync(path.join(__dirname, '..', user.avatar));
            }
            user.avatar=userModel.avatarPath+'/'+req.file.filename

            res.clearCookie('avatar', { path: '/' });
            res.cookie('avatar', user.avatar)
        }
        user.save((err, data) => {
            if (!err) {
                res.clearCookie('name', { path: '/' });
                res.cookie('name', user.name)
                return res.redirect('back');
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })

    })
    //    let user = userModel.findById(req.user.id)
    //         user.name = req.body.name
    //         user.email = req.body.email
    //         user.username = req.body.username
    //         user.collegeName = req.body.collegeName
    //         user.graduationYear = req.body.graduationYear



    //         user.save();
    //         return res.redirect('back');

})
module.exports=DashboardRoute