

Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

if(Meteor.isServer){
    Images.allow({
        insert : function(){
            return true;
        }
    })
}