'use strict';

// This auto-update script is needed for postgres specially as connector does not update the changes automatically due to some issue.
const async = require('async');
module.exports = function(app, cb) {
  var datasources = Object.keys(app.dataSources);
  async.eachSeries(
    datasources,
    function(dsName, cb) {
      var ds = app.dataSources[dsName];
      ds.isActual(function(err, actual) {
        if (err) return cb(err);
        if (actual) {
          console.log('datasource', dsName, 'is up to date');
          return cb();
        }
        ds.autoupdate(function(err) {
          if (err) return cb(err);
          console.log('datasource', dsName, 'updated');
          cb();
        });
      });
    },
    cb
  );
};
