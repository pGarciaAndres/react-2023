import { useEffect, useState } from "react";
import { SortType, State, User } from "../types.d";

export const useUsers = () => {
  const initialState: State = {
    users: [],
    usersWithoutOrder: [],
    usersOriginal: [],
    country: "",
    sortBy: SortType.None,
    inverted: false,
  };

  const [state, setState] = useState<State>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0); // Pagination & Infinite Scroll

  const mapResultToUsers = (result: any[]): User[] => {
    return result?.map((item: any) => {
      return {
        id: item?.login?.uuid ?? "0",
        gender: item.gender,
        name: {
          first: item.name.first,
          last: item.name.last,
        },
        location: item.location.country,
        picture: item.picture.thumbnail,
      };
    });
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(false);
    const URL = `https://randomuser.me/api/?results=5&page=${currentPage}`;
    try {
      const res = await fetch(URL);
      if (!res.ok) throw new Error("Error fetching");
      const { results } = await res.json();
      const users: User[] = mapResultToUsers(results);
      return users;
    } catch (error) {
      console.error("Error: ", error);
      setError(true);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers().then((users) =>
      setState({
        ...state,
        users: sortUsers(
          state.users.concat(users),
          state.sortBy,
          state.inverted
        ),
        usersWithoutOrder: state.usersWithoutOrder.concat(users),
        usersOriginal: state.usersOriginal.concat(users),
      })
    );
  }, [currentPage]);

  const filterUsers = () => {
    if (state.country.length === 0) {
      return state.users;
    }

    const filteredUsers = state.users.slice();
    return filteredUsers.filter((users) =>
      users.location
        .toLocaleLowerCase()
        .startsWith(state.country.toLocaleLowerCase())
    );
  };

  const sortUsers = (
    users: User[],
    sortBy: SortType,
    inverted: boolean
  ): User[] => {
    switch (sortBy) {
      case SortType.Country:
        return users.sort((a, b) => {
          const locA = a.location;
          const locB = b.location;
          return locA > locB ? 1 : -1;
        });
      case SortType.Name:
        return users.sort((a, b) => {
          inverted ? ([a, b] = [b, a]) : ([a, b] = [a, b]);
          const locA = a.name.first
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          const locB = b.name.first
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

          return locA > locB ? 1 : -1;
        });
      case SortType.Last:
        return users.sort((a, b) => {
          inverted ? ([a, b] = [b, a]) : ([a, b] = [a, b]);
          const locA = a.name.last
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          const locB = b.name.last
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

          return locA > locB ? 1 : -1;
        });
      default:
        return users;
    }
  };

  const handleSortUsers = (sortBy: SortType, inverted = false): void => {
    const sort = sortBy !== SortType.None;
    const copy = state.users.slice();
    setState({
      ...state,
      users: sort ? sortUsers(copy, sortBy, inverted) : state.usersWithoutOrder,
      sortBy: sortBy,
      inverted: inverted,
    });
  };

  const handleDeleteUser = (id: string): void => {
    const indexOrder = state.users.findIndex((user) => user.id === id);
    const index = state.usersWithoutOrder.findIndex((user) => user.id === id);

    setState({
      ...state,
      users: [
        ...state.users.slice(0, indexOrder),
        ...state.users.slice(indexOrder + 1),
      ],
      usersWithoutOrder: [
        ...state.usersWithoutOrder.slice(0, index),
        ...state.usersWithoutOrder.slice(index + 1),
      ],
    });
  };

  const handleResetUsers = (): void => {
    const original = state.usersOriginal.slice();
    const sorted = state.sortBy !== SortType.None;

    setState({
      ...state,
      users: sorted
        ? sortUsers(original, state.sortBy, state.inverted)
        : original,
      usersWithoutOrder: state.usersOriginal,
    });
  };

  const handleSearchByCountry = (country: string): void => {
    setState({
      ...state,
      country: country,
    });
  };

  const handleLoadResults = (): void => {
    setCurrentPage(currentPage + 1);
  };

  return {
    users: filterUsers(),
    loading,
    error,
    handleSortUsers,
    handleDeleteUser,
    handleResetUsers,
    handleSearchByCountry,
    handleLoadResults,
  };
};
