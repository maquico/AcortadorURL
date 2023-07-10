const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
require('dotenv').config();
const path = require('path');
const { graphql } = require('graphql');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));

// Define GraphQL schema
const ShortUrlType = new GraphQLObjectType({
  name: 'ShortUrl',
  // eslint-disable-next-line no-unused-vars
  fields: {
    _id: { type: GraphQLString },
    full: { type: GraphQLString },
    short: { type: GraphQLString },
    clicks: { type: GraphQLInt }
  }
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getAllShortUrls: {
      type: new GraphQLList(ShortUrlType),
      resolve: async () => {
        const shortUrls = await ShortUrl.find();
        return shortUrls;
      }
    },
    getShortUrl: {
      type: ShortUrlType,
      args: {
        short: { type: GraphQLString }
      },
      resolve: async (_, { short }) => {
        const shortUrl = await ShortUrl.findOne({ short });
        return shortUrl;
      }
    }
  }
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createShortUrl: {
      type: ShortUrlType,
      args: {
        full: { type: GraphQLString }
      },
      resolve: async (_, { full }) => {
        const shortUrl = await ShortUrl.create({ full });
        return shortUrl;
      }
    },
    incrementClicks: {
      type: ShortUrlType,
      args: {
        short: { type: GraphQLString }
      },
      resolve: async (_, { short }) => {
        const getShortUrlQuery = `
          query {
            getShortUrl(short: "${short}") {
              full
              clicks
            }
          }
        `;
        // eslint-disable-next-line no-unused-vars
        const { data } = await graphql(schema, getShortUrlQuery);

        if (!data.getShortUrl) {
          throw new Error('Short URL not found');
        }

        const { full, clicks } = data.getShortUrl;

        const updatedShortUrl = await ShortUrl.findOneAndUpdate(
          { short },
          { $set: { clicks: clicks + 1 } },
          { new: true }
        );

        return updatedShortUrl;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => {
  graphql(schema, `{ getAllShortUrls { full, short, clicks } }`)
    .then(result => {
      res.render('index', { shortUrls: result.data.getAllShortUrls });
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.get('/:shortUrl', async (req, res) => {
  try {
    const query = `
      mutation {
        incrementClicks(short: "${req.params.shortUrl}") {
          full
        }
      }
    `;

    await graphql(schema, query, null, req, req.body);

    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

    if (!shortUrl) {
      return res.sendStatus(404);
    }

    return res.redirect(shortUrl.full);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

app.post('/shortUrls', async (req, res) => {
  const fullUrl = req.body.fullUrl;

  // Construct the mutation object
  const mutation = {
    query: `
      mutation {
        createShortUrl(full: "${fullUrl}") {
          full
          short
          clicks
        }
      }
    `,
    operationName: 'CreateShortUrl'
  };

  try {
    // Execute the mutation directly
    const { data, errors } = await graphql(schema, mutation.query, null, req, req.body);

    if (errors) {
      console.error(errors);
      return res.sendStatus(500);
    }

    // Redirect to the homepage after creating the short URL
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 3000);
module.exports = app; // Export the app object
