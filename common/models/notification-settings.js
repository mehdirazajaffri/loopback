'use strict';
const {
  PREFRENCES_UPDATED,
  RECORD_NOT_FOUND
} = require('../../constants/errors');

module.exports = function(Notificationsettings) {
  Notificationsettings.validatesInclusionOf('chain_action', {
    in: ['web', 'email', 'telegram']
  });

  Notificationsettings.updateSettings = function(userId, channel, cb) {
    Notificationsettings.updateAll(
      { customuserid: userId },
      { channel },
      function(err, results) {
        if (!err && !results.count) {
          err = { message: RECORD_NOT_FOUND };
        }
        return cb(err, PREFRENCES_UPDATED);
      }
    );
  };

  Notificationsettings.findAll = function(userId, cb) {
    Notificationsettings.find(
      { where: { customuserid: userId } },
      (err, notifications) => {
        cb(err, notifications);
      }
    );
  };

  // Methods Registration Block Start
  // updateSettings
  Notificationsettings.remoteMethod('updateSettings', {
    accepts: [
      {
        arg: 'userId',
        type: 'number',
        required: true,
        http: { source: 'path' }
      },
      {
        arg: 'channel',
        type: 'string',
        required: true,
        http: { source: 'path' }
      }
    ],
    http: {
      path: '/:userId/updateSettings/:channel',
      verb: 'post'
    },
    returns: { arg: 'greetings', type: 'array', root: true }
  });

  // findAll
  Notificationsettings.remoteMethod('findAll', {
    accepts: [
      {
        arg: 'userId',
        type: 'number',
        required: true,
        http: { source: 'path' }
      }
    ],
    http: {
      path: '/:userId',
      verb: 'get'
    },
    returns: { arg: 'greetings', type: 'array', root: true }
  });
  // Methods Registration Block End
};
