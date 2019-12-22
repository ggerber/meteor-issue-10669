import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Tracker} from 'meteor/tracker'

const ClientCollection = new Mongo.Collection('ClientCollection');

Tracker.autorun(() => {
  const subscription = Meteor.subscribe('testpub');
  const isloading = !subscription.ready();

  const resp = {
    isloading
  };

  if (!isloading) resp.docs = ClientCollection.find({}).fetch();

  console.log('resp', resp);
});
