# jsDiff2Mongo

Meteor package that compares two objects with the same _id in a before and after state and returns a corresponding mongo update query.

## Why this package ?

Sometimes it's practical to get an object from the database, modify the object and updating the database directly with the modified object.
However on the client, minimongo doesn't allow to do that since collections on the client could be filtered through publications. Hence minimongo update operation only allow to field modifications, not objects replacement.

This package solves this problem by building the appropriate update operation to go from oldObject to newObject.

## Installation

meteor add vjau:jsdiff2mongo

## Usage

The package exports a single function jsDiff2mongo(oldObject, newObject)

Let say you have an object from minimongo

	var oldObj = Coll.findOne({});
	console.log(oldObj);
	// {_id:"xyz123", a:1}
Now you do some modifications

	var newObj = _.clone(oldObj);
	newObj.b = 2;

And call the comparison function

	var diff = jsDiff2Mongo(oldObj, newObj);
	console.log(diff);
	//[{_id:"xyz123"},{"$set":{b:2}}]

You get an array which you can apply to minimongo with

	Mongo.Collection.prototype.update.apply(diff);

0r you can use the helper package vjau:mongo-extend which does all that for you