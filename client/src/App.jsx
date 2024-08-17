import { useState } from 'react'
import Canvas from "./canvas/index";
import Home from "./pages/Home";
import Customiser from "./pages/Customizer";
function App() {
 
  return (
    <main className = "app transition-all ease-in">
      <Home/>
      <Canvas/>
      <Customiser/>
    
    </main>
  )
}

export default App
