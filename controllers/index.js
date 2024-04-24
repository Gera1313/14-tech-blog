const router = require('express').Router();

// Import and use the routes defined in other files
const homeRoutes = require('./homeRoutes.js');
const apiRoutes = require('./api/index');
const dashboardRoutes = require('./dashboardRoutes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
