import {useMemo} from "react";
import {observer} from "./package/simple-mobx-react";
import {globalExmpleState} from "./globalExmpleState";


function ObservableArrayExmpl() {

  function addElement() {
    globalExmpleState.array.push(1)
  }

  return (
    <div>
      {globalExmpleState.array.map((item, index) => (<div key={index}>{item} </div>))}
      <div onClick={addElement}>addElement</div>
    </div>
  )
}

export default observer(ObservableArrayExmpl)
