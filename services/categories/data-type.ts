import { Event } from "../events/data-type";

export type Category = {
  id: number;
  name: string;
  description: string;
  start_time: number;
  end_time: number;
  sex: string;
  distance: number;
  lap: number;
  run: boolean;
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
