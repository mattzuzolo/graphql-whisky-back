import Style from './Style';

type Whisky = {
  id: string;
  createdAt: string;
  updatedAt: string;

  name: string;
  alias: string;
  blended: boolean;
  style: Style;
  age?: number;
  abv?: number;
};

export default Whisky;
