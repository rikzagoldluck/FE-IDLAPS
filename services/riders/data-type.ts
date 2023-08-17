import { Category } from "../categories/data-type";
import { Event } from "../events/data-type";
import { Team } from "../teams/data-type";

export type Rider = {
  id: number;
  name: string;
  age: number;
  nationality: string;
  team_name: string;
  bib: string;
  total_waktu: string;
  vci_num: string;
  id_beacon: number;
  mac_no: string;
  note: string;
  note_1: string;
  run: RunType;
  event_id: number;
  events: Event;
  category_id: number;
  categories: Category[];
  race_results: RaceResult[];
  lap_count: number;
  start_waktu: string;
};

type RaceResult = {
  id: number;
  rider_id: number;
  category_id: number;
  lap_number: number;
  finish_time: number;
};

export type RiderResponse = {
  message: string;
  data: Rider[];
};

export type RiderResponseDataObj = {
  message: string;
  data: Rider;
};

export enum RunType {
  STOP = "STOP",
  RUN = "RUN",
  FINISHER = "FINISHER",
  DNF = "DNF",
  DNS = "DNS",
  DSQ = "DSQ",
}

export const RunTypeConst = {
  STOP: "STOP",
  RUN: "RUN",
  FINISHER: "FINISHER",
  DNF: "DNF",
  DNS: "DNS",
  DSQ: "DSQ",
} as const;
