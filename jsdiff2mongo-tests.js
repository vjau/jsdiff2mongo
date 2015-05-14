Tinytest.add("base operations work", function (test) {
  //JSDiff2Mongo({_id:"axz1", a:1,b:2,c:3, d:4, e:5}, {_id:"axz1", c:3, d:5, e:5, f:6});
  var result = jsDiff2Mongo({_id:"axz1", a:1,b:2,c:3, d:4}, {_id:"axz1", a:1,b:2,c:3});
  test.equal(result, [{"_id":"axz1"},{"$unset":{"d":""}}], "deleted keys must be unset");

  result = jsDiff2Mongo({_id:"axz1", a:1,b:2,c:3, d:4}, {_id:"axz1", a:1,b:2,c:3, d:5});
  test.equal(result, [{"_id":"axz1"},{"$set":{"d":5}}], "modified keys must be set again");

  result = jsDiff2Mongo({_id:"axz1", a:1,b:2,c:3, d:4}, {_id:"axz1", a:1,b:2,c:3, d:4});
  test.equal(result, [], "identical objects must return an empty array");
});

Tinytest.add("objects without _id must throw", function(test){
  "use strict";
   test.throws(function(){
     jsDiff2Mongo({a:1,b:2}, {a:1,b:2});
   });
});

Tinytest.add("advanced operations must work", function(test){
  var result = jsDiff2Mongo({_id:"axz1", a:1, b:[1,2,3]}, {_id:"axz1", a:1, b:[1,2,3, 4]} );
  test.equal(result, [{"_id":"axz1"},{"$set":{"b":[1,2,3,4]}}], "updated array must be replaced in place");
  result = jsDiff2Mongo({_id:"axz1", a:1, b:[1,2,3], c:5}, {_id:"axz1", a:1, b:[1,2,3, 4]});
  test.equal(result, [{"_id":"axz1"},{"$set":{"b":[1,2,3,4]},"$unset":{c:""}}], "multiple operations must work");
});

Tinytest.add("methods must be ignored", function(test){
  var result = jsDiff2Mongo({_id:"axz1", a:1, foo:function(){console.log();}},{_id:"axz1", a:1});
  test.equal(result,[]);
});
