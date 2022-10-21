let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our business model
let business = require('../models/business');

/* GET Route for the business page - READ Operation */
router.get('/', (req, res, next) => {
business.find((err,businessList) => {
    if(err)
    {
        return console.error(err);
    }
    else
    {
      //console.log(businesslist);

      res.render('business/list',{title: 'Business', BusinessList: businessList});
    }
    });
});
 
/* GET Route for displaying Add page - Create Operation */
router.get('/add', (req, res, next) =>{
  res.render('business/add',{title: 'add business'});

});

/* GET Route for processing Add page - Creating Operation */
router.post('/add', (req, res, next) =>{
let newbusiness = business({
"phone": req.body.phone,
"name": req.body.name,
"email": req.body.email
});
business.create(newbusiness,(err, Business) => {
if(err)
{
  console.log(err);
  res.end(err);
}
else
{
//refresh the business list
res.redirect('/business-list');
}
});
});

/* GET Route for displaying Edit page - Update Operation */
router.get('/edit/:id', (req, res, next) =>{
let id = req.params.id;


business.findById(id, (err, businessToEdit)=>{
if(err)
{
console.log(err);
res.end(err);
}
else
{
//show the edit view
res.render('business/edit' , {title: 'Edit Business', business:businessToEdit});
}
});


});

/* GET Route for processing Edit  page - Updating Operation */

router.post('/edit/:id', (req, res, next) =>{
let id =req.params.id
let updatedbusiness = business({
  "_id":id,
  "phone": req.body.phone,
"name": req.body.name,
"email": req.body.email

});
business.updateOne({id:id}, updatedbusiness, (err) =>{
if(err)
{
console.log(err);
res.end(err);
}
else
{
  //refresh the business list
  res.redirect('/business-list');
}

});
});

/* GET to perfom Deletion - DELETE  Operation */
router.get('/delete/:id', (req, res, next) =>{
  let id = req.params.id;

  book.remove({_id: id}, (err) =>{
if(err)
{
  console.log(err);
  res.end(err);
}
else
{
  //refresh the business list
  res.redirect('/business-list');
}
  });

});





module.exports = router;
