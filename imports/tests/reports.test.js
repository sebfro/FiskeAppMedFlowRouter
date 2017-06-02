/**
 * Created by sebastian on 02.06.17.
 */
import {Meteor} from 'meteor/meteor';
import { Random } from 'meteor/random';
import {Factory} from 'meteor/dburles:factory'
import React from 'react';
import {shallow} from 'enzyme';
import {chai, assert} from 'meteor/practicalmeteor:chai';
import {Reports} from '../api/reports.js';

if (Meteor.isServer) {
    describe('Reports', function () {
        describe('Methods', function () {
            const userId = Random.id();
            let reportId;

            beforeEach(() => {
                Reports.remove({});
                reportId = Reports.insert({
                    text: 'test report',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'seb',
                });
            });
            it('can delte report', function () {
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];
                const invocation = { userId };
                deleteTask.apply(invocation, [reportId]);
                assert.equal(Reports.find().count(), 0);
            });
            it('Can add report', function () {
                assert.equal(Reports.find().count(), 1);
            })
        })
    });
}