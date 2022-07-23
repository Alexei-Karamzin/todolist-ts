import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {Input} from "./input";

export type FilterValueType = 'all' | 'completed' | 'active'

export function App() {

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "NEW", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (id: number) => {
        let resultTasks = tasks.filter(task => task.id !== id)
        setTasks(resultTasks)
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if(filter === 'completed'){
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }
    if(filter === 'active'){
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }

    return (
        <div className="App">
            <TodoList
                title={'1111'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            <Input title={'Train'}/>
        </div>
    );
}


