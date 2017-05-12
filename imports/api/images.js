import { FilesCollection } from 'meteor/ostrio:files';

export const Images = new FilesCollection({
    collectionName: 'Images',
    allowClientCode: true, // Allow or disallow remove files from client
    onBeforeUpload: function (file) {
        // Allow upload files under  10 MB, and only in png/jpg/jpeg formats
        if(files.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)){
            return true;
        } else {
            return 'Please upload image, with size equal or less than 10MB';
        }
    }
});

if(Meteor.isClient){
    Meteor.subscribe('files.images.all');
}

if(Meteor.isServer){
    Meteor.publish('files.images.all', function(){
        return Images.find().cursor;
    });
}

Meteor.methods({
    'file-upload'(fileInfo, fileData){
        console.log("received file " + fileInfo.name + " data: " + fileData);
        FS.writeFile(fileInfo.name, fileData);
    }

});