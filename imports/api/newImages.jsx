import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { UploadFS } from 'meteor/jalik:ufs';

export const Images = new Mongo.Collection('images');
export const Thumbs = new Mongo.Collection('thumbs');

if(Meteor.isServer){
    Meteor.publish('thumbs', function(id){
        return Thumbs.find({
            originalStore: 'images',
            originalId: {
                $in: id
            }
        });
    });

    Meteor.publish('images', function () {
        return Images.find({});
    })
}

function loggedIn(userId){
    return !!userId;
}

export const ThumbStore = new UploadFS.store.GridFS({
    collection: Thumbs,
    name: 'thumbs',
    permissions: new UploadFS.StorePermissions({
        insert: loggedIn,
        update: loggedIn,
        remove: loggedIn
    }),
    transformWrite(from, to, fileId, file){
        //resize to 32x32
        const gm = require('gm');

        gm(from, file.name)
            .resize(32, 32)
            .gravity('Center')
            .extent(32, 32)
            .quality(75)
            .stream()
            .pipe(to);
    }
});

export const ImagesStore = new UploadFS.store.GridFS({
    collection: Images,
    name: 'images',
    permissions: new UploadFS.StorePermissions({
        insert: loggedIn,
        update: loggedIn,
        remove: loggedIn
    }),
    filter: new UploadFS.Filter({
        contentTypes: ['image/*']
    }),
    copyTo: [
        ThumbStore
    ]
});

Meteor.methods({
    'images.upload'(file) {
        console.log("uload funksjon");
        const photo = {
            name: file.name,
            type: file.type,
            size: file.size
        };

        const upload = new UploadFS.Uploader({
            data: file,
            file: photo,
            store: ImagesStore,
            onError: () => {
                console.log('error');
            },
            onComplete: console.log('Completed'),
        });

        upload.start();
    }
});