/* global _, jsDiff2Mongo:true */
//var instance;
jsDiff2Mongo = function(objBefore, objAfter){
    "use strict";
    if (!objBefore  || !objAfter || !objBefore._id || !objAfter._id){
        throw new Error("un ou plusieurs des objets à comparer n'ont pas d'id");
    }

    //if (!objBefore && !objAfter){
    //    throw new Error("vous devez fournir au moins un objet en after");
    //}

    //if (!objBefore && !objAfter._id){
    //    throw new Error("pour insérer un objet, il doit avoir un _id");
    //}


    //console.log("objBefore", objBefore);
    //console.log("objAfter", objAfter);


    var akeys = Object.keys(objBefore);
    var bkeys = Object.keys(objAfter);

    akeys = _.without(akeys, "_id");
    bkeys = _.without(bkeys, "_id");

    var keysToUnset = _.difference(akeys, bkeys);
    var keysToSet = _.difference(bkeys, akeys);
    var keysInBoth = _.intersection(akeys, bkeys);


    var unsetCommandObj = {};
    keysToUnset.map(function(key){
        unsetCommandObj[key] = "";
    });

    var setCommandObj = {};
    keysToSet.map(function(key){
        setCommandObj[key] = objAfter[key];
    });

    var modifiedKeys = [];
    keysInBoth.map(function(key){
        if ( !_.isEqual(objBefore[key], objAfter[key])){
            modifiedKeys.push(key);
        }
    });

    modifiedKeys.map(function(key){
        setCommandObj[key]= objAfter[key];
    });

    var selector = {_id: objAfter._id};
    var updateObj =  {};
    if (Object.keys(unsetCommandObj).length>0){
        updateObj.$unset = unsetCommandObj;
    }
    if (Object.keys(setCommandObj).length>0){
        updateObj.$set = setCommandObj;
    }



    //le résultat est sous forme de tableau, à utiliser avec apply et UPDATE
    var mongoArr;
    if (updateObj && Object.keys(updateObj).length>0){
        mongoArr = [selector, updateObj];
    } else {
        mongoArr = [];
    }









return mongoArr;

};


