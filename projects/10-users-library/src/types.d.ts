interface UserName {
  first: string;
  last: string;
}

export interface User {
  id: string;
  name: UserName;
  gender: string;
  location: string;
  picture: string;
}

export interface State {
  users: User[];
  usersWithoutOrder: User[];
  usersOriginal: User[];
  country: string;
  sortBy: SortType;
  inverted: boolean;
}

export enum SortType {
  None = "",
  Country = "country",
  Name = "name",
  Last = "last",
}
