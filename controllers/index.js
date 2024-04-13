const router = require('express').Router();

// Import and use the routes defined in other files
const homeRoutes = require('./homeRoutes'); // Do I need .js?
const apiRoutes = require('./api/');
const dashboardRoutes = require('./dashboardRoutes'); // Do I need .js? 

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
