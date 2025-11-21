const userModel = require("../models/userModels");
const projectModel = require("../models/projectModels");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { get } = require("mongoose");
const e = require("express");
const JWT_SECRET = "secretkey";

function getStartUpCode(language) {
  if (language.toLowerCase() === "javascript") {
    return `console.log('Hello, World!');`;
  } else if (language.toLowerCase() === "python") {
    return `print('Hello, World!')`;
  } else if (language.toLowerCase() === "java") {
    return `public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }`;
  } else if (language.toLowerCase() === "c++") {
    return `#include <iostream>
    int main() {
        std::cout << "Hello, World!" << std::endl;
        return 0;
    }`;
  } else if (language.toLowerCase() === "ruby") {
    return `puts 'Hello, World!'`;
  } else if (language.toLowerCase() === "go") {
    return `package main
    import "fmt"
    func main() {
        fmt.Println("Hello, World!")
    }`;
  } else if (language.toLowerCase() === "php") {
    return `<?php
    echo "Hello, World!";
    ?>`;
  } else if (language.toLowerCase() === "c#") {
    return `using System;
    class HelloWorld {
        static void Main() {
            Console.WriteLine("Hello, World!");
        }
    }`;
  } else if (language.toLowerCase() === "typescript") {
    return `console.log('Hello, World!');`;
  } else {
    return `language not supported  `;
  }
}
//signuproute
exports.signup = async (req, res) => {
  try {
    let { email, password, fullName } = req.body;
    let emailConfirm = await userModel.findOne({ email: email });
    if (emailConfirm) {
      return res.status(400).json({
        success: false,
        msg: "email already exists",
      });
    }

    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let user = await userModel.create({
          email: email,
          password: hash,
          fullName: fullName,
        });
        return res.status(200).json({
          success: true,
          msg: "user created successfully",
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

//login route
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "user not found",
      });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(500).json({
          success: false,
          msg: err.message || "bcrypt error",
        });
      }
      if (result) {
        let token = jwt.sign({ userId: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.status(200).json({
          success: true,
          msg: " user login successfully",
          token: token,
        });
      } else {
        return res.status(404).json({
          success: false,
          msg: "invalid credentials",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

//create project route
exports.createProject = async (req, res) => {
  try {
    let { name, projectLanguage, token } = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);
    let user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "user not found",
      });
    }
    let project = await projectModel.create({
      name: name,
      projectLanguage: projectLanguage,
      createdBy: user._id,
      code: getStartUpCode(projectLanguage),
    });
    return res.status(200).json({
      success: true,
      msg: "project created successfully",
      projectId: project._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

//save project route
exports.saveProject = async (req, res) => {
  try {
    let { projectId, code, token } = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);
    let user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    let project = await projectModel.findById(projectId);
    project.code = code;
    await project.save();
    return res.status(200).json({
      success: true,
      message: "Project saved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//get projects route
exports.getProjects = async (req, res) => {
  try {
    let { token } = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);
    let user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "user not found",
      });
    }
    let projects = await projectModel.find({ createdBy: user._id });
    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      projects: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//get single project route
exports.getProject = async (req, res) => {
  try {
    let { token, projectId } = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);
    let user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "user not found",
      });
    }
    let project = await projectModel.findOne({ _id: projectId });
    if (project) {
      return res.status(200).json({
        success: true,
        message: "Project  found",
        project: project,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete project route
exports.deleteProject = async (req, res) => {
  try {
    let { token, projectId } = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);
    let user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "user not found",
      });
    }

    let project = await projectModel.findOneAndDelete({ _id: projectId });
    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//updateproject route
exports.editProject = async (req, res) => {
  try {
    let { projectId, token, name, projectLanguage } = req.body;

    // Verify token
    let decoded = jwt.verify(token, JWT_SECRET);

    // Find user
    let user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User not found",
      });
    }

    // Find project
    let project = await projectModel.findOne({ _id: projectId, createdBy: user._id.toString()  });
    if (!project) {
      console.log("Project not found for the given user.");
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Update fields only if provided
    project.name = name || project.name;
    project.projectLanguage = projectLanguage || project.projectLanguage;

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });

  } catch (error) {
    console.error("Error updating project:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

