import './styles.css';

const Index = ({task}) => {

    return (
        <div draggable={true}
             onDragEnd={(e) => {}}
             onDrag={(e) => {}}
             onDragEnter={(e) => console.log({e}, 'onDragEnter')}
             className='task'><div>{task.name}</div>
        </div>
    );
}

export default Index;
