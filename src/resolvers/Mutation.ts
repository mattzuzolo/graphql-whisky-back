import Context from '../../_types/Context';

import {
  MutationCreateCountryArgs,
  MutationCreateDistillerArgs,
  MutationCreateRegionArgs,
  MutationCreateWhiskyArgs,
} from '../../_types/generated/graphql';

const Mutation = {
  createDistiller: async (
    _parent: void,
    { name }: MutationCreateDistillerArgs,
    { db }: Context
  ): Promise<any> => {
    console.log(`ATTEMPING TO CREATE DISTILLER ${name}...`);
    const distiller = await db.distiller.create({
      data: {
        name,
      },
    });
    console.log('CREATED DISTILLER:', distiller);
    return distiller;
  },
  createWhisky: async (
    _parent: void,
    { distillerId, name, blended, age }: MutationCreateWhiskyArgs,
    { db }: Context
  ): Promise<any> => {
    console.log(
      `ATTEMPING TO CREATE WHISKY ${name} that belongs to Distiller ID: ${distillerId}`
    );
    const whisky = await db.whisky.create({
      data: {
        name,
        blended,
        age,
        distiller: {
          connect: {
            id: distillerId,
          },
        },
      },
    });
    console.log('CREATED WHISKY:', whisky);
    return whisky;
  },
  createCountry: async (
    _parent: void,
    { name, shortName }: MutationCreateCountryArgs,
    { db }: Context
  ): Promise<any> => {
    console.log(`ATTEMPING TO CREATE COUNTRY ${name}`);
    const country = await db.country.create({
      data: {
        name,
        shortName: shortName ? shortName : name, // If shortName doesn't exist, just apply "name"
      },
    });
    console.log('CREATED WHISKY:', country);
    return country;
  },
  createRegion: async (
    _parent: void,
    { countryId, name, shortName }: MutationCreateRegionArgs,
    { db }: Context
  ): Promise<any> => {
    console.log(`ATTEMPING TO CREATE REGION ${name} in countryId ${countryId}`);
    const country = await db.region.create({
      data: {
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
