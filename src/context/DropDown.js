import {createContext} from "react";
import {SECTIONS} from "../data";
import {useState} from 'react';

export const DropDownProvider = createContext();

const addNewTaskToSection = (config, id) => {
    return config.map(section => {
        const isSection = section.id === id;

        if (isSection) {
            const newTaskId = section.tasks[section?.tasks?.length - 1] ? section.tasks[section?.tasks?.length - 1].id + 1 : 1;

            const newTask = {
                name: 'New Task',
                id: newTaskId + 1
            }
            const newSection = {
                ...section,
                tasks: [...section.tasks, newTask]
            }

            return newSection
        }
        return section
    });
}

export const DropDownContext = ({children}) => {
    const [sectionsState, setSectionsState] = useState(SECTIONS);

    const addSection = () => {
        const createId = sectionsState[sectionsState.length - 1] ? sectionsState[sectionsState.length - 1].id + 1 : 1;

        const newSection = {
            tasks: [],
            sectionLabel: 'New Section',
            id: createId
        }

        const newData = [...sectionsState, newSection]
        setSectionsState(newData)
    }

    const addTask = (id) => {
        setSectionsState((prevState => addNewTaskToSection(prevState, id)))
    }
    const context = {
        sections: sectionsState,
        addSection,
        addTask
    };

    return  <DropDownProvider.Provider value={context}>{children}</DropDownProvider.Provider>
}
