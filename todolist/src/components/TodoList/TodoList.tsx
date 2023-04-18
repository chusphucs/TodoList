import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todolist.module.scss'
import { Todo } from '../../@types/todo.type'
import { useEffect, useState } from 'react'

interface HandleNewTodos {
  (todos: Todo[]): Todo[]
}

const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodoObj = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodoObj))
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setcurentTodo] = useState<Todo | null>(null)
  const doneTodos = todos.filter((todo) => todo.done)
  const NotdoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
    const handler = (todosObjt: Todo[]) => {
      return [...todosObjt, todo]
    }
    syncReactToLocal(handler)
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) {
      setcurentTodo(findedTodo)
    }
  }
  const editTodo = (name: string) => {
    setcurentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }
  const finishEditTodo = () => {
    const handler = (todoObject: Todo[]) => {
      return todoObject.map((todo) => {
        if (todo.id === currentTodo?.id) {
          return currentTodo as Todo
        }
        return todo
      })
    }
    setTodos(handler)
    setcurentTodo(null)
    syncReactToLocal(handler)
  }

  const deleteTodo = (id: string) => {
    if (currentTodo) {
      setcurentTodo(null)
    }
    const handler = (todoObj: Todo[]) => {
      const findIndexTodo = todoObj.findIndex((todo) => todo.id === id)
      if (findIndexTodo > -1) {
        const result = [...todoObj]
        result.splice(findIndexTodo, 1)
        return result
      }
      return todoObj
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }

  console.log(todos)
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList
          doneTaskList={false}
          todos={NotdoneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
