'use strict';

const { SUCCESS_UPDATE, EVENT_NOT_FOUND } = require('../../constants/errors');
const moment = require('moment');

module.exports = function(Event) {
  Event.findAll = function(
    nodes,
    asset,
    assetGroup,
    begin,
    eventType,
    eventTags,
    uidOps,
    offset,
    limit,
    rootEventId,
    cb
  ) {
    if (asset && assetGroup) {
      cb('asset and assetGroups cannot be defined together', null);
    }
    Event.find({}, (err, events) => {
      cb(null, events);
    });
  };

  Event.updateStatus = function(id, statusName, cb) {
    Event.findOne({ where: { id } }, (err, event) => {
      if (err) {
        cb(err, null);
      } else if (!event) {
        cb({ message: EVENT_NOT_FOUND }, null);
      } else {
        event.updateAttribute('status', statusName, err => {
          cb(err, SUCCESS_UPDATE);
        });
      }
    });
  };

  // Methods Registration Block Start

  // findAll
  Event.remoteMethod('findAll', {
    accepts: [
      {
        arg: 'nodes',
        type: 'object',
        required: true,
        http: { source: 'query' }
      },
      { arg: 'asset', type: 'string', http: { source: 'query' } },
      { arg: 'assetGroup', type: 'string', http: { source: 'query' } },
      { arg: 'begin', type: 'string', http: { source: 'query' } },
      { arg: 'eventType', type: 'string', http: { source: 'query' } },
      { arg: 'eventTags', type: ['string'], http: { source: 'query' } },
      { arg: 'uidOps', type: ['string'], http: { source: 'query' } },
      { arg: 'offset', type: 'number', http: { source: 'query' } },
      { arg: 'limit', type: 'number', http: { source: 'query' } },
      { arg: 'rootEventId', type: 'number', http: { source: 'query' } }
    ],
    http: {
      path: '/',
      verb: 'get'
    },
    returns: { arg: 'greetings', type: 'array', root: true }
  });

  // updateStatus
  Event.remoteMethod('updateStatus', {
    accepts: [
      { arg: 'id', type: 'number', required: true, http: { source: 'path' } },
      {
        arg: 'statusName',
        type: 'string',
        required: true,
        http: { source: 'query' }
      }
    ],
    http: {
      path: '/:id/updateStatus',
      verb: 'get'
    },
    returns: { arg: 'greetings', type: 'string', root: true }
  });
  // Methods Registration Block End
};
