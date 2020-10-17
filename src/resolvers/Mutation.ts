import Context from '../../_types/Context';

const Mutation = {
  createDistiller: async (
    _parent: void,
    { name }: { name: string },
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
