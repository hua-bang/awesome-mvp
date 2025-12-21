import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import mfInstance from './mf-runtime';


mfInstance.loadRemote('mf_provider_demo').then(result => {
  if (result) {
    console.log('Remote module loaded:', result);
  }

  if (result.add) {
    console.log('Add result:', result.add(1, 2));
  }

  if (result.sub) {
    console.log('Subtract result:', result.sub(1, 2));
  }
});


const ButtonComponent = React.lazy(async () => {
  const res = await mfInstance.loadRemote('mf_provider_demo');
  const Button = res.Button;
  return Promise.resolve({ default: Button });
});

console.log('ButtonComponent:', ButtonComponent);


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <React.Suspense fallback={<div>Loading Button...</div>}>
        <ButtonComponent>
          <span onClick={() => {
            console.log('Button clicked!');
            setCount(count + 1);
          }}>Click Me!{count}</span>
        </ButtonComponent>
      </React.Suspense>
      <h1>Vite + React</h1>
      <button>test</button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
