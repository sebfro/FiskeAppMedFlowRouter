/**
 * Created by sebastian on 10.05.17.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';



Images.allow({
    'insert': function(){
        return true;
    },
    'update': function(){
        return true;
    },
    'remove': function(){
        return true;
    },
    download: function(userId, fileObj){

}
});

