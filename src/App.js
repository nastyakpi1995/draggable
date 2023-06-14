import TasksManager from "./pages/TasksManager";
import { DropDownContext } from "./context/DropDown";


function App() {
    return (
        <DropDownContext>
            <TasksManager />
        </DropDownContext>
  );
}

export default App;
