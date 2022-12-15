import { useContext } from "react";
import {DropDownProvider} from "../../context/DropDown";
import Section from "../../components/Section/index";
import './styles.css';

const TasksManager = () => {
    const {sections, addSection, addTask, draggableTask } = useContext(DropDownProvider);

    return (
            <div>
                <div className='title'>Task manager</div>
                <div className='sections'>
                    {sections?.map((section) => (
                        <Section key={section.id} section={section} addTask={addTask} draggableTask={draggableTask} />
                    ))}
                    <div onClick={addSection} className='add_section'>
                        <button>Add Section +</button>
                    </div>
                </div>
            </div>
    );
}

export default TasksManager;
