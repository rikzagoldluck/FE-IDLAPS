import { Category } from "../categories/data-type";
import { Event } from "../events/data-type";
import { Team } from "../teams/data-type";

export type Rider = {
  id: number;
  name: string;
  age: number;
  nationality: string;
  team_id: number;
  teams: Team;
  bib: string;
  vci_num: string;
  id_b: number;
  mac_no: string;
  note: string;
  note_1: string;
  run_lap: number;
  lap_no: number;
  run: boolean;
  event_id: number;
  events: Event;
  category_id: number;
  categories: Category;
};
export type RiderResponse = {
  message: string;
  data: Rider[];
};

export type RiderResponseDataObj = {
  message: string;
  data: Rider;
};
