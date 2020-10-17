import Context from '../../_types/Context';

import {
  QueryDistillerArgs,
  QueryWhiskyArgs,
  QueryCountryArgs,
  QueryRegionArgs,
} from '../../_types/generated/graphql';

const Query = {
  distiller: async (
    _parent: void,
    { id }: QueryDistillerArgs,
    { db }: Context
  ): Promise<any> => {
    console.log('SEARCHING FOR DISITLLER WITH ID: ', id);
    const foundDistiller = await db.distiller.findOne({
      where: { id },
      include: {
        whiskys: true,
      },
    });
    console.log('FOUND DISTILLER WITH ID:', foundDistiller);
    return foundDistiller;
  },
  distillers: async (
    _parent: void,
    _args: void,
    { db }: Context
  ): Promise<any[]> => {
    console.log('SEARCHING FOR ALL DISTILLERS');
    const distllers = await db.distiller.findMany({
      include: {
        whiskys: true,
      },
    });
    console.log('FOUND DISTILLERS:', distllers);
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
        distiller: true,
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
        distiller: true,
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
    console.log('SEARCHING FOR WHISKY WITH ID:', id);
    const foundCountry = await db.country.findOne({
      where: { id },
      include: {
        regions: true,
        distillers: true,
      },
    });
    console.log('FOUND WHISKY:', foundCountry);
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
        regions: true,
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
        distillers: true,
      },
    });
    console.log('FOUND DISTILLER WITH ID:', foundRegion);
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
