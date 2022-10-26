import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from 'uuid';


export type TaskType = {
    id : string,
    title : string,
    isDone : boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

/*
Create
Read => part, pagination, filtration, sort
Update
Delete removeTask
*/

function App() {

    // BLL: (Здесь храним все данные, которые будем закидывать в TodoList) Данные:
    const todoListTitle: string = "What to learn"
    const [tasksForTodoList, setTasksForTodoList] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS & ES6", isDone: true},
        {id: v1(), title: "REACT & TS", isDone: false},
    ])
    const removeTask = (taskId: string) => {
        setTasksForTodoList (tasksForTodoList.filter(task => task.id !== taskId))
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const copyTasks = [...tasksForTodoList]
        // copyTasks.push(newTask)
        setTasksForTodoList([newTask, ...tasksForTodoList])
    }



    const [filter, setFilter] = useState<FilterValuesType>('all')
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {

        let filteredTasks = tasks;
        if (filterValue === 'active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === 'completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }

    const filteredTasks = getFilteredTasks(tasksForTodoList, filter)

    // GUI: интерфейс для данных выше:


    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
