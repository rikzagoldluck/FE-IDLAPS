export type Beacon = {
  id: number;
  tag_id: string;
};
export type BeaconResponse = {
  message: string;
  data: Beacon[];
};
