import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/**
 * WIFT Data Schema
 *
 * This file defines the data models for the WIFT floorplan application.
 * Future floorplan-related data models can be added here.
 */

const schema = a.schema({
  // Placeholder model - can be expanded for floorplan data
  UserProfile: a
    .model({
      email: a.string().required(),
      name: a.string(),
      company: a.string(),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
