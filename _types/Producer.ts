import Whisky from './Whisky';

type Producer = {
  id: string;
  createdAt: string;
  updatedAt: string;

  name: string;
  alias: string;

  // Relationships
  whiskys: Whisky[];
};

export default Producer;
