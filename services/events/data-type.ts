export type Event = {
  id: number;
  name: string;
  location: string;
  desc_1: string;
  desc_2: string;
  start_datetime: number;
  end_datetime: number;
  distance: number;
  type: string;
  registration_fee: number;
  commisioner: string;
  race_director: string;
  start: string;
};
export type EventResponse = {
  message: string;
  data: Event[];
};

export type EventResponseDataObj = {
  message: string;
  data: Event;
};
