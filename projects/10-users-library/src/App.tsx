import { useState } from "react";
import "./App.scss";
import Tools from "./components/Tools";
import Users from "./components/Users";
import { useUsers } from "./hooks/useUsers";
import { SortType } from "./types.d";

function App() {
  const {
    users,
    handleSortUsers,
    handleDeleteUser,
    handleResetUsers,
    handleSearchByCountry,
  } = useUsers();

  const [sorted, setSorted] = useState<SortType>(SortType.None);
  const [inverted, setInverted] = useState<boolean>(true);

  const handleSort = (sortBy: SortType) => {
    debugger;
    const nextInverted = sortBy === sorted ? !inverted : false;
    setInverted(nextInverted);
    setSorted(sortBy);

    handleSortUsers(sortBy, nextInverted);
  };

  return (
    <div className="app">
      <h1>User List</h1>
      <header style={{ marginBottom: "3em" }}>
        <Tools
          sorted={sorted}
          onSort={handleSort}
          onReset={handleResetUsers}
          onSearch={handleSearchByCountry}
        />
      </header>
      <main>
        <Users
          users={users}
          sorted={sorted}
          inverted={inverted}
          onSort={handleSort}
          onDelete={handleDeleteUser}
        />
      </main>
    </div>
  );
}

export default App;
