import StorageUtil from "@/utils/StorageUtil";

class TaskService {
  public getAll = () => {
    const tasks = StorageUtil.load('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  public get = (taskId: string) => {
    const tasks = this.getAll();
    return tasks.find((task: any) => task.id === taskId) || null;
  }

  public saveAll = (tasks: any[]) => {
    StorageUtil.save('tasks', JSON.stringify(tasks));
  }

  public save = (taskId: string, taskData: any) => {
    const tasks = this.getAll();
    const existingTaskIndex = tasks.findIndex((task: any) => task.id === taskId);

    if (existingTaskIndex !== -1) {
      tasks[existingTaskIndex] = { ...tasks[existingTaskIndex], ...taskData };
    } else {
      tasks.push({ id: taskId, ...taskData });
    }

    StorageUtil.save('tasks', JSON.stringify(tasks));
  }

  public remove = (taskId: string) => {
    const tasks = this.getAll();
    const filteredTasks = tasks.filter((task: any) => task.id !== taskId);
    this.saveAll(filteredTasks);
  }
}

export default TaskService;
