import {createContext} from "react";
import {SECTIONS} from "../data";
import {useState} from 'react';
import {uid} from 'uid'
export const DropDownProvider = createContext();

const newTasks = (tasks, index, task, deleteItem = 0) => {
    tasks.splice(index, deleteItem, task)

    return tasks
};

const draggableTaskFilter = (config, chosenTaskId, whereChoseTaskIdMove) => {
    const {sectionId, taskId} = chosenTaskId;
    const {choseSectionId, choseTaskId} = whereChoseTaskIdMove;

    return config.map(section => {
        if (sectionId === choseSectionId) {
            const task = section.tasks.find(task => task.id === taskId);
            const array = section.tasks.filter(task => task.id !== taskId);
            const tasks = newTasks(array, choseTaskId, task)

            return {...section, tasks }
        }

        if (section.id === choseSectionId) {
            const choseTask = config
                .find(section => section.id === sectionId).tasks
                .find(task => task.id === taskId);

            const findTasksInSection = config.find(section => section.id === choseSectionId).tasks;
            const findTask = findTasksInSection?.find(el => el.id === choseTaskId);

            if (findTask) {
                const findIndex = findTasksInSection?.indexOf(findTask);

                return ({
                    ...section,
                    tasks: newTasks(section.tasks, findIndex, choseTask)
                })
            }

            return {...section, tasks: [ ...section.tasks, choseTask]}
        }
        if (section.id === sectionId) {
            const tasks = section.tasks.filter(task => task.id !== taskId);

            return {...section, tasks}
        }

        return section;
    })
}

const addNewTaskToSection = (config, id) => {
    return config.map(section => {
        const isSection = section.id === id;

        if (isSection) {
            const newTask = {
                name: 'New Task',
                id: uid()
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

    const draggableTask = (chosenTaskId, whereChoseTaskIdMove) => {

        setSectionsState((prevState => draggableTaskFilter(prevState, chosenTaskId, whereChoseTaskIdMove)))
    }

    const context = {
        sections: sectionsState,
        addSection,
        addTask,
        draggableTask,
    };

    return  <DropDownProvider.Provider value={context}>{children}</DropDownProvider.Provider>
}
