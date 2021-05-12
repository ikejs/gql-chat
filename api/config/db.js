const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gql-chat', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose.connection;