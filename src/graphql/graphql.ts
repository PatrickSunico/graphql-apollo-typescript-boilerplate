import {
 GraphQLObjectType,
 GraphQLSchema,

 /* Listing Object */
 GraphQLList,
 /* Scalar Types */
 GraphQLString,
 GraphQLID,
 GraphQLInt,
 GraphQLNonNull,
} from "graphql";
import { listings } from "../api/helpers/mockdata";

const Listing = new GraphQLObjectType({
 name: "Listing",
 fields: {
  id: { type: new GraphQLNonNull(GraphQLID) },
  title: { type: new GraphQLNonNull(GraphQLString) },
  image: { type: new GraphQLNonNull(GraphQLString) },
  address: { type: new GraphQLNonNull(GraphQLString) },
  price: { type: new GraphQLNonNull(GraphQLInt) },
  numOfGuests: { type: new GraphQLNonNull(GraphQLInt) },
  numOfBeds: { type: new GraphQLNonNull(GraphQLInt) },
  numOfBaths: { type: new GraphQLNonNull(GraphQLInt) },
  rating: { type: new GraphQLNonNull(GraphQLInt) },
 },
});

const query = new GraphQLObjectType({
 name: "Query",
 fields: {
  listings: {
   // type should not be null and the listing object itself should be null
   type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Listing))),
   resolve: () => listings,
  },
 },
});

const mutation = new GraphQLObjectType({
 name: "Mutation",
 fields: {
  deleteListing: {
   // Listing should not be null
   type: new GraphQLNonNull(Listing),
   // Pass in the arguments of the id of the listing that should be deleted and enforce non null
   args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
   },
   // _root convey the root object passed to our root object type which is unused
   // deconstruct the args to get the id
   resolve: async (_root, { id }) => {
    for (let i = 0; i < listings.length; i++) {
     if (listings[i].id === id) {
      console.log(listings.splice(i, 1)[0]);
      return await listings.splice(i, 1)[0];
     }
     throw new Error("failed to delete listing");
    }

    // return listings.filter((x) => x.id != id);
   },
  },
 },
});

export const schema = new GraphQLSchema({ query, mutation });
