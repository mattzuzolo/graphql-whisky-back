import Whisky from './Whisky';

type Distiller = {
  id: string;
  createdAt: string;
  name: string;

  // Relationships
  whiskys: Whisky[];
};

export default Distiller;
