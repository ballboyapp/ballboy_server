[![Build Status](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/travis-ci/travis-web) [![Greenkeeper badge](https://badges.greenkeeper.io/fede-rodes/crae-apollo-heroku.svg)](https://greenkeeper.io/) [![Maintainability](https://api.codeclimate.com/v1/badges/5129dc03085d3d84c537/maintainability)](https://codeclimate.com/github/fede-rodes/crae-apollo-heroku/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/5129dc03085d3d84c537/test_coverage)](https://codeclimate.com/github/fede-rodes/crae-apollo-heroku/test_coverage)

## Getting Started

### 1. Setup MongoDB provider
Before doing anything, we need to setup a Mongo provider to hold our database for us. I'll describe two ways of doing this; choose the one you like the most.

#### Install Mongo locally
The first approach is to install Mongo locally. In order to so, go to [https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/) and follow the instructions based on your operating system. After that, open a new terminal and start the mongo service; in my case, I'm on Ubuntu, so I run ```sudo service mongod start```. This will start the Mongo service in the background on port 27017.

#### Get a Sandbox Mongo instance on mLab
The second option is to create a FREE database hosted on mLab and then connect your application to the remote instance. To do so, go to [mLab](http://mlab.com/) and create a sandbox Mongo instance. Then, go to the Users tab in your mLab-sandbox-MongoDB-instance-dashboard and click on the 'add a database user' button; setup username and password. Remember those values, we'll need them shortly!

### 2. Environment variables
At the root directory, copy the file called `.sample.env` and rename it into `.env`.

### 3. Register the app on Mailgun (you can use any other email provider):
Mailgun allows you to send emails from your app.

In order to get started, first access your [Mailgun](https://www.mailgun.com/) account. Then, grab your sandbox domain smtp username and password and copy said values into your `.env` file. Finally, add your email address to the list of [Auhtorized Recipients](https://help.mailgun.com/hc/en-us/articles/217531258-Authorized-Recipients).

### 4. Chatkit and Cloudinary
Register into Cloudinary and Chatkit and create a new instance. Then go the `.env` file and set you environment variables.

### 5. Running the app locally in dev mode
Once we have our Mongo provider, these are the next steps that we need to follow to run the app locally in dev mode:

1. Inside you project's directory, clone the project and move to the project's folder
```
>> cd bb (project folder's name)
>> git clone git@github.com:fede-rodes/ballboy_server.git server
>> cd server
```

2. Setup your MONGO_URL env variable inside `.env` to connect the app with your recently created Mongo instance. In case you are using mLab, remember to use your credentials. In case your are running mongo locally, you can use the default value for MONGO_URL.

3. Install project dependencies, and run the app locally.
```
>> yarn install
>> yarn start
```
The server should be running on port 3001 --> [http://localhost:3001](http://localhost:3001)
The GraphQL playground should be running on [http://localhost:3001/graphql](http://localhost:3001/graphql) (only accessible in dev mode).

### 6. Running the app locally in production mode
1. Follow the steps above to setup your Mongo service.

2. Install heroku cli: [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

3. Clone the project and move to the project's folder
```
>> cd bb (project folder's name)
>> git clone git@github.com:fede-rodes/ballboy_server.git server
>> cd server
```

4. Setup your MONGO_URL env variable as describe above.

5. Install dependencies and run the app locally in production mode.
```
>> yarn install && yarn build
>> heroku local
```
This should launch the server on port 5000 --> http://localhost:5000. As far as I understand, the port (process.env.PORT) is setup by heroku and can't be changed.

### 7. Deploy to heroku
1. Follow the steps above to setup a Mongo service on mLab.

2. Install heroku cli: [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

3. Clone the project and move to the project's folder
```
>> cd bb (project folder's name)
>> git clone git@github.com:fede-rodes/ballboy_server.git server
>> cd server
```

4. Initiate Heroku cli and create a new app
```
>> heroku login (enter your credentials)
>> heroku create <YOUR_APP_NAME>
```

5. Install buildpacks (probably not necessary if you don't use yarn) and set MONGO_URL env variable.
```
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#yarn
heroku config:set MONGO_URL=mongodb://<dbuser>:<dbpassword>@<something>.mlab.com:<port>/<dbname>
```

6. Push the code to Heroku.
```
>> git push heroku master
```

Comment: if you want to deploy from a branch different than master run:
```
>> git push heroku <BRANCH_NAME>:master
```

### 8. Heroku deploy troubleshooting

In case your build fails with an error ```/bin/sh: 1: <SOME-DEP>: not found``` and you are building the project with yarn, try setting the following env variable:
```
heroku config:set NPM_CONFIG_PRODUCTION=false
```

## Further reading

### GraphQL / Apollo
- https://www.apollographql.com/docs
- https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b
- https://dev-blog.apollodata.com/react-graphql-tutorial-part-2-server-99d0528c7928
- https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15
- https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
- https://caveofcode.com/2016/10/apollo-server-using-the-graphql-schema-language/
- https://caveofcode.com/2016/11/the-connector-and-model-layer-in-your-graphql-apollo-server/
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
- https://www.robinwieruch.de
- https://codewithmosh.com/p/the-complete-node-js-course
- https://blog.apollographql.com/authorization-in-graphql-452b1c402a9

### Testing
- http://blog.dideric.is/2018/03/18/Testing-apollo-containers/

### Auth
- https://blog.usejournal.com/sessionless-authentication-withe-jwts-with-node-express-passport-js-69b059e4b22c

### Deployment / Heroku
- https://originmaster.com/running-create-react-app-and-express-crae-on-heroku-c39a39fe7851

