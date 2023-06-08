import { Event } from "../events/data-type";

export type Category = {
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  start_sch: string;
  end_sch: string;
  sex: string;
  distance: number;
  lap: number;
  run: boolean;
  race_today: boolean;
  event_id: number;
  events: Event;
};

export type CategoryResponse = {
  message: string;
  data: Category[];
};

export type CategoryResponseDataObj = {
  message: string;
  data: Category;
};
