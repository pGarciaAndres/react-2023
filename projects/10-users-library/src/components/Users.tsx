import "./Users.scss";
import { SortType, User } from "../types.d";
import { ArrowIcon } from "./Icons";

type Props = {
  users: User[];
  sorted: SortType;
  inverted: boolean;
  onSort: (column: SortType) => void;
  onDelete: (id: string) => void;
};

function Users({ users, sorted, inverted, onSort, onDelete }: Props) {
  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleSort = (sortBy: SortType) => {
    debugger;
    onSort(sortBy);
  };

  return (
    <div className="users">
      <table>
        <thead className="table-head">
          <tr>
            <th>Foto</th>
            <th
              className={`column${inverted ? " column--inverted" : ""}`}
              onClick={() => handleSort(SortType.Name)}
            >
              Nombre {sorted === SortType.Name && <ArrowIcon />}
            </th>
            <th
              className={`column${inverted ? " column--inverted" : ""}`}
              onClick={() => handleSort(SortType.Last)}
            >
              Apellido {sorted === SortType.Last && <ArrowIcon />}
            </th>
            <th className={`column${inverted ? " column--inverted" : ""}`}>
              País {sorted === SortType.Country && <ArrowIcon />}
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="table-body">
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <img src={user.picture} alt={user.name.first} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Borrar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
