import './app.css';
import Box from "./components/Box";
import Draggable from './components/Draggable';

function App() {
    return (
        <div>
            <Draggable>
                <Box />
            </Draggable>
        </div>
    );
}

export default App;