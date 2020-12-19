import Context from '../../_types/Context';

import {
  QueryProducerArgs,
  QueryWhiskyArgs,
  QueryCountryArgs,
  QueryCountryByAliasArgs,
  QueryRegionArgs,
  QueryRegionByAliasArgs,
} from '../../_types/generated/graphql';

const Query = {
  producer: async (
    _parent: void,
    { id }: QueryProducerArgs,
    { db }: Context
  ): Promise<any> => {
    console.log('SEARCHING FOR DISITLLER WITH ID: ', id);
    const foundProducer = await db.producer.findOne({
      where: { id },
      include: {
        whiskys: {
          take: 5, // limit to five extra whiskies
        },
        // whiskys: true,
        region: true,
        country: true,
      },
    });
    console.log('FOUND PRODUCER WITH ID:', foundProducer);
    return foundProducer;
  },
  producers: async (
    _parent: void,
    _args: void,
    { db }: Context
  ): Promise<any[]> => {
    console.log('SEARCHING FOR ALL PRODUCERS');
    const distllers = await db.producer.findMany({
      include: {
        whiskys: true,
        region: true,
        country: true,
      },
    });
    console.log('FOUND PRODUCERS:', distllers);
    return distllers;
  },
  whisky: async (
    _parent: void,
    { id }: QueryWhiskyArgs,
    { db }: Context
  ): Promise<any> => {
    console.log('SEARCHING FOR WHISKY WITH ID:', id);
    const foundWhisky = await db.whisky.findOne({
      where: { id },
      include: {
        producer: {
          // Get 3 whiskys to recommend user more
          include: {
            whiskys: {
              take: 3,
            },
            country: true,
            region: true,
          },
        },
      },
    });
    console.log('FOUND WHISKY:', foundWhisky);
    return foundWhisky;
  },
  whiskys: async (
    _parent: void,
    _args: void,
    { db }: Context
  ): Promise<any[]> => {
    console.log('SEARCHING FOR ALL WHISKYS');
    const whiskys = await db.whisky.findMany({
      include: {
        producer: true,
      },
    });
    console.log('FOUND WHISKYS:', whiskys);
    return whiskys;
  },
  country: async (
    _parent: void,
    { id }: QueryCountryArgs,
    { db }: Context
  ): Promise<any> => {
    console.log('SEARCHING FOR COUNTRY WITH ID:', id);
    const foundCountry = await db.country.findOne({
      where: { id },
      include: {
        regions: true,
        producers: true,
      },
    });
    console.log('\n\n\nLOL WRONG QUERY!!!\n\n\n');
    console.log('FOUND COUNTRY:', foundCountry);
    return foundCountry;
  },
  countryByAlias: async (
    _parent: void,
    { alias }: QueryCountryByAliasArgs,
    { db }: Context
  ): Promise<any> => {
    console.log('SEARCHING FOR COUNTRY BY ALIAS:', alias);
    // WTF: findFirst is not case sensitive (according to Prisma slack)
    const foundCountry = await db.country.findFirst({
      where: {
        alias: {
          equals: alias,
          mode: 'insensitive', // url so allow any case
        },
      },
      include: {
        regions: true,
        producers: {
          include: {
            whiskys: {
              include: {
                producer: true,
              },
            },
            region: true,
          },
        },
      },
    });
    console.log('FOUND COUNTRY:', foundCountry);
    return foundCountry;
  },

  countries: async (
    _parent: void,
    _args: void,
    { db }: Context
  ): Promise<any[]> => {
    console.log('SEARCHING FOR ALL COUNTRIES');
    const countries = await db.country.findMany({
      include: {
        regions: {
          include: {
            producers: true,
          },
        },
        producers: true,
      },
    });
    console.log('FOUND COUNTRIES:', countries);
    return countries;
  },
  region: async (
    _parent: void,
    { id }: QueryRegionArgs,
    { db }: Context
  ): Promise<any> => {
    console.log('SEARCHING FOR REGION WITH ID: ', id);
    const foundRegion = await db.region.findOne({
      where: { id },
      include: {
        country: true,
        producers: true,
      },
    });
    console.log('FOUND PRODUCER WITH ID:', foundRegion);
    return foundRegion;
  },
  regionByAlias: async (
    _parent: void,
    { alias }: QueryRegionByAliasArgs,
    { db }: Context
  ): Promise<any> => {
    console.log('~~~SEARCHING FOR REGION BY ALIAS:', alias);

    const foundRegion = await db.region.findFirst({
      where: {
        alias: {
          equals: alias,
          mode: 'insensitive',
        },
      },
      include: {
        country: true,
        producers: {
          include: {
            whiskys: {
              include: {
                producer: true,
              },
            },
          },
        },
      },
    });
    console.log('FOUND REGION:', foundRegion);
    return foundRegion;
  },
  regions: async (
    _parent: void,
    _args: void,
    { db }: Context
  ): Promise<any[]> => {
    console.log('SEARCHING FOR ALL REGIONS');
    const regions = await db.region.findMany({
      include: {
        country: true,
      },
    });
    console.log('FOUND REGIONS:', regions);
    return regions;
  },
};

export default Query;
