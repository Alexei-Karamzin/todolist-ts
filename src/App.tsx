import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {Input} from "./input";
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'completed' | 'active'

export function App() {

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "REST API", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    const addTask = (title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        let newTasks = [newTask, ...tasks]

        setTasks(newTasks)
    }

    const removeTask = (id: string) => {
        let resultTasks = tasks.filter(task => task.id !== id)
        setTasks(resultTasks)
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }

    return (
        <div className="App">
            <TodoList
                title={'1111'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
            <Input title={'Train'}/>
        </div>
    );
}


