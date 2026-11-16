export interface Quest {
  id: number;
  title: string;
  value: number;
  completed: boolean;
}

export interface User {
  id? : number,
  name: string;
  level: number;
  gold: number;
}