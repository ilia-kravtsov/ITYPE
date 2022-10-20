import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";


export type TaskType = {
    id: number,
    title: string,
    isDone: boolean

}

export type FilterValuesType = 'all' | 'active' | 'completed'

// Read => part, pagination, filtration, sort

function App() {

    // BLL: (Здесь храним все данные, которые будем закидывать в TodoList) Данные:

    const todoListTitle: string = "What to learn"

    const [tasksForTodoList, setTasksForTodolist] = React.useState<Array<TaskType>>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & ES6", isDone: true},
        {id: 3, title: "REACT & TS", isDone: false},]
    )

    // логика апдейтов

    const removeTask = (taskId: number) => {
        const copyState = [...tasksForTodoList]
        let taskIndex = 0;
        for (let i = 0; i < copyState.length; i++) {
            if (copyState[i].id === taskId) {
                taskIndex = i
            }
        }
        if (taskIndex) {
            copyState.slice(taskIndex, 1)
        }

        // setTasksForTodolist(copyState);
        // copyState.splice(taskIndex, 1)
        setTasksForTodolist(tasksForTodoList.filter(task => task.id !== taskId))
        const changeFilter = (filter: FilterValuesType) => {
            setFilter(filter)
        }
    }
    // GUI: интерфейс для данных выше

    const [filter, setFilter] = React.useState<FilterValuesType>("completed")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let filteredtasks = tasksForTodoList
    if (filter === 'active') {
        filteredtasks = tasksForTodoList.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        filteredtasks = tasksForTodoList.filter(t => t.isDone === true)
    }
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredtasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
