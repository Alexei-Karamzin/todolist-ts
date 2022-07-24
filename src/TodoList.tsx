import React, {useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";

type TodolistType = {
    title: string,
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export const TodoList = (props: TodolistType) => {

    const [title, setTitle] = useState('')

    const onChangeInputHandler = (newTitle: string) => {
        setTitle(newTitle)
    }

    const addTaskOnClickHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTaskOnClickHandler()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onKeyPress={(e)=>onKeyPressHandler(e)}
                    onChange={(e) => onChangeInputHandler(e.currentTarget.value)}
                />
                <button onClick={addTaskOnClickHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((el) => <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={() => props.removeTask(el.id)}>X</button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}