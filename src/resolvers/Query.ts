import Context from '../../_types/Context';

import {
  QueryDistillerArgs,
  QueryWhiskyArgs,
} from '../../_types/generated/graphql';

const Query = {
  distiller: async (
    _parent: void,
    { id }: QueryDistillerArgs,
    { db }: Context
  ): Promise<any> => {
    console.log('SEARCHING FOR DISITLLER WITH ID: ', id);
    const foundDistiller = db.distiller.findOne({
      where: { id },
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
    const distllers = db.distiller.findMany({});
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
    const whiskys = db.whisky.findMany({});
    console.log('FOUND WHISKYS:', whiskys);
    return whiskys;
  },
};

export default Query;
