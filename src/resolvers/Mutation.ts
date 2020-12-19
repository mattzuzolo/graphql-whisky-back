import Context from '../../_types/Context';

import {
  MutationCreateCountryArgs,
  MutationCreateProducerArgs,
  MutationCreateRegionArgs,
  MutationCreateWhiskyArgs,
} from '../../_types/generated/graphql';
3;
const Mutation = {
  createProducer: async (
    _parent: void,
    { countryId, name, regionId }: MutationCreateProducerArgs,
    { db }: Context
  ): Promise<any> => {
    console.log(`ATTEMPING TO CREATE PRODUCER ${name}...`);

    // TODO: simplify this
    let producer;
    if (!regionId) {
      producer = await db.producer.create({
        data: {
          name,
          country: {
            connect: {
              id: countryId,
            },
          },
        },
      });
    } else {
      producer = await db.producer.create({
        data: {
          name,
          country: {
            connect: {
              id: countryId,
            },
          },
          region: {
            connect: {
              id: regionId as string | undefined, // TODO: find a better way to handle null here
            },
          },
        },
      });
    }

    console.log('CREATED PRODUCER:', producer);
    return producer;
  },
  createWhisky: async (
    _parent: void,
    { producerId, name, blended, age }: MutationCreateWhiskyArgs,
    { db }: Context
  ): Promise<any> => {
    console.log(
      `ATTEMPING TO CREATE WHISKY ${name} that belongs to Producer ID: ${producerId}`
    );
    const whisky = await db.whisky.create({
      data: {
        name,
        blended,
        age,
        producer: {
          connect: {
            id: producerId,
          },
        },
      },
    });
    console.log('CREATED WHISKY:', whisky);
    return whisky;
  },
  createCountry: async (
    _parent: void,
    { alias, name, shortName }: MutationCreateCountryArgs,
    { db }: Context
  ): Promise<any> => {
    console.log(`ATTEMPING TO CREATE COUNTRY ${name}`);
    const country = await db.country.create({
      data: {
        alias,
        name,
        shortName: shortName ? shortName : name, // If shortName doesn't exist, just apply "name"
      },
    });
    console.log('CREATED WHISKY:', country);
    return country;
  },
  createRegion: async (
    _parent: void,
    { countryId, alias, name, shortName }: MutationCreateRegionArgs,
    { db }: Context
  ): Promise<any> => {
    console.log(`ATTEMPING TO CREATE REGION ${name} in countryId ${countryId}`);
    const country = await db.region.create({
      data: {
        alias,
        name,
        shortName: shortName ? shortName : name, // If shortName doesn't exist, just apply "name"
        country: {
          connect: {
            id: countryId,
          },
        },
      },
    });
    console.log('CREATED WHISKY:', country);
    return country;
  },
};

export default Mutation;
