const AuthenticationController = require('./controllers/authentication');
const UserController = require('./controllers/user');
const ChatController = require('./controllers/chat');
const express = require('express');
const passport = require('passport');
const ROLE_MEMBER = require('./constants').ROLE_MEMBER;

const passportService = require('./config/passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router(),
    chatRoutes = express.Router(),
    payRoutes = express.Router(),
    communicationRoutes = express.Router();

  //= ========================
  // Auth Routes
  //= ========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  // Updated logged_in boolean
  authRoutes.put('/logout', AuthenticationController.logout);

  // Password reset request route (generate/send token)
  authRoutes.post('/forgot-password', AuthenticationController.forgotPassword);

  // Password reset route (change password using token)
  authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);

  //= ========================
  // User Routes
  //= ========================

  // Set user routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/see', userRoutes);

  // Update user profile route
  userRoutes.put('/update', requireAuth, UserController.updateProfile);

  // Update user looks route
  userRoutes.put('/update-looks', requireAuth, UserController.addLook);

  // Delete user looks route
  userRoutes.put('/delete-look', UserController.deleteLook);


  // View user profile route
  apiRoutes.get('/:uid', requireAuth, UserController.viewProfile);

  // Find all users route
  apiRoutes.put('/all-users', requireAuth, UserController.findAllUsers);

  // PUT route to add users being liked to logged in user and getting-liked user
  apiRoutes.put('/liking', requireAuth, UserController.likingUser);

  // PUT route to add users being liked to logged in user and getting-liked user
  apiRoutes.put('/disliking', requireAuth, UserController.dislikingUser);

  // Populate matches
  apiRoutes.post('/matches', requireAuth, UserController.populateMatches);

  // Test protected route
  apiRoutes.get('/protected', requireAuth, (req, res) => {
    res.send({ content: 'The protected test route is functional!' });
  });

  apiRoutes.get('/admins-only', requireAuth, AuthenticationController.roleAuthorization(ROLE_MEMBER), (req, res) => {
    res.send({ content: 'Admin dashboard is working.' });
  });

  //= ========================
  // Chat Routes
  //= ========================
  // Find all users route
  apiRoutes.put('/update-socket', requireAuth, ChatController.updateSocketId);

  apiRoutes.put('/create-message', requireAuth, ChatController.createMessage);

  apiRoutes.post('/get-messages', requireAuth, ChatController.getMessages);
  
  
  // Set url for API group routes
  app.use('/api', apiRoutes);
};
