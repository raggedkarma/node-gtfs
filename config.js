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
    mongo_url: mongo_url
  , mongo_node_host: mongo_host
  , mongo_node_port: mongo_port
  , mongo_node_database: mongo_database
  , mongo_node_username: mongo_username
  , mongo_node_password: mongo_password
  , agencies: [
        'capital-metro'
   ]
   , agencyUrls: {
       'capital-metro': 'http://www.gtfs-data-exchange.com/agency/capital-metro/latest.zip'
   }
}
