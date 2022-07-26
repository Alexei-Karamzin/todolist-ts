import React, {useState} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditebleSpan";

type TodolistType = {
    todolistId: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    onChangeTitle: (todolistId: string, title: string) => void
    filter: FilterValueType
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export const TodoList = (props: TodolistType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeCheckboxHandler = (taskId: string, isDone: boolean, todolistId: string) => {
        props.changeStatus(taskId, isDone, todolistId)
    }

    const removeTodolistHandler = (todolistId: string) => {
        props.removeTodolist(todolistId)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
        console.log(title)
    }

    const onChangeTitleHandler = (title: string) => {
        props.onChangeTitle(props.todolistId,title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChangeInputSpan={onChangeTitleHandler} />
            </h3>
            <button onClick={() => removeTodolistHandler(props.todolistId)}>X</button>
            <AddItemForm
                addItem={addTask}
            />
            <ul>
                {
                    props.tasks.map((el) => {

                        const onChangeTitleHandler = (title: string) => {
                            props.changeTaskTitle(props.todolistId, el.id, title)
                        }

                        const removeTaskHandler = () => props.removeTask(el.id, props.todolistId)

                        return <li className={el.isDone ? 'isDone' : ''} key={el.id}>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={(e) => onChangeCheckboxHandler(el.id, e.currentTarget.checked, props.todolistId)}
                            />
                            <EditableSpan title={el.title} onChangeInputSpan={onChangeTitleHandler}/>
                            <button onClick={removeTaskHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? 'active-filter' : ''}
                    onClick={() => props.changeFilter("all", props.todolistId)}
                >All
                </button>
                <button
                    className={props.filter === "active" ? 'active-filter' : ''}
                    onClick={() => props.changeFilter("active", props.todolistId)}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? 'active-filter' : ''}
                    onClick={() => props.changeFilter("completed", props.todolistId)}
                >Completed
                </button>
            </div>
        </div>
    )
}


// react-scripts --openssl-legacy-provider start