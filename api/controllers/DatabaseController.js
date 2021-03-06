/**
 * DatabaseController
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
   * Action blueprints:
   *    `/database/index`
   *    `/database`
   */
  
   index: function (req, res) {  
     var oracle = require('oracle');  
     oracle.connect(sails.config.OracleConfig, function(err, connection) {
      if (err) { console.log("Error connecting to db:", err); return; }
        connection.execute("select systimestamp from dual", [], function(err, results) {
        if (err) { console.log("Error executing query:", err); return; }
          return res.json({results: results[0]});
        connection.close(); // call only when query is finished executing
      });
    });    
  },
  updatetime: function(req, res){
    var oracle = require('oracle');  
     oracle.connect(sails.config.OracleConfig, function(err, connection) {
      if (err) { console.log("Error connecting to db:", err); return; }
      Qs.find().where({id: 6}).exec(function(err,qs){
      if(err){
       return res.json({flash: {typy: error, message: 'Error to find query string!'}})
      }
      connection.setPrefetchRowCount(50);
      connection.execute(qs[0].sqlstring, [], function(err, results) {
          if (err) { console.log("Error executing query:", err); return; }
          return res.json({results: results[0]});
          connection.close(); // call only when query is finished executing
      });
    });      
    }); 
  },
  // dblink_exist :function(req, res){
  //   var oracle = require('oracle');  
  //    oracle.connect(sails.config.OracleConfig, function(err, connection) {
  //     if (err) { console.log("Error connecting to db:", err); return; }
  //     connection.execute("select object_name,status from user_objects where object_type='DATABASE LINK'", [], function(err, results) {
  //         if (err) { console.log("Error executing query:", err); return; }
  //         return res.json({results: results[0]});
  //         connection.close(); // call only when query is finished executing
  //     });
  //   });
  // },

  dblink: function(req, res){
    var oracle = require('oracle');  
     oracle.connect(sails.config.OracleConfig, function(err, connection) {
      if (err) { 
        return res.json({error: {message: 'Error to connected to database!'}});
      }
      connection.execute("select object_name,status from user_objects where object_type='DATABASE LINK'", [], function(err, results) {
          if (err) { 
           return  res.json({error: {message: "Error executing query:"}});
          }
          if (_.isEqual(results[0],{"OBJECT_NAME": "BILL2CRM","STATUS": "VALID"})){
            return res.json({error: {message: "Database link allready existed!"}});
          }else{
            connection.execute("create database link bill2crm connect to sx_sl identified by DW56H1XO using '(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=130.84.1.122)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=bsscrm1)))'", [], function(err, results) {
            if (err) { 
              return res.json({error: {messagse: 'Error to make dblink!'}}); 
            }
            return res.json({success: {message: 'Database link successfully created!'}});                    
            });
          }
          connection.close(); // call only when query is finished executing
      });
    }); 
  },
  test:  function(req,res){
    Qs.find().where({id: 4}).exec(function(err,results){
      if(err){
       return res.json({flash: {typy: error, message: 'Error to find query string!'}})
      }
      console.log(results[0].sqlstring);
      return res.json({results: results});
    });
  },
  run:  function(req, res){
    var oracle = require('oracle');  
     oracle.connect(sails.config.OracleConfig, function(err, connection) {
      if (err) { console.log("Error connecting to db:", err); return; }
      Qs.find().where({id: req.param('id')}).exec(function(err,qs){
      if(err){
       return res.json({flash: {typy: error, message: 'Error to find query string!'}})
      }
      connection.execute(qs[0].sqlstring, [], function(err, results) {
          if (err) { console.log("Error executing query:", err); return; }
          return res.json({results: results[0]});
          connection.close(); // call only when query is finished executing
      });
    });      
    });
  },
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DatabaseController)
   */
  _config: {}

  
};
