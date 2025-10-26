import { Task } from "@/entities/Task";
import StorageUtil from "@/utils/StorageUtil";

class TaskService {
  public static getAll = () => {
    const tasks = StorageUtil.load('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  public static get = (id: number) => {
    const tasks = this.getAll();
    return tasks.find((task: Task) => task.id === id) || null;
  }

  public static saveAll = (data: Task[]) => {
    StorageUtil.save('tasks', JSON.stringify(data));
  }

  public static save = (data: Task) => {
    const tasks = this.getAll();
    const existingTaskIndex = tasks.findIndex((task: Task) => task.id === data.id);

    if (existingTaskIndex !== -1) {
      tasks[existingTaskIndex] = { ...tasks[existingTaskIndex], data };
    } else {
      tasks.push(data);
    }

    StorageUtil.save('tasks', JSON.stringify(tasks));
  }

  public static remove = (id: number) => {
    const tasks = this.getAll();
    const filteredTasks = tasks.filter((task: Task) => task.id !== id);
    this.saveAll(filteredTasks);
  }
}

export default TaskService;
