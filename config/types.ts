export type Transfer = {
  from: {
    hat: { id: string } | null;
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
