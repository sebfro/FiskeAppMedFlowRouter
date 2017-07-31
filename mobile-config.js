//http://connect.facebook.net/en_US/sdk.js

App.accessRule('http://connect.facebook.net/en_US/sdk.js');
App.accessRule('https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAoNnMKlsuYKXO0t5eY6749sRZ4W_QEVBw&callback=GoogleMaps.initialize');
App.accessRule('https://fonts.googleapis.com/css?family=Lato:400,700,400italic');
App.accessRule('https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css');
App.accessRule('https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css');
App.accessRule('https://www.facebook.com/impression.php/f280af25045b648/?api_key=1865081020422422&lid=115&payload=%7B%22source%22%3A%22jssdk%22%7D');
App.accessRule('http://staticxx.facebook.com/connect/xd_arbiter/r/XBwzv5Yrm_1.js?version=42#channel=f385ea4ec249844&origin=http%3A%2F%2Flocalhost%3A12000');
App.accessRule('https://staticxx.facebook.com/connect/xd_arbiter/r/XBwzv5Yrm_1.js?version=42#channel=f358c0a1bc24aa&origin=http%3A%2F%2Flocalhost%3A12000');
App.accessRule('https://staticxx.facebook.com/connect/xd_arbiter/r/XBwzv5Yrm_1.js?version=42#channel=f358c0a1bc24aa&origin=http%3A%2F%2Flocalhost%3A12000');
App.accessRule('https://staticxx.facebook.com/connect/xd_arbiter/r/XBwzv5Yrm_1.js?version=42#channel=f385ea4ec249844&origin=http%3A%2F%2Flocalhost%3A12000');
App.accessRule('https://www.facebook.com/impression.php/f5264b68882f58/?api_key=1865081020422422&lid=115&payload=%7B%22source%22%3A%22jssdk%22%7D');
App.accessRule('//connect.facebook.net/nb_NO/sdk.js#xfbml=1&version=v2.9&appId=1865081020422422');
App.accessRule('https://www.facebook.com/connect/ping:1');
App.accessRule('http://hi-07586.imr.no:3000/');
App.accessRule('http://hi-07586.imr.no:3000/_oauth/facebook?close');
App.accessRule('*');

App.configurePlugin('phonegap-plugin-push',{
    SENDER_ID: 151119787186
});