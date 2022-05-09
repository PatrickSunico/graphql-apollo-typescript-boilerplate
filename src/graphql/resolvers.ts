import { IResolvers } from "@graphql-tools/utils";
import { listings } from "../api/helpers/mockdata";

export const resolvers: IResolvers = {
 Query: {
  listings: () => {
   return listings;
  },
 },
 Mutation: {
  //_ parent: undefined since we know that we are not using it have it become undefined
  //  {id} : {id: string} destructured and type defined
  deleteListing: (_parent: undefined, { id }: { id: string }) => {
   for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
     const listing = listings.splice(i, 1)[0];
     return listing;
    }
   }
  },
 },
};
