export type Team = {
  id: number;
  name: string;
  nationality: string;
  province: string;
};
export type TeamResponse = {
  message: string;
  data: Team[];
};

export type TeamResponseDataObj = {
  message: string;
  data: Team;
};
