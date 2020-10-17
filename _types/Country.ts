import Region from './Region';
import Distiller from './Distiller';

type Country = {
  id: string;

  name: string;
  shortName: string;

  // Relationships
  distiller: Distiller[];
  regions: Region[];
};

export default Country;
