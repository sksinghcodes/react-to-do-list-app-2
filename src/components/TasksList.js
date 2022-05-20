import { Fragment } from 'react';
import TaskItem from './TaskItem';
import './TasksList.css';

const TasksList = props => ( 
    <ul className="tasks_list">
        {props.taskList.map(taskItem => (
            <Fragment key={taskItem.id}>
                <TaskItem
                    taskItem={taskItem}
                    onDelete={props.onDelete}
                    onUpdate={props.onUpdate}
                    onEditStart={props.onEditStart}
                    onEditStop={props.onEditStop}
                    onUpdateCurrentValue={props.onUpdateCurrentValue}
                    taskGettingEdit={props.taskGettingEdit}
                /> 
            </Fragment>
        ))}
    </ul>
);

export default TasksList;