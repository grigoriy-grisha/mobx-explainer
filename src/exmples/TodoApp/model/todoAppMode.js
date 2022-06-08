function idGenerator() {
  let id = 0;
  return () => ++id;
}

const getNextId = idGenerator();

export class TodoAppModel {
  constructor() {
    this.todos = [];
  }

  addTodo(title) {
    this.todos.push({ title, id: getNextId(), complete: false });
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  toggleTodo(id) {
    const foundTodo = this.todos.find((todo) => todo.id === id);
    if (!foundTodo) return;

    foundTodo.complete = !foundTodo.complete;
  }
}
