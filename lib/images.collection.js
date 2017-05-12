/**
 * Created by sebastian on 12.05.17.
 */
this.Images = new Meteor.Files({
    debug: true,
    collectionName: 'Images',
    allowClientCode: true, // Disallow remove files from client if false.
    onBeforeUpload: function(file) {
        //Allow upload under 10MB, and only png/jpg/jpeg formats
        if(file.size <= 1024*1024*10 && /png|jpg|jpeg/i.test(file.extension)){
            return true;
        } else {
            return 'Please upload image, with size equal or less than 10MB';
        }
    }
});

if(Meteor.isServer){
    Images.denyClient();
    Meteor.publish('files.images.all', function(){
        return Images.find().cursor;
    });

} else {
    Meteor.subscribe('files.images.all');
}