import {useCallback, useEffect, useMemo, useState} from 'react'
import {autorun} from "./package/simple-mobx";
import {observable} from "./package/simple-mobx/observable";


function useForceUpdate() {
  const [, updateState] = useState({});
  return useCallback(() => updateState({}), []);
}

function ObservableArrayExample() {
  const observableArray = useMemo(() => observable({array: [1, 2, 3, 4]}), [])
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    autorun(() => {
      /**
       * мы тут должны обратиться ко всем элементами, чтобы привязать массив к autorun
       */
      observableArray.array.forEach(item => item)
      forceUpdate()
    })
  }, [])

  function addElement() {
    observableArray.array.push(1)
  }

  return (
    <div>
      {observableArray.array.map((item, index) => (<div key={index}>{item} </div>))}
      <div onClick={addElement}>addElement</div>
    </div>
  )
}

export default ObservableArrayExample
