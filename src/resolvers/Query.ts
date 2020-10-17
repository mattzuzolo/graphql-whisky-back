import Context from '../../_types/Context';

import { QueryDistillerArgs } from '../../_types/generated/graphql';

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
    _args: QueryDistillerArgs,
    { db }: Context
  ): Promise<any[]> => {
    console.log('SEARCHING FOR ALL DISTILLERS');
    const distllers = db.distiller.findMany({});
    console.log('FOUND DISTILLERS:', distllers);
    return distllers;
  },
};

export default Query;
