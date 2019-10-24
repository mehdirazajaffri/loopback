'use strict';

module.exports = function(server) {
  var remoteDb = server.dataSources.spdb;

  function queryExecutor(query, cb) {
    remoteDb.connector.query(query, function(err, data) {
      console.log(err, data);
      cb(err, data);
    });
  }

  function getEventById(eventId, cb) {
    const query = `SELECT * from notification_engine.sp_get_event(
          ${eventId}
          )`;
    queryExecutor(query, cb);
  }

  function updateStatusOfEvent(eventId, statusName, cb) {
    const query = `SELECT * from notification_engine.sp_update_wk_status(
            ${eventId},
            '${statusName}'
          )`;
    queryExecutor(query, cb);
  }

  function findAllEvents(filterParams, cb) {
    const params = filterParams.where;
    const query = `SELECT * from notification_engine.sp_get_events(
              ${params.nodes && params.nodes.companies},
              ${params.nodes && params.nodes.sites},
              ${params.asset || null},
              ${params.asset_group || null},
              ${params.begin},
              ${params.end},
              ${params.event_type},
              ${params.event_tags},
              ${params.root_event_id},
              ${filterParams.offset},
              ${filterParams.limit}
          )`;
    queryExecutor(query, cb);
  }

  return { getEventById, findAllEvents, updateStatusOfEvent };
};
