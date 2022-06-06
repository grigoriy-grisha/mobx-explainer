import './App.css';

import ObservableValueExample from './ObservableValueExample'
import ObservableObjectExample from "./ObservableObjectExample";
import ObservableArrayExample from "./ObservableArrayExample";

function App() {
  return (
    <div className="App">
      <ObservableValueExample/>
      <ObservableObjectExample/>
      <ObservableArrayExample />
    </div>
  );
}

export default App;
