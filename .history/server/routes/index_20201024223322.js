/* index.js created by Carlos Cruz-Claro 0N 2020-10-11
#300-902-439 */
let express = require('express');
let router = express.Router();

//Create a reference to index located in controllers folder
let indexController = require('../controllers/index')

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET About Me page. */
router.get('/aboutme', indexController.displayAboutMePage);

/* GET Contact me page. */
router.get('/contactme', indexController.displayContactMePage);

/* GET auth page. */
router.get('/authenticate', indexController.displayAuthPage);

module.exports = router;
