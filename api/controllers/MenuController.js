/**
 * MenuController
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
   *    `/menu/index`
   *    `/menu`
   */
   index: function (req, res) {
    
    // Send a JSON response
    Menu.find().exec(function(err, menulist) {
      return res.view({menulist: menulist});
    });
    
  },
  show: function(req, res) {
    Menu.find().exec(function(err, menulist) {
      return res.view({menulist: menulist});
    });
  },

  /**
   * Action blueprints:
   *    `/menu/create`
   */
   create: function (req, res) {
    
    // Send a JSON response
    Menu.create(req.body.menu, function(err, model) {
      if(err) return res.json({ err: err }, 500);
      res.redirect('/menu');
    });
  },


  /**
   * Action blueprints:
   *    `/menu/update`
   */
   update: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/menu/delete`
   */
   delete: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MenuController)
   */
  _config: {}

  
};
