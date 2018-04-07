import { Todo } from './Interfaces'

declare type ChangeCallback = (store: TodoStore) => void

export default class TodoStore {
  private static i = 0
  todos: Todo[] = []
  private callbacks: ChangeCallback[] = []

  static increment () {
    return this.i++
  }

  inform () {
    this.callbacks.forEach(cb => cb(this))
  }

  addTodo (title: string): void {
    this.todos = [{
      id: TodoStore.increment(),
      title: title,
      completed: false
    }, ...this.todos]
    this.inform()
  }

  onChange (cb: ChangeCallback) {
    this.callbacks.push(cb)
  }

  editTodo (todo: Todo, title: string): void {
    this.todos = this.todos.map(t => t === todo ? { ...t, title } : t)
    this.inform()
  }

  toggleTodo (todo: Todo): void {
    this.todos = this.todos.map(t => t === todo ? { ...t, completed: !t.completed } : t)
    this.inform()
  }

  toggleAll (completed = true): void {
    this.todos = this.todos.map(t => completed !== t.completed ? { ...t, completed } : t)
    this.inform()

  }

  cleanTodo (): void {
    this.todos = this.todos.filter(t => !t.completed)
    this.inform()
  }

  removeTodo (todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo)
    this.inform()
  }
}
