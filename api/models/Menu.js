/**
 * Menu
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
     level: {
          type: 'integer',
      required: true
    },
    parent: {
          type: 'integer',
      required: true
    },
     title: {
          type: 'string',
      required: true
    },
      icon: 'string',
      path: {
          type: 'string',
      required: true
    },
  }

};
