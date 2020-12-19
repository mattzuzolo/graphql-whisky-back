import Whisky from './Whisky';

type Producer = {
  id: string;
  createdAt: string;
  name: string;

  // Relationships
  whiskys: Whisky[];
};

export default Producer;
