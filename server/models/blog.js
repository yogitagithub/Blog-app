const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is require"],
    },
    audience: {
        type: String,
        required: [true, "audience is require"],
      },
      frequency: {
        type: String,
        required: [true, "frequency is require"],
      },
      author: {
        type: String,
        required: [true, "author is require"],
      },
      date: {
        type: Date,
        required: [true, "date is require"],
      },
   
  },
  { timestamps: true }
);

const blogModel = mongoose.model("CreatedBlog", blogSchema);

module.exports = blogModel;