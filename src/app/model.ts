export type data = userData[];

export interface userData {
  id: number;
  name: string;
  workouts: workout[] | [];
  total_minutes: number;
}
export interface payloadData {
  name: string;
  workouts: workout[] | [];
  total_minutes: number;
}
export interface workout {
  type: string;
  minutes: number;
}

export let initialData = [
  {
    id: 1,
    name: 'John Doe',
    workouts: [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 },
    ],
    total_minutes: 75,
  },
  {
    id: 2,
    name: 'Jane Smith',
    workouts: [
      { type: 'Swimming', minutes: 60 },
      { type: 'Running', minutes: 20 },
    ],
    total_minutes: 80,
  },
  {
    id: 3,
    name: 'Michael Brown',
    workouts: [
      { type: 'Cycling', minutes: 50 },
      { type: 'Yoga', minutes: 30 },
    ],
    total_minutes: 80,
  },
  {
    id: 4,
    name: 'Emily Davis',
    workouts: [
      { type: 'Cycling', minutes: 50 },
      { type: 'Yoga', minutes: 30 },
    ],
    total_minutes: 80,
  },
  {
    id: 5,
    name: 'Daniel Wilson',
    workouts: [
      { type: 'Swimming', minutes: 45 },
      { type: 'Running', minutes: 25 },
    ],
    total_minutes: 70,
  },
  {
    id: 6,
    name: 'Sophia Martinez',
    workouts: [
      { type: 'Yoga', minutes: 60 },
      { type: 'Cycling', minutes: 30 },
    ],
    total_minutes: 90,
  },
  {
    id: 7,
    name: 'James Anderson',
    workouts: [
      { type: 'Running', minutes: 20 },
      { type: 'Cycling', minutes: 40 },
    ],
    total_minutes: 60,
  },
  {
    id: 8,
    name: 'Ava Thompson',
    workouts: [
      { type: 'Cycling', minutes: 55 },
      { type: 'Yoga', minutes: 20 },
    ],
    total_minutes: 75,
  },
  {
    id: 9,
    name: 'Christopher Taylor',
    workouts: [
      { type: 'Swimming', minutes: 30 },
      { type: 'Running', minutes: 35 },
    ],
    total_minutes: 65,
  },
  {
    id: 10,
    name: 'Olivia Harris',
    workouts: [
      { type: 'Yoga', minutes: 25 },
      { type: 'Running', minutes: 40 },
    ],
    total_minutes: 65,
  },
];
