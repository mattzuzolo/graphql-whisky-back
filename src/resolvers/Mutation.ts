import Context from '../../_types/Context';

import { MutationCreateDistillerArgs } from '../../_types/generated/graphql';

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
};

export default Mutation;
