import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const PassGenrotor = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLEMNOPQRSTWXYZabcdefghijklmnopqrstwxyz";
    if (numAllow) str += "123456789";
    if (charAllow) str += "!@#$%^&*_{}</>";

    for (let i = 1; i <= length; i++) {
      let Random = Math.floor(Math.random() * str.length - 1);
      pass += str.charAt(Random);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  useEffect(() => {
    PassGenrotor();
  }, [length, numAllow, charAllow, PassGenrotor]);

  const passwordRef = useRef(null);
  const copyPasswordClipBord = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 51);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <div className="pb-3  bg-gray-500 xl:w-[750px] m-auto rounded-2xl">
        <h1 className="xl:text-5xl sm:text-2xl text-[#ffffff] font-bold text-center mt-24">
          Pasword Generator
        </h1>
        <br />
        <div className="m-auto xl:w-[700px] h-auto  sm:w-[490px]p-2.5 flex ">
          <input
            type="text"
            className="xl:w-[550px] bg-white outline-0 rounded-l-[5px] pl-2 text-2xl"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            className="w-[150px] h-[50px] bg-blue-600 text-white hover:bg-blue-500 rounded-r-[5px]"
            onClick={copyPasswordClipBord}
          >
            Copy
          </button>
        </div>
        <br />
        <div className="m-auto xl:w-[700px] h-auto sm:w-[490px] flex justify-between text-white">
          <div>
            <input
              type="range"
              className="mr-[10px]"
              min={0}
              max={50}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="Number">Length ({length})</label>
          </div>
          <div>
            <input
              type="checkbox"
              className="mr-[10px]"
              onChange={() => setNumAllow((prev) => !prev)}
            />
            <label htmlFor="Number">Number</label>
          </div>
          <div>
            <input
              type="checkbox"
              className="mr-[10px]"
              onChange={() => setCharAllow((prev) => !prev)}
            />
            <label htmlFor="Number">Charactor</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
