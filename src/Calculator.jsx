import { useState } from 'react'
import './Calculator.css'

const Calculator = () => {

  const calculateTxSize = () => {
    const inputSize = (legacyInputs * 148 + segwitInputs * 68 + taprootInputs * 57.5);
    const outputSize = (legacyOutputs * 31 + segwitOutputs * 31 + taprootOutputs + 43);
    const txSum = inputSize + outputSize + 10.5;
    setTxSize(txSum)
  }

  const [legacyInputs, setLegacyInputs] = useState(0)
  const handleChangeLegacyInputs = event => {
    setLegacyInputs(event.target.value) 
  }

  const [segwitInputs, setSegwitInputs] = useState(0)
  const handleChangeSegwitInputs = event => {
    setSegwitInputs(event.target.value) 
  }

  const [taprootInputs, setTaprootInputs] = useState(0)
  const handleChangeTaprootInputs = event => {
    setTaprootInputs(event.target.value) 
  }

  const [legacyOutputs, setLegacyOutputs] = useState(0)
  const handleChangeLegacyOutputs = event => {
    setLegacyOutputs(event.target.value) 
  }

  const [segwitOutputs, setSegwitOutputs] = useState(0)
  const handleChangeSegwitOutputs = event => {
    setSegwitOutputs(event.target.value) 
  }

  const [taprootOutputs, setTaprootOutputs] = useState(0)
  const handleChangeTaprootOutputs = event => {
    setTaprootOutputs(event.target.value) 
  }

  const [txSize, setTxSize] = useState();
  const handleSubmit = event => {
    event.preventDefault();
    calculateTxSize();
  }

  return (
    <>
      <form className="Calculator">
        <div className="Calculator-User-Input">
          <div className="Calculator-Box">
            <h2>Enter the number and type of your Inputs</h2>
            <label for="legacy-inputs">Legacy Inputs: </label>
            <input type="number" min="0" name="legacy-inputs" value={legacyInputs} onChange={handleChangeLegacyInputs} id="legacy-inputs" required />
            <label for="segwit-inputs">Segwit Inputs: </label>
            <input type="number" min="0" name="segwit-inputs" value={segwitInputs} onChange={handleChangeSegwitInputs} id="segwit-inputs" required />
            <label for="taproot-inputs">Taproot Inputs: </label>
            <input type="number" min="0" name="taproot-inputs" value={taprootInputs} onChange={handleChangeTaprootInputs} id="taproot-inputs" required />
          </div>
          <div className="Calculator-Box">
            <h2>Enter the number of the outputs</h2>
            <label for="legacy-outputs">Legacy Outputs: </label>
            <input type="number" min="0" name="legacy-outputs" id="legacy-outputs" value={legacyOutputs} onChange={handleChangeLegacyOutputs} />
            <label for="segwit-outputs">Segwit Outputs: </label>
            <input type="number" min="0" name="segwit-outputs" id="segwit-outputs" value={segwitOutputs} onChange={handleChangeSegwitOutputs} />
            <label for="taproot-outputs">Taproot Outputs: </label>
            <input type="number" min="0" name="taproot-outputs" id="taproot-outputs" value={taprootOutputs} onChange={handleChangeTaprootOutputs} />
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>Calculate!</button>
      </form>
      <h3>Size of your Transaction: {txSize}</h3>
    </>
  )
}

export default Calculator
