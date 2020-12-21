import Region from './Region';
import Country from './Country';

type Style = {
  id: string;
  name: string;
  shortName: string;

  region?: Region;
  country?: Country;
};

export default Style;
