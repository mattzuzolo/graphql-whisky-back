import Context from '../../_types/Context';

import {
  MutationCreateDistillerArgs,
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
};

export default Mutation;
