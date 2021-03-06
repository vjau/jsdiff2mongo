Package.describe({
  name: 'vjau:jsdiff2mongo',
  summary: ' Compares two objects and returns a diff with a mongo update query ',
  version: '1.0.3',
  git: ' https://github.com/vjau/jsdiff2mongo '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.use('underscore');
  api.addFiles('jsdiff2mongo.js');
  api.export('jsDiff2Mongo');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('vjau:jsdiff2mongo');
  api.use('ejson');
  api.addFiles('jsdiff2mongo-tests.js');
});
