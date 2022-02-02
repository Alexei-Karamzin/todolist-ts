import React from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {Input} from "./input";


export function App() {
    const tasks1: Array<TasksType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]
    const tasks2: Array<TasksType> = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: true},
        {id: 3, title: "Yo", isDone: false}
    ]

    return (
        <div className="App">
            <TodoList title={'1111'} tasks={tasks1}/>
            <TodoList title={'2222'} tasks={tasks2}/>
            <Input title={'Train'} />
        </div>
    );
}


