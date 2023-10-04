import { Todos } from "./components/Todos";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useTodos } from "./hooks/useTodos";

function App() {
  const {
    filterSelected,
    handleClearCompleted,
    handleComplete,
    handleFilterChange,
    handleRemove,
    handleAddTodo,
    handleUpdateTitle,
    todos: filteredTodos,
    completedCount,
    activeCount,
  } = useTodos();

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />
      <Todos
        onRemoveTodo={handleRemove}
        onToggleComplete={handleComplete}
        setTitle={handleUpdateTitle}
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
}

export default App;
