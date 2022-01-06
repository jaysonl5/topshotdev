const gql = require("graphql-tag");
const ApolloClient = require("apollo-client").ApolloClient;
const fetch = require("node-fetch");
const createHttpLink = require("apollo-link-http").createHttpLink;
const setContext = require("apollo-link-context").setContext;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;
const mongoose = require('mongoose');
const {Set} = require('./schema/set.js');
require('dotenv').config();


const httpLink = createHttpLink({
  uri: "https://public-api.nbatopshot.com/graphql/",
  fetch: fetch
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const query = async (req, res) => {
    if (!req.body || !req.body.query) {
      res.sendStatus(500);
      return;
    }
  
    const query = gql(req.body.query);
    let variables = undefined;
    if (req.body.variables) {
        console.log(req.body.variables);
      variables = req.body.variables;
    }
  
    try {
      const result = await client.query({
        query,
        variables
      });
      console.log(result);
      res.json(result);
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send(JSON.stringify(err));
    }
  };
  
  const mutate = async (req, res) => {
    if (!req.body || !req.body.query) {
      res.sendStatus(500);
      return;
    }
  
    const query = gql(req.body.query);
    let variables = undefined;
    if (req.body.variables) {
      variables = JSON.parse(decodeURIComponent(req.body.variables));
    }
  
    try {
      const result = await client.mutate({
        query,
        variables
      });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send(JSON.stringify(err));
    }
  };

  const apollo = async (req, res, next) => {
    console.log("********** REQUEST ****")
    console.log(req.method)

    switch (req.method) {
      case "POST":
      case "PUT":
        await mutate(req, res);
        break;
  
      case "GET":
        switch(req.path){ 
          case "/getsets":
            mongoose
            .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
            .then(() => {
                let retrieveSets = async() => {
                  let sets = await Set.find()    
                  console.log(sets[0].setId);  
                  res.send(sets);                           
                }

                retrieveSets().then()
                .catch((e) => console.log(e.message))
              })
              break;
          case "/":
              console.log("/ getting hit")
              await query(req, res)
              .then()
              .catch((error) => {
                console.log(error);
              })
        }
      
    }
    
    next();
  };
  
  
  module.exports = apollo;