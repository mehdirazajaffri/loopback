// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  const baseUrl = server.get('restApiRoot');
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());

  // router.get(`${baseUrl}/events`,async (req, res) => {
  //   server.models.NotificationSettings.find({}, (err, notifications) => {
  //     console.log(notifications);
  //     res.send({status: true, notifications});
  //   });
  // });

  // router.get(`${baseUrl}/events/:event_id`,async (req, res) => {
  //   server.models.NotificationSettings.find({}, (err, notifications) => {
  //     console.log(notifications);
  //     res.send({status: true, notifications});
  //   });
  // });

  // router.get(`${baseUrl}/notifications/:user_id`,async (req, res) => {
  //   server.models.NotificationSettings.find({}, (err, notifications) => {
  //     console.log(notifications);
  //     res.send({status: true, notifications});
  //   });
  // });

  // router.get(`${baseUrl}/notifications/:user_id`,async (req, res) => {
  //   server.models.NotificationSettings.find({}, (err, notifications) => {
  //     console.log(notifications);
  //     res.send({status: true, notifications});
  //   });
  // });

  // router.get(`${baseUrl}/notifications/:user_id`,async (req, res) => {
  //   server.models.NotificationSettings.find({}, (err, notifications) => {
  //     console.log(notifications);
  //     res.send({status: true, notifications});
  //   });
  // });
  server.use(router);
};
