import React from "react";
import {FilterValueType} from "./App";

type TodolistType = {
    title: string,
    tasks: Array<TasksType>
    removeTask: (id:number)=>void
    changeFilter: (value: FilterValueType)=>void
}

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

export const TodoList = (props: TodolistType) => {



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((el) => <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                        <button onClick={() => props.removeTask(el.id)}>X</button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={()=>props.changeFilter("all")}>All</button>
                <button onClick={()=>props.changeFilter("active")}>Active</button>
                <button onClick={()=>props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}