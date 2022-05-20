import { useState } from 'react';
import './AddTaskForm.css';

const  AddTaskForm = props => {
    const [ inputValue, setInputValue ] = useState('');
    const { onAddTask } = props;

    const handleTaskSubmit = () =>{
        const task = inputValue.trim();

        if(task) {
            onAddTask(task);
        }

        setInputValue('');
    }

    const handleEnterKey = e => {
        if(e.key === "Enter") {
            handleTaskSubmit();
        }
    }

    return ( 
        <div className="add_task_form">
            <input 
                type="text" 
                value={inputValue}
                onInput={e => setInputValue(e.target.value)}
                onKeyPress={handleEnterKey}
                placeholder="Type here..."
            />
            <button
                className="fas fa-plus"
                onClick={handleTaskSubmit}
            ></button>
        </div>
    );
}

export default AddTaskForm;