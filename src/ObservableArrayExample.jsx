import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {autorun, observableObject} from "./package/simple-mobx";


function useForceUpdate() {
  const [, updateState] = useState({});
  return useCallback(() => updateState({}), []);
}

function ObservableArrayExample() {
  const observableArray = useMemo(() => observableObject({array: [1, 2, 3, 4]}), [])
  const forceUpdate = useForceUpdate()
  const disposerRef = useRef()

  useEffect(() => {
    disposerRef.current = autorun(() => {
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
      <div onClick={() => {

        disposerRef.current && disposerRef.current()
        console.log(observableArray.array)
      }}>dispose
      </div>
    </div>
  )
}

export default ObservableArrayExample
