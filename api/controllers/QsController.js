/**
 * QsController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to QsController)
   */
  _config: {},

  index: function(req,res){
  	    Qs.find().exec(function(err, list) {
      return res.view({qlist: list});
    });  	
  },
  create: function(req,res){
      Qs.create(req.body.qs, function(err, model) {
      if(err){
        req.flash('danger','Data unsuccessfully added!'); return;
      }
      req.flash('success','Data successfully added!');
      res.redirect('/qs');
    });
  },
  run:  function(req, res){
    var oracle = require('oracle');  
    oracle.connect(sails.config.OracleConfig, function(err, connection) {
      if (err) { 
        req.flash('danger','Error in connecting to database!'); return;
      }
      Qs.find().where({id: req.param('id')}).exec(function(err,qs){
        if(err){
          req.flash('danger','Error to find query string!'); return;         
        }
        connection.execute(qs[0].sqlstring, [], function(err, results) {
            if (err) { req.flash('danger','Error to executing query!'); return; }
            return res.json({results: results});
            connection.close(); // call only when query is finished executing
        });
      });      
    });
  },
  delete: function(req,res){
    Qs.destroy().where({id: req.param('id')}).exec(function(err, list) {
      if(err) {
        req.flash('danger','Error to  delete!'); return;
      }
      req.flash('success','Successfully deleted!');
      res.redirect('/qs');
    }); 
  }

  
};
