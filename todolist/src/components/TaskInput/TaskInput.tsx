import { useState } from 'react'
import styles from './taskinput.module.scss'
import { Todo } from '../../@types/todo.type'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}

function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  return (
    <div>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        />
        <button type='submit'>{currentTodo ? '✔' : '➕'}</button>
      </form>
    </div>
  )
}

export default TaskInput
