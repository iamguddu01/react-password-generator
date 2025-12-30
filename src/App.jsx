import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
const [length, setLength] = useState(8);
const [numsAllow, setNumsAllow] = useState(false);
const [charAllow, setCharAllow] = useState(false);
const [password, setPassword] = useState("");

const passwordRef = useRef(null)

const passwordGenerator = useCallback(() => {
  let pass = ""
  let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
  if(numsAllow) str += "0987654321"
  if(charAllow) str += "!@#$%^&*(){}:<>?"

  for(let i = 1; i <= length; i++){
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
  }

  setPassword(pass)

}, [length, numsAllow, charAllow, setPassword])

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select()
  // passwordRef.current?.setSelectionRange()
  window.navigator.clipboard.writeText(password)
}, [password])

useEffect(() => {passwordGenerator}, [length, numsAllow, charAllow, passwordGenerator])

  return (
    <>
      <h1 className='text-4xl text-center text-white mt-10'>Password Generator</h1>
      <div className='w-full max-w-md mx-auto p-3 shadow-md rounded-lg my-8 text-gray-600 bg-gray-800'>
        <div className='flex shadow rounded-lg bg-amber-100 mt-2 overflow-hidden mb-4'>
          <input
           type="text"
           value={password}
           className='outline-none w-full py-1 px-3'
           placeholder='Password'
           readOnly
           ref={passwordRef}
          />
          <button className='outline-none p-2 cursor-pointer text-white shrink-0 bg-blue-600'
          onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min = {6}
            max = {30}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label className='m-1 px-1 text-white' >Length:{length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            defaultChecked = {numsAllow}
            id='numberInput'
            className='cursor-pointer'
            onChange={() => {setNumsAllow((prev) => !prev);
            }}
            />
            <label className='text-white'>Numbers</label>
          </div>

            <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked = {charAllow}
              id='charInput'
              className='cursor-pointer'
              onChange={() => {setCharAllow((prev) => !prev);
            }}
              />
              <label className='text-white'>Character</label>
            </div>

        </div>

      </div>
    </>
  )
}

export default App
