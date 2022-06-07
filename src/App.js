import ObservableValueExample from './ObservableValueExample'
import ObservableObjectExample from "./ObservableObjectExample";
import {useState} from "react";
import ObservableArrayExmpl from "./ObservableArrayExmpl";
import {globalExmpleState} from "./globalExmpleState";

function App() {
    const [state, setState] = useState(true)

    // Для проверки отписок
    console.log(globalExmpleState)
    return (
        <div className="App">
            <ObservableValueExample/>
            <ObservableObjectExample/>
            {state && <ObservableArrayExmpl/>}
            <div onClick={() => setState(prevState => !prevState)}>
                toggle
            </div>
        </div>
    );
}

export default App;
