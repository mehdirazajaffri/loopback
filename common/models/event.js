'use strict';

const { SUCCESS_UPDATE, EVENT_NOT_FOUND } = require('../../constants/errors');
const {
  getWhereObjectForEvents
} = require('../../validators/event_validators');
const server = require('../../server/server');
const procedures = require('./events_procedures')(server);

module.exports = function(Event) {
  Event.findAll = function() {
    const cb = arguments[arguments.length - 1];
    const filterParams = getWhereObjectForEvents(arguments);
    if (filterParams.status) {
      procedures.findAllEvents(filterParams, cb);
    } else {
      cb({ message: filterParams.errorMessage }, null);
    }
  };

  Event.findEventById = function(id, cb) {
    procedures.getEventById(id, cb);
  };

  Event.updateStatus = function(id, statusName, cb) {
    procedures.updateStatusOfEvent(id, statusName, cb);
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
      { arg: 'end', type: 'string', http: { source: 'query' } },
      { arg: 'eventType', type: 'string', http: { source: 'query' } },
      { arg: 'eventTags', type: ['string'], http: { source: 'query' } },
      { arg: 'uidOps', type: ['string'], http: { source: 'query' } },
      { arg: 'offset', type: 'number', http: { source: 'query' } },
      { arg: 'limit', type: 'number', default: 100, http: { source: 'query' } },
      { arg: 'rootEventId', type: 'number', http: { source: 'query' } }
    ],
    http: {
      path: '/',
      verb: 'get'
    },
    returns: { arg: 'greetings', type: 'array', root: true }
  });

  // findById
  Event.remoteMethod('findEventById', {
    accepts: [
      { arg: 'id', type: 'number', required: true, http: { source: 'path' } }
    ],
    http: {
      path: '/:id',
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
      verb: 'post'
    },
    returns: { arg: 'greetings', type: 'string', root: true }
  });
  // Methods Registration Block End
};
