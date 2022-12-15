import './styles.css';

const Index = ({task, onDragStart, onDragTaskOver}) => {
    return (
        <div draggable={true}
             onDragOver={(e) => onDragTaskOver(e, task.id)}
             onDragStart={(e) => onDragStart(e, task.id)}
             className='task'><div><div>{task.id}</div>{task.name}</div>
        </div>
    );
}

export default Index;
