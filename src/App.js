import TasksManager from "./pages/TasksManager";
import { DropDownContext } from "./context/DropDown";


function App() {
    return (
        <DropDownContext>
            <div>helllom my mother</div>
            <TasksManager />
        </DropDownContext>
  );
}

export default App;
