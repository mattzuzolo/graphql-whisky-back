import Country from './Country';
import Distiller from './Distiller';

type Region = {
  id: string;

  name: string;
  shortName: string;

  // Relationships
  distillers: Distiller[];
};

export default Region;
