import Context from '../../_types/Context';
import slugify from 'slugify';

import {
  MutationCreateCountryArgs,
  MutationCreateProducerArgs,
  MutationCreateRegionArgs,
  MutationCreateStyleArgs,
  MutationCreateWhiskyArgs,
} from '../../_types/generated/graphql';

const createAlias = (name: string): string => {
  return slugify(name, {
    lower: true,
  });
};

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
          alias: createAlias(name),
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
          alias: createAlias(name),
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
    { producerId, name, blended, age, styleId }: MutationCreateWhiskyArgs,
    { db }: Context
  ): Promise<any> => {
    console.log(
      `ATTEMPING TO CREATE WHISKY ${name} that belongs to Producer ID: ${producerId}`
    );
    let whisky;
    if (!styleId) {
      whisky = await db.whisky.create({
        data: {
          name,
          alias: createAlias(name),
          blended,
          age,
          producer: {
            connect: {
              id: producerId,
            },
          },
        },
      });
    }
    whisky = await db.whisky.create({
      data: {
        name,
        alias: createAlias(name),
        blended,
        age,
        producer: {
          connect: {
            id: producerId,
          },
        },
        style: {
          connect: {
            id: styleId as string | undefined, // TODO: find a better way to handle null here,
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
  createStyle: async (
    _parent: void,
    { name, shortName, countryId }: MutationCreateStyleArgs,
    { db }: Context
  ): Promise<any> => {
    console.log(`ATTEMPING TO CREATE STYLE ${name}`);
    const style = await db.style.create({
      data: {
        name,
        shortName: shortName ? shortName : name,
        country: {
          connect: {
            id: countryId as string | undefined, // TODO: find a better way to handle null here
          },
        },
      },
    });
    console.log('CREATED style:', style);
    return style;
  },
};

export default Mutation;
