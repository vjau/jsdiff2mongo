# jsDiff2Mongo

Meteor package that compares two objects with the same _id in a before and after state and returns a corresponding mongo update query.

## Why this package ?

Sometimes it's practical to get an object from the database, modify the object and put it back directly in the database.
However minimongo doesn't allow to do that since collections on the client could be filtered through publications, hence minimongo update operation only allow fields modifications, not objects replacement.

This package solves this problem by building the appropriate update query to go from oldObject to newObject.

## Installation

meteor add vjau:jsdiff2mongo

## Usage

The package exports a single function jsDiff2mongo(oldObject, newObject)

Let say you have an object from minimongo

```js
var oldObj = Coll.findOne({});
console.log(oldObj);
// {_id:"xyz123", a:1}
```

Now you do some modifications

```js
var newObj = _.clone(oldObj);
newObj.b = 2;
```

And call the comparison function

```js
var diff = jsDiff2Mongo(oldObj, newObj);
console.log(diff);
//[{_id:"xyz123"},{"$set":{b:2}}]
```

You get an array which you can apply to minimongo with

```js
Mongo.Collection.prototype.update.apply(diff);
```


0r you can use the helper package vjau:mongo-extend which does all that for you

## Limitations

Methods are ignored (not serializable by Mongo)

Arrays with variations are replaced in place instead of complicated addtoset queries
