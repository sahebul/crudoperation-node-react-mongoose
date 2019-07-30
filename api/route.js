const express=require('express');
const businessRoutes=express.Router();

let Business = require('./model/business.model');
businessRoutes.route('/add').post(function(req,res){
  let business =new Business(req.body);
  business.save()
  .then(business=>{
    res.status(200).json({'business':'business is added successfully'});
  })
  .catch(err=>{
    res.status(400).send("unable to save to database");
  });
});

businessRoutes.route('/').get(function(req,res){
  Business.find(function(err, businesses){
    if(err){
      console.log(err);
    }else {
      res.json(businesses)
    }
  });
});

businessRoutes.route('/edit/:id').get(function(req,res){
  Business.findById(req.params.id,function(err,businesses){
    if(!businesses){
      res.status(400).sned("data not found");
    }else {
      res.json(businesses);
    }
  })
});

businessRoutes.route('/update/:id').post(function(req,res){
  Business.findById(req.params.id,function(err,business){
      if(!business){
        res.status(400).send("Dtat not Found");
      }else {
        business.person_name=req.body.person_name;
        business.business_name=req.body.business_name;
        business.gst_no=req.body.gst_no;
        business.save().then(business=>{
          res.json("Updated successfully");
        })
        .catch(err=>{
          res.status(400).send("unabale to update data");
        })
      }
  });
});

businessRoutes.route('/delete/:id').get(function(req,res){
  Business.findByIdAndRemove({_id:req.params.id},function(err,business){
    if(err){
      res.json(err)
    }else {
      res.json("Successfully Deleted");
    }
  })
})

module.exports=businessRoutes;
