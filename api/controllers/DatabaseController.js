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
      connection.execute("SELECT systimestamp FROM dual", [], function(err, results) {
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
      connection.execute("select * from sync_bill2bcv_t", [], function(err, results) {
          if (err) { console.log("Error executing query:", err); return; }
          return res.json({results: results[0]});
          connection.close(); // call only when query is finished executing
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
            return res.json({results: results[0]});                    
            });
          }
          connection.close(); // call only when query is finished executing
      });
    }); 
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DatabaseController)
   */
  _config: {}

  
};
