import Task from "../Task/index";
import './styles.css';
import { useState } from "react";

const Section = ({section, addTask, draggableTask}) => {
    const {sectionLabel, tasks, id} = section;
    const [choseTaskId, setChoseTaskId] = useState(null)

    const onDragStart = (e, taskId) => {
        const data = {sectionId: id, taskId: taskId}
        e.dataTransfer.setData('Text', JSON.stringify(data))
    }
    const onDrop = (e) => {
        e.preventDefault();
        const dataTransfer = JSON.parse(e.dataTransfer.getData('Text'));
        const whereChoseTaskIdMove = {
            choseSectionId: id,
            choseTaskId: choseTaskId,
        }
        draggableTask(dataTransfer, whereChoseTaskIdMove)
    }
    const onDragSectionOver = (e) => {
        e.preventDefault();
    }

    const onDragTaskOver = (e, id) => {
        e.preventDefault();
        setChoseTaskId(id);
    }

    return (
        <div className='section-container'
             onDrop={onDrop}
             onDragOver={onDragSectionOver}
        >
            <div className='head'>
                <div className='label'>{sectionLabel}</div>
                <button className='button' onClick={() => addTask(id)}>add task</button>
            </div>
            <div className='section'>
                {tasks ? tasks.map(task => (
                    <Task onDragTaskOver={onDragTaskOver} onDragStart={onDragStart} key={task.id} task={task} />
                )) : null}
            </div>
        </div>
    );
}

export default Section;
