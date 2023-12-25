var express = require('express');
var router = express.Router();

const VenueModel = require('../app_api/models/venue')

// ./venues -> GET
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Yeni kayıt eklemek için kullandığım endpoint
// ./venues/addvenue -> POST
router.post('/addvenue',async (request,response) => {
  const venue = new VenueModel(request.body)
  try {
    await venue.save()
    response.send(venue)
  }
  catch(error) {
    response.status(500).send(error)
  }
})

module.exports = router;
