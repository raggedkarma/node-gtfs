var url = require('url')
  , mongo_url = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/gtfs'
  , parsed_url = url.parse(mongo_url)
  , mongo_host = parsed_url.hostname
  , mongo_port = parsed_url.port
  , mongo_database = parsed_url.pathname.replace(/^\//, '');
if (parsed_url.auth !== null) {
  var mongo_username = parsed_url.auth.split(':')[0]
    , mongo_password = parsed_url.auth.split(':')[1];
}

module.exports = {
    mongo_url: process.env.MONGOHQ_URL || 'mongodb://localhost:27017/gtfs'
  , agencies: [
      /* Put agency_key names from gtfs-data-exchange.com.  
      Optionally, specify a download URL to use a dataset not from gtfs-data-exchange.com */
      { agency_key: 'oc-transpo', url: 'http://www.gtfs-data-exchange.com/agency/oc-transpo/latest.zip' }
    ]
}
