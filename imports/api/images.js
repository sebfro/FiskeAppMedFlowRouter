/**
 * Created by sebastian on 10.05.17.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const createThumb = function(fileObj, readStream, writeStream){
    gm(readStream, fileObj.name()).resize('256', '256').stream().pipe(writeStream);
};

export const createMedium = function (fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('800', '800').stream().pipe(writeStream);
};

Images = new FS.Collection("images", {
    stores: [
        new FS.Store.GridFS("thumbs", { transformWrite: createThumb }),
        new FS.Store.GridFS("medium", { transformWrite: createMedium })
    ]
});

