import React, {useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";

type TodolistType = {
    todolistId: string,
    title: string,
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
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

    const onChangeInputHandler = (newTitle: string) => {
        setTitle(newTitle)
        setError(null)
    }

    const addTaskOnClickHandler = () => {
        if (title.trim() !== ''){
            props.addTask(title.trim(), props.todolistId)
            setTitle('')
        } else {
            setError('error')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTaskOnClickHandler()
        }
    }

    const onChangeCheckboxHandler = (taskId: string, isDone: boolean, todolistId: string) => {
        props.changeStatus(taskId,isDone,todolistId)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onKeyPress={(e) => onKeyPressHandler(e)}
                    onChange={(e) => onChangeInputHandler(e.currentTarget.value)}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTaskOnClickHandler}>+</button>
                {error && <div className={'error-message'}>Field is required</div>}
            </div>
            <ul>
                {
                    props.tasks.map((el) => <li className={el.isDone ? 'isDone' : ''} key={el.id}>
                        <input
                            type="checkbox"
                            checked={el.isDone}
                            onChange={(e)=>onChangeCheckboxHandler(el.id,e.currentTarget.checked, props.todolistId)}
                        />
                        <span>{el.title}</span>
                        <button onClick={() => props.removeTask(el.id, props.todolistId)}>X</button>
                    </li>)
                }
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? 'active-filter' : ''}
                    onClick={() => props.changeFilter("all", props.todolistId)}
                >All</button>
                <button
                    className={props.filter === "active" ? 'active-filter' : ''}
                    onClick={() => props.changeFilter("active", props.todolistId)}
                >Active</button>
                <button
                    className={props.filter === "completed" ? 'active-filter' : ''}
                    onClick={() => props.changeFilter("completed", props.todolistId)}
                >Completed</button>
            </div>
        </div>
    )
}