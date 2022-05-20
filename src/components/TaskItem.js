import { createRef, useEffect } from 'react';
import Control from './Control';
import './TaskItem.css';

const TaskItem = props => {
    const { 
        taskGettingEdit,
        onUpdateCurrentValue,
        onUpdate,
        onDelete,
        onEditStart,
        onEditStop,
        taskItem,
    } = props;

    const {id, isCompleted, task} = taskItem;
    
    const isGettingEdit = id === taskGettingEdit.id;

    const textareaRef = createRef();


    const handleEditStart = e => {
        const textarea = textareaRef.current;
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
        onEditStart(taskItem);
    }

    const resizeTextarea = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
	    textarea.style.height = `${textarea.scrollHeight}px`;
    }

    useEffect(resizeTextarea, [taskGettingEdit.currentValue, textareaRef]);

    return (
        <li 
            className="task_item"
            onMouseEnter={resizeTextarea}
            onMouseLeave={resizeTextarea}
        >

            <label className="toggle_label">
                <input 
                    type="checkbox" 
                    onChange={() => onUpdate(id, task, !isCompleted)}
                    checked={isCompleted}
                />
            </label>

            <textarea 
                className={`task_text ${isCompleted ? 'completed' : ''}`} 
                value={isGettingEdit ? taskGettingEdit.currentValue : task }
                readOnly={!isGettingEdit}
                onInput={e => onUpdateCurrentValue(e.target.value)}
                rows={1}
                ref={textareaRef}
                onClick={!isGettingEdit ? (() => onUpdate(id, task, !isCompleted)) : null}
            ></textarea>

            <div className="controls">
                {!isGettingEdit ? (
                    <Control
                        action={e => handleEditStart(e)}
                        classNameValue="fas fa-pen"
                    />
                ) : (
                    <Control
                        action={() => onEditStop()} 
                        classNameValue="fas fa-save"
                    />
                )}
                <Control
                    action={() => onDelete(id)} 
                    classNameValue="fas fa-trash"
                />
            </div>
        </li>
    );
}

export default TaskItem;