import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todolist.module.scss'
export default function TodoList() {
  return (
    <div>
      todolist
      <TaskList />
      <TaskInput />
    </div>
  )
}
