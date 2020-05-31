const mongoose = require ("mongoose"); // The reason for this demo.

const database = process.env.DATABASE || 'took';

const port = process.env.PORT || 27017;

const uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
`mongodb://localhost:${port}/${database}`;

var connect = async () =>
{
    // Makes connection asynchronously.  Mongoose will queue up database
    // operations and release them when the connection is complete.
    await mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });
}

module.exports = { connect }



