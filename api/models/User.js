/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
	email: {
      type: 'string',
      unique: true,
      required: true
    },
  password: {
      type: 'string',
      required: true,
      minLength: 6
    }
  }  
};
