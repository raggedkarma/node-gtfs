module.exports = {
    mongo_node_host: process.env.MONGOHQ_URL || 'localhost'
  , mongo_node_database: 'gtfs'
  , agencies: [
        'capital-metro'
   ]
   , agencyUrls: {
       'capital-metro': 'http://www.gtfs-data-exchange.com/agency/capital-metro/latest.zip'
   }
}
