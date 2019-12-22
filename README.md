In the mongo console you can do an $unset like so:

db.Things.update({a:1},{$unset:{b:''}})

The server picks up the 'changed' event, but the change is not pushed to the client.
