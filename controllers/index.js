const router = require('express').Router();

// Import and use the routes defined in other files
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);

module.exports = router;
