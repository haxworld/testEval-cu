const express = require('express');
const userModel = require('../models/userModel');
const fs = require('fs')
const path = require('path')
const DashboardRoute = express.Router();

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
        let user = await userModel.findOne({ _id: req.user.id });
        const { name, email, username, photo, collegeName, graduationYear, createdAt } = user;
        const data = {
            title: 'Dashboard',
            name,
            email,
            username,
            photo,
            collegeName,
            graduationYear,
            createdAt,
        }
        return res.render('admin/user_dashboard', { data });
    })

DashboardRoute.get('/edit-profile',async(req,res)=>{
    let user = await userModel.findOne({ _id: req.user.id });
    
    let data = {
        title:'Edit Profile',
        user:user
    }
    return res.render('admin/editProfile',{data});
})

DashboardRoute.post('/edit-profile/update/:id',async(req,res)=>{
    if(req.user.id==req.params.id)
    {
        try {
           let user = await userModel.findById(req.params.id)
            userModel.uploadedAvatar(req,res,(err)=>{
                if(err)
                {
                    console.log("Multer error");
                    return;
                }
                user.name = req.body.name
                user.email = req.body.email
                console.log(req.file)
                if(req.file)
                {
                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }

                user.save();
                return res.redirect('back');
            })    
        } catch (error) {
            

            return res.redirect('back');
        }
    }

    else
    {
        
        return res.status(401).send('Unauthorized');
    }
       
})
module.exports = DashboardRoute