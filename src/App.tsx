import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type TaskStateType = {
    [key: string]:Array<TasksType>
}

export function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'tl 1', filter: "all"},
        {id: todolistId2, title: 'tl 2', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "REST API", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "beer", isDone: true},
            {id: v1(), title: "milk", isDone: false},
            {id: v1(), title: "soda", isDone: false},
        ]
    })

    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title, isDone: false}
        let todolistTask = tasks[todolistId]
        let newTasks = [newTask, ...todolistTask]
        tasks[todolistId] = newTasks
        setTasks({...tasks})
    }

    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        let changeTask = tasks[todolistId].find(t => t.id === id)
        if (changeTask) {
            changeTask.isDone = isDone
        }

        setTasks({...tasks})
    }

    const removeTask = (id: string, todolistId: string) => {
        let resultTasks = tasks[todolistId].filter(task => task.id !== id)
        tasks[todolistId] = resultTasks
        setTasks({...tasks})
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (todolistId: string) => {
        let newTodolists = todolists.filter(tl => tl.id !== todolistId)

        setTodolists([...newTodolists])
    }

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]:[]
        })
    }

    return (
        <div className="App">
            <AddItemForm
                addItem={addTodolist}
            />
            {todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id]

                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true)
                }
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false)
                }

                return <TodoList
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    removeTodolist={removeTodolist}
                    filter={tl.filter}
                />
            })}
        </div>
    );
}


