import React from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const tasksJSXItemsList = props.tasks.length
        ? <ul>
            {
                props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=>props.removeTask(task.id)}>Delete</button>
                        </li>
                    )
                })
            }
        </ul>
        : <span>Your list is empty</span>

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                {tasksJSXItemsList}
                <div>
                    <button onClick={()=>props.changeFilter('all')}>All</button>
                    <button onClick={()=>props.changeFilter('active')}>Active</button>
                    <button onClick={()=>props.changeFilter('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};