var livereload = require('gulp-livereload'),
    q = require('q');

module.exports = function(port) {
    var server = livereload(port);

    return q.when(function notify(file) {
      server.changed(file.path);
    });
};
