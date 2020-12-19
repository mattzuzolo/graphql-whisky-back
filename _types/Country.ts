import Region from './Region';
import Producer from './Producer';

type Country = {
  id: string;

  name: string;
  shortName: string;

  // Relationships
  producer: Producer[];
  regions: Region[];
};

export default Country;
