import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";

function App() {
  return (
    <main className="app">
      <section className="card">
        {/* Page header */}
        <div className="page-header">
          <div>
            <p className="small-label">Productivity App</p>
            <h1>Task Manager</h1>
            <p className="subtitle">
              Manage your daily tasks and organize them by priority.
            </p>
          </div>
        </div>

        {/* Main task sections */}
        <TaskForm />
        <FilterBar />
        <TaskList />
      </section>
    </main>
  );
}

export default App;
