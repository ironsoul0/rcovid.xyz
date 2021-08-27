export type Transfer = {
  from: {
    id: string;
  };
  to: {
    hat: { id: string } | null;
    id: string;
  };
  value: string;
  transaction: {
    id: string;
  };
};
