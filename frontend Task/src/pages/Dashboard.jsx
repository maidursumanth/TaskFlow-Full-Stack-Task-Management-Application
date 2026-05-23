import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, SetEditingTask] =useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
  });

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create Task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      if(editingTask){
        await API.put(`/tasks/${editingTask.id}`, form);
        alert("Task Updated");
      }else{
        await API.post("/tasks", form);
        alert("Task Created");
      }

      setForm({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        due_date: ""
      });

      SetEditingTask(null)
      fetchTasks();
    } catch(err){
      alert("Operation Failed");
    }

  };

  // Update Task
  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: task.due_date || ""
    });

    SetEditingTask(task);
  }

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Task Dashboard</h2>

        {/* Add Task Form */}
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 shadow rounded">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 mr-2"
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 mr-2"
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border p-2 mr-2"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="border p-2 mr-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            value={form.due_date || ""}
            onChange={(e) => setForm({...form, due_date: e.target.validationMessage})}
            className="border p-2 mr-2"
          />

          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Task
          </button>
        </form>

        {/* Task List */}
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 shadow rounded">
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <p>Due Date: {task.due_date}</p>

              <button
                onClick={() => handleEdit(task)}
                className="mt-2 mr-2 bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
