import Style from './Style';

type Whisky = {
  id: string;
  createdAt: string;
  name: string;
  age: number;
  blended: boolean;
  style: Style;
};

export default Whisky;
