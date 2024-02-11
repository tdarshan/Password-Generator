import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  // Password info states
  const [length, setLength] = useState(8);
  const [numsAllowed, setNumsAllowed] = useState(true);
  const [charsAllowed, setCharsAllowed] = useState(true);

  // Password String state
  const [password, setPassword] = useState("");

  // Reference
  const passwordRef = useRef(null);

  // Password Generator function
  const passowrdGenerator = useCallback(() => {

    let pass = "";


    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*(){}[]?~|+=_-";

    if(numsAllowed) {
      str += numbers;
    }
    if(charsAllowed) {
      str += symbols;
    }


    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    
    setPassword(pass);
  }, [length, numsAllowed, charsAllowed, setPassword]);


  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);


  useEffect(() => {
    passowrdGenerator();
  }, [length, numsAllowed, charsAllowed, passowrdGenerator]);

  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-300 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button 
            className='outline-none cursor-copy bg-blue-700 text-white px-3 py-1 shrink-0'
            onClick={copyPassword}  
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col text-sm gap-x-2">
          <div className="flex gap-x-1 items-center">
            <input 
              type="range" 
              className='cursor-pointer'
              min={8} 
              max={20} 
              value={length} 
              id="length"
              onChange={(e) => setLength(e.target.value)} 
            />
            <label htmlFor="length">Length: {length}</label>
          </div>

          <div className='flex gap-x-1 items-center'>
            <input 
              type="checkbox"
              defaultChecked={numsAllowed}
              id="numberInput"
              onChange={() => setNumsAllowed((prev) => !prev)} 
            />
            <label htmlFor="numberInput">Numbers Allowed</label>
          </div>

          <div className='flex gap-x-1 items-center'>
            <input 
              type="checkbox"
              defaultChecked={charsAllowed}
              id="symbolInput"
              onChange={() => setCharsAllowed((prev) => !prev)} 
            />
            <label htmlFor="symbolInput">Symbols Allowed</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
