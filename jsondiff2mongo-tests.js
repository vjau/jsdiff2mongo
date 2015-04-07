// Write your tests here!
// Here is an example.
Tinytest.add("les opérations de base fonctionnent", function (test) {
  //JSDiff2Mongo({_id:"axz1", a:1,b:2,c:3, d:4, e:5}, {_id:"axz1", c:3, d:5, e:5, f:6});
  var result = JSDiff2Mongo({_id:"axz1", a:1,b:2,c:3, d:4}, {_id:"axz1", a:1,b:2,c:3});
  test.equal(result, [{"_id":"axz1"},{"$unset":{"d":""}}], "les keys supprimées doivent l'être");

  result = JSDiff2Mongo({_id:"axz1", a:1,b:2,c:3, d:4}, {_id:"axz1", a:1,b:2,c:3, d:5});
  test.equal(result, [{"_id":"axz1"},{"$set":{"d":5}}], "les keys modifiées doivent l'être");

  result = JSDiff2Mongo(null, {_id:"axz1", a:1,b:2,c:3, d:5});
  test.equal(result, [{"_id":"axz1"},{"$set":{"a":1, "b":2, "c":3, "d":5}}], "les objets nouveaux doivent être ajoutés");

  result = JSDiff2Mongo({_id:"axz1", a:1,b:2,c:3, d:4}, {_id:"axz1", a:1,b:2,c:3, d:4});
  test.equal(result, [], "les objets identiques doivent renvoyer un tableau vide");
});

Tinytest.add("les objets sans _id doivent thrower", function(test){
  "use strict";
   test.throws(function(){
     JSDiff2Mongo({a:1,b:2}, {a:1,b:2});
   });
});
