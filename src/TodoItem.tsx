import * as React from 'react'
import * as cx from 'classnames'
import { Todo } from './Interfaces'

interface Props {
  todo: Todo
  onToggle: (todo: Todo) => void
  onDestroy: (todo: Todo) => void
  onUpdate: (todo: Todo, title: string) => void
}

interface State {
  editing: boolean,
  title: string
}

export default class TodoItem extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      editing: false,
      title: ''
    }
  }
  render () {
    let { todo } = this.props
    let { editing, title } = this.state
    return <li className={cx({ completed: todo.completed, editing })}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={this.toggle} checked={todo.completed}/>
        <label onDoubleClick={this.startEditing}>{todo.title}</label>
        <button className="destroy" onClick={this.destroy}></button>
      </div>
      <input
          type="text"
          className="edit"
          value={title}
          onBlur={this.handleSubmit}
          onKeyDown={this.handleKeyDown}
          onInput={this.handleInput}
      />
    </li>
  }

  toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onToggle(this.props.todo)
  }

  destroy = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onDestroy(this.props.todo)
  }

  startEditing = (e: React.MouseEvent<HTMLLabelElement>) => {
    this.setState({ editing: true, title: this.props.todo.title })
  }

  handleSubmit = () => {
    this.props.onUpdate(this.props.todo, this.state.title)
    this.setState({ editing: false })
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ('Escape' === e.key) {
      this.setState({ editing: false })
    } else if ('Enter' === e.key) {
      this.handleSubmit()
    }
  }

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ title: (e.target as HTMLInputElement).value })
  }
}
