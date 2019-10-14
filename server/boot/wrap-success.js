'use strict';
module.exports = function(app) {
  var remotes = app.remotes();

  remotes.after('**', function(ctx, next) {
    ctx.result = {
      code: 200,
      data: ctx.result,
      status: 'success'
    };
    next();
  });
};
