import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

const Things = new Mongo.Collection("Things");

Things.insert({a:1,b:2});
Things.insert({a:3,b:4});

Meteor.publish("testpub", function testpub() {
  const self = this;

  const thingsQuery = {};
  const fields = {
    a: 1,
    b:1
  };

  const collectionHandle = Things.find(thingsQuery, { fields }).observe({
    added(newThing) {
      const {_id} = newThing;
      console.log('added');
      self.added('ClientCollection', _id, newThing);
    },

    changed(newThing, oldThing) {
      const {_id} = newThing;
      console.log('changed');
      self.changed('ClientCollection', _id, newThing);
    },

    removed(oldThing) {
      const {_id} = oldThing;
      console.log('removed');
      self.removed('ClientCollection', _id);
    }
  });
  self.ready();

  self.onStop(() => {
    collectionHandle.stop();
  });
});
