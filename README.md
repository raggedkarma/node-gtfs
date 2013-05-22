[![build status](https://secure.travis-ci.org/brendannee/node-gtfs.png)](http://travis-ci.org/brendannee/node-gtfs)
#Node-GTFS

node-GTFS loads transit data in [GTFS format](https://developers.google.com/transit/) from [GTFS Data Exchange](http://www.gtfs-data-exchange.com/), unzips it and stores it to a MongoDB database and provides some methods to query for agencies, routes, stops and times.  It also has spatial queries to find nearby stops, routes and agencies.

##Configuration for loading data

Before you can use node-GTFS you must specify agencies to download from GTFS Data Exchange. You need the dataexchange_id for each agency you want to include from [GTFS Data Exchange](http://www.gtfs-data-exchange.com/) - it is in the URL of each individual transit agency's page.

A full list of agencies is available via the [GTFS Data Exchange API](http://www.gtfs-data-exchange.com/api/agencies).

For example, Austin Capital Metro is `capital-metro`, Washington DC is `wmata`.

Add the list of agency keys you'd like to support to config.js as an array called `agencies`

The mongodb URI is also configured in config.js

###To load data

    $ npm run-script download

To keep schedules up to date, you might want to schedule this to occur once per day.

##Example Application

There is an example web app that creates some restful API endpoints and has a simple frontend for viewing transit data.  It is in examples/express.  You could load the example site with:

    $ node ./examples/express/index.js

##Endpoints

###List agencies

    /api/agencies

###List agencies near a point

    /api/agenciesNearby/:lat/:lon/:radius
    
    //Example
    /api/agenciesNearby/37.73/-122.25/10
`:radius` is optional and in miles.  Default: 25 miles
Returns all agencies that serve the 100 nearest stops within the specified radius

###List routes for an agency

    /api/routes/:agency
    
    //Example
    /api/routes/san-francisco-municipal-transportation-agency

###List routes near a point

    /api/routesNearby/:lat/:lon/:radius
    
    //Example
    /api/routesNearby/37.73/-122.25/0.25
`:radius` is optional and in miles.  Default: 1 mile
Returns all routes that stop at the 100 nearest stops within the specified radius

###List stops for a route

    /api/stops/:agency/:route_id/:direction_id
    
    //Example
    /api/stops/san-francisco-municipal-transportation-agency/34/1
`:direction_id` is optional

###List stops near a point

    /api/stopsNearby/:lat/:lon/:radius
    
    //Example
    /api/StopsNearby/37.73/-122.25/0.25
`:radius` is optional and in miles.  Default: 1 mile
Returns the 100 nearest stops within the specified radius

###List stop times for a stop

    /api/times/:agency/:route_id/:stop_id/:direction_id
    
    //Example
    /api/times/san-francisco-municipal-transportation-agency/34/1256/0
`:direction_id` is optional


## About this fork

This fork of node-GTFS currently only provides minimal changes to get the database loader working with MongoHQ and to deploy the example application to Heroku, and it also defaults to using Austin's Capital Metro transit service. It may not be very robust.

### Getting this to work with Heroku and MongoHQ

Use the Heroku [node.js](instructions|https://devcenter.heroku.com/articles/nodejs) to get started.

    # Log in
    $ heroku login
    # Install dependencies locally
    $ npm install
    # Create the Heroku app
    $ heroku create
    # Add MongoHQ to your app
    $ heroku addons:add mongohq:sandbox
    
Using your MongoHQ control panel, create a DB user and figure out your MongoDB URL. Export that URL as a MONGOHQ_URL environment variable. At around line 120 of scripts/download.js, look for a comment reading `// Comment out the following line for the initial DB load`. Temporarily comment out the following line (this will be fixed later) and then execute the download script:

    $ npm script download

Re-run the download script whenever you need to refresh the database.
To finish deploying to Heroku:

    # Make any changes and test your app
    $ foreman start
    # Commit your changes
    $ git commit -m "Added auto-kitten detection"
    # Push changes to Heroku
    $ git push heroku master

## License

(The MIT License)

Copyright (c) 2012 Brendan Nee <me@bn.ee>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
