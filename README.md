# Social Network API
Social Network API is an API for social network web application, created to manage users, their profiles, posts, likes, comments, etc. The API is built using Node.js and Express.js.  

# API Documentation
https://documenter.getpostman.com/view/18219208/UVsFxo7m

# How To Run
- Git clone repository
- Create your own .env file that should contain:
  - PORT = <YOUR_PORT>
  - MONGO_URI = <YOUR_MONGO_URI>
  - JWT_SECRET = <YOUR_JWT_SECRET>
- Run these commands in terminal/shell:
  -  npm install
  -  npm start

# Project Architecture
```    
└───config
    │   db.js
└───controllers
    │   postController.js
    │   profileController.js
    │   userController.js
└───middleware
    │   authMiddleware.js
    │   errorMiddleware.js
└───models
    │   postModel.js
    │   profileModel.js
    │   userModel.js
└───node_modules
└───routes
    │   postRoutes.js
    │   profileRoutes.js
    │   userRoutes.js
└───validators
    │   loginValidator.js
    │   registerValidator.js
│   .gitignore     
│   package-lock.json 
│   package.json 
│   server.js
```

