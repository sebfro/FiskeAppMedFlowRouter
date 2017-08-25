'use strict';

import { Meteor } from 'meteor/meteor';

Meteor.callAsync = async function (...args) {
    return new Promise((resolve, reject) => {
        Meteor.call(...args, (err, res) => err ? reject(err) : resolve(res));
    });
};