/**
 * UserController
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
   * (specific to UserController)
   */
  _config: {},

  create: function(req, res) {
    User.create(req.body.user, function(err, model) {
      if(err) return res.json({ err: err }, 500);
      res.redirect('/login');
    });
  },

  destroy: function(req, res) {

  },

  signup: function(req,res){
    return res.view({
      layout: "different_layout"
    });
  },
  signin:function(req, res){
    return res.view({
      layout: "different_layout"
    });
  },
  login: function(req,res){
    var bcrypt = require('bcrypt');

    User.findOneByEmail(req.body.user.email).done(function (err, user) {
      if (err) res.json({ error: 'DB error' }, 500);

      if (user) {
        bcrypt.compare(req.body.user.password, user.password, function (err, match) {
          if (err) res.json({ error: 'Server error' }, 500);

          if (match) {
            // password match
            req.session.user = user.id;
            req.session.authenticated = true;
            res.redirect('/welcome');
          } else {
            // invalid password
            if (req.session.user) req.session.user = null;
            res.json({ error: 'Invalid password' }, 400);
          }
        });
      } else {
        res.json({ error: 'User not found' }, 404);
      }
    });
  },

  logout: function(req,res){
    req.session.authenticated = false;
    req.session.user = null;
    res.redirect('/');
  },

  index: function(req,res){
    var md5 = require('MD5');   
    var userlists = [] ;
    var page_size =  6;
     User.find().paginate({page: req.param('page'|| 1), limit: page_size}).done(function(err,users){
      if (err) res.json({ error: 'DB error' }, 500);
      if (users){
        _.each(users,function(user){
          var email = _.first(_.values(_.pick(user,'email'))).toString(); 
          userlists.push(_.extend(user, {emailHash: md5(email)}));
        })
        return res.view({users: userlists});
      }else{
        res.json({ error: 'User not found' }, 404);
      }
    });
  }

};
 function emialHash(email){
  
 }