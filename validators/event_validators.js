'use strict';

const { ASSET_GROUP_ERROR, DATE_NOT_VALID } = require('../constants/errors');
const moment = require('moment');

function getWhereObjectForEvents(argumentsArray) {
  const result = {
    where: {},
    limit: 100,
    offset: 0,
    status: true,
    errorMessage: ''
  };
  const argumentsKey = [
    'nodes',
    'asset',
    'assetGroup',
    'begin',
    'end',
    'eventType',
    'eventTags',
    'uidOps',
    'offset',
    'limit',
    'rootEventId'
  ];
  const format = 'YYYY-MM-DD';
  const argumentsMap = argumentsKey.reduce((obj, key, index) => {
    obj[key] = argumentsArray[index];
    return obj;
  }, {});
  result.limit = parseInt(argumentsMap.limit) || result.limit;
  result.offset = parseInt(argumentsMap.offset) || result.offset;
  if (argumentsMap.begin && !moment(argumentsMap.begin).isValid()) {
    result.status = false;
    result.errorMessage = `begin ${DATE_NOT_VALID}`;
  } else if (argumentsMap.end && !moment(argumentsMap.end).isValid()) {
    result.status = false;
    result.errorMessage = `end ${DATE_NOT_VALID}`;
  } else if (argumentsMap.asset && argumentsMap.assetGroup) {
    result.status = false;
    result.errorMessage = ASSET_GROUP_ERROR;
  } else {
    if (argumentsMap.nodes) {
      result.where.nodes = argumentsMap.nodes;
    }
    if (argumentsMap.asset) {
      result.where.asset = argumentsMap.asset;
    }
    if (argumentsMap.assetGroup) {
      result.where.asset_group = argumentsMap.assetGroup;
    }
    if (argumentsMap.eventType) {
      result.where.event_type = argumentsMap.eventType;
    }
    if (argumentsMap.eventTags) {
      result.where.event_tags = argumentsMap.eventTags;
    }
    if (argumentsMap.rootEventId) {
      result.where.root_event_id = argumentsMap.rootEventId;
    }

    argumentsMap.begin =
      argumentsMap.begin ||
      moment()
        .subtract(3, 'days')
        .format(format);
    result.where.begin = { gt: argumentsMap.begin };
    argumentsMap.end = argumentsMap.end || moment().format(format);
    result.where.end = { gt: argumentsMap.end };
  }
  return result;
}

module.exports = {
  getWhereObjectForEvents
};
