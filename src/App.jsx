import "bootstrap/dist/css/bootstrap.min.css";
import {useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()_+-?/{}|:<>;.,~[]";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, charAllow, passwordGenerator]);

  return (
    <>
      <div className="container vh-100 bg-light d-flex flex-column justify-content-center align-items-center">
        <div
          className="card shadow p-4"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <h1 className="text-center mb-4 text-primary">Password Generator</h1>

          <div className="input-group mb-3">
            <input
              type="text"
              readOnly
              className="form-control"
              placeholder="Password"
              value={password}
              ref={passRef}
            />
            <button className="btn btn-primary" onClick={copyPassword}>
              Copy
            </button>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Password Length: {length}
            </label>
            <input
              type="range"
              className="form-range"
              min={6}
              max={25}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={numAllow}
              id="numInput"
              onChange={() => setNumAllow((prev) => !prev)}
            />
            <label className="form-check-label">Include Numbers</label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={charAllow}
              id="charInput"
              onChange={() => setCharAllow((prev) => !prev)}
            />
            <label className="form-check-label">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
