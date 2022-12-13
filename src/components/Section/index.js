import Task from "../Task/index";
import './styles.css';

const Section = ({section, addTask}) => {

    const {sectionLabel, tasks, id} = section;

    return (
        <div className='section-container'>
            <div className='head'>
                <div className='label'>{sectionLabel}</div>
                <button className='button' onClick={() => addTask(id)}>add task</button>
            </div>
            <div className='section'>
                {tasks ? tasks.map(task => (
                    <Task key={task.id} task={task} />
                )) : null}
            </div>
        </div>
    );
}

export default Section;
