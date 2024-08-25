const express = require('express');
const blogModel = require('../models/blog');
const router = express.Router();

const jwt = require('jsonwebtoken');



// create blog
    router.post('/create-blog', async (req, res) => {
        try {
            const { title, description, audience, frequency, author, date } = req.body;
            if (!title || !description || !audience || !frequency || !author || !date) {
                return res.status(400).send({
                  success: false,
                  message: "Please Provide ALl Fields",
                });
              }
              const newBlog = new blogModel({ title, description, audience, frequency, author, date });
              await newBlog.save();

              return res.status(201).send({
                success: true,
                message: "Blog Created!",
                newBlog,
              });
           
        }
    
        catch (error) {
            console.log(error);
            return res.status(400).send({
              success: false,
              message: "Error WHile Creting blog",
              error,
            });
        }
    });
    

// get all blogs
    router.get('/getAll-blog', async (req, res) => {
      try {
        const blogs = await blogModel.find({});
        if (!blogs) {
          return res.status(200).send({
            success: false,
            message: "No Blogs Found",
          });
        }
        return res.status(200).send({
          success: true,
          BlogCount: blogs.length,
          message: "All Blogs lists",
          blogs,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Error WHile Getting Blogs",
          error,
        });
      }
    });


// get a blog by Id blog
    router.get('/getById-blog/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
          return res.status(404).send({
            success: false,
            message: "blog not found with this is",
          });
        }
        return res.status(200).send({
          success: true,
          message: "fetch single blog",
          blog,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "error while getting single blog",
          error,
        });
      }
    });


// update blog
    router.put('/update-blog/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const { title, description, audience, frequency, author, date } = req.body;
        const blog = await blogModel.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        );
        return res.status(200).send({
          success: true,
          message: "Blog Updated!",
          blog,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Error WHile Updating Blog",
          error,
        });
      }
    });

// delete blog
    router.delete('/delete-blog/:id', async (req, res) => {
      try {
        await blogModel .findByIdAndDelete(req.params.id);
         
          return res.status(200).send({
            success: true,
            message: "Blog Deleted!",
          });
          
       
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Erorr WHile Deleteing BLog",
          error,
        });
      }
    });
   
module.exports = router;