Package.describe({
  name: 'vjau:jsondiff2mongo',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.use('underscore');
  api.addFiles('vjau:jsondiff2mongo.js');
  api.export('jsDiff2Mongo');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('vjau:jsondiff2mongo');
  api.addFiles('vjau:jsondiff2mongo-tests.js');
});
