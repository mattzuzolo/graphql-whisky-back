import Producer from './Producer';

type Region = {
  id: string;

  name: string;
  shortName: string;

  // Relationships
  producers: Producer[];
};

export default Region;
