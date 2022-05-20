import AddTaskForm from './components/AddTaskForm';
import TasksList from './components/TasksList';
import { useState, useEffect } from 'react'; 
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const updateLocalStorage = taskList => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

const App = () => {
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('taskList')) || []);
    const [taskGettingEdit, setTaskGettingEdit] = useState({
        id: '',
        originalValue: '',
        currentValue: '',
        isCompleted: false,
    });

    useEffect(function(){
        updateLocalStorage(taskList);
    }, [taskList]); 

    const addTask = task => {
        const newTaskList = [
            ...taskList,
            {
                task: task,
                isCompleted: false,
                id: uuidv4()
            }
        ];
    
        setTaskList(newTaskList)
    }

    const deleteTask = id => {
        const newTaskList = taskList.filter(taskItem => taskItem.id !== id);
        setTaskList(newTaskList);
    }

    const updateTask = (id, task, isCompleted) => {
        const newTaskList = taskList.map(taskItem => {
            if (taskItem.id === id) {
                return { id, task, isCompleted }
            } else {
                return {...taskItem}
            }
        });

        setTaskGettingEdit({
            id: '',
            originalValue: '',
            currentValue: '',
            isCompleted: false,
        });
    
        setTaskList(newTaskList);
    }

    const startEditingTask = taskItem => {
        if(taskGettingEdit.id) {
            stopEditingTask();
        }
        const {id, task, isCompleted} = taskItem;
        const newTaskGettingEdit = { 
            id, 
            originalValue: task, 
            currentValue: task,
            isCompleted,
        };
        setTaskGettingEdit(newTaskGettingEdit);
    }

    const stopEditingTask = () => {
        const {id, originalValue, currentValue, isCompleted} = taskGettingEdit;
        const task = currentValue.trim() || originalValue;
        updateTask(id, task, isCompleted)
    }

    const updateCurrentValue = currentValue => {
        const newTaskGettingEdit = {...taskGettingEdit};
        newTaskGettingEdit.currentValue = currentValue;
        setTaskGettingEdit(newTaskGettingEdit)
    }

    return (
        <div className="app">
            <AddTaskForm
                onAddTask={addTask}
            />
            <TasksList
                taskList={taskList}
                onDelete={deleteTask}
                onUpdate={updateTask}
                onEditStart={startEditingTask}
                onEditStop={stopEditingTask}
                onUpdateCurrentValue={updateCurrentValue}
                taskGettingEdit={taskGettingEdit}
            />
        </div>
    );
}

export default App;