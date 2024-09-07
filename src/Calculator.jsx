import { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [sumInputsSize, setSumInputSize] = useState(0);
  const [sumOutputsSize, setSumOutputsSize] = useState(0)
  const [txSize, setTxSize] = useState(0);
  const [legacyInputs, setLegacyInputs] = useState(0);
  const [segwitInputs, setSegwitInputs] = useState(0);
  const [taprootInputs, setTaprootInputs] = useState(0);
  const [legacyOutputs, setLegacyOutputs] = useState(0);
  const [segwitOutputs, setSegwitOutputs] = useState(0);
  const [taprootOutputs, setTaprootOutputs] = useState(0);
  const [futureFee, setFutureFee] = useState(1);
  const [futurePrice, setFuturePrice] = useState(100000);
  const [priceSum, setPriceSum] = useState(1);

  useEffect(() => {
    const inputSize = (legacyInputs * 148 + segwitInputs * 68 + taprootInputs * 57.5);
    setSumInputSize(inputSize);
  }, [legacyInputs, segwitInputs, taprootInputs]);

  useEffect(() => {
    const outputSize = (legacyOutputs * 148 + segwitOutputs * 68 + taprootOutputs * 57.5);
    setSumOutputsSize(outputSize);
  }, [legacyOutputs, segwitOutputs, taprootOutputs]);

  useEffect(() => {
    const txSum = sumInputsSize + sumOutputsSize + 10.5;
    setTxSize(txSum);
  }, [sumInputsSize, sumOutputsSize]);

  useEffect(() => {
    const price = txSize * futureFee * futurePrice / 100000000
    setPriceSum(price.toFixed(2));
  }, [futureFee, futurePrice, txSize])

  const handleChangeLegacyInputs = event => {
    setLegacyInputs(parseInt(event.target.value) || 0);
  };

  const handleChangeSegwitInputs = event => {
    setSegwitInputs(parseInt(event.target.value) || 0);
  };

  const handleChangeTaprootInputs = event => {
    setTaprootInputs(parseInt(event.target.value) || 0);
  };

  const handleChangeLegacyOutputs = event => {
    setLegacyOutputs(parseInt(event.target.value) || 0);
  };

  const handleChangeSegwitOutputs = event => {
    setSegwitOutputs(parseInt(event.target.value) || 0);
  };

  const handleChangeTaprootOutputs = event => {
    setTaprootOutputs(parseInt(event.target.value) || 0);
  };

  const handleChangeFutureFees = event => {
    setFutureFee(parseInt(event.target.value) || 0);
  }

  const handleChangeFuturePrice = event => {
    setFuturePrice(parseInt(event.target.value) || 0);
  }

  const handleReset = () => {
    setLegacyInputs(0)
    setSegwitInputs(0)
    setTaprootInputs(0)
    setLegacyOutputs(0)
    setSegwitOutputs(0)
    setTaprootOutputs(0)
    setFutureFee(1)
    setFuturePrice(100000)
  }

  return (
    <>
      <div className="Calculator">
        <div className="Calculator-User-Input">
          <div className="Calculator-Box">
            <h2>Enter the number and type of your Inputs</h2>
            <h3>Size of inputs: {sumInputsSize}vByte</h3>
            <label htmlFor="legacy-inputs">Legacy Inputs (+148 vByte): </label>
            <input
              type="number"
              name="legacy-inputs"
              value={legacyInputs}
              onChange={handleChangeLegacyInputs}
              id="legacy-inputs"
            />
            <label htmlFor="segwit-inputs">Segwit Inputs (+68 vByte): </label>
            <input
              type="number"
              name="segwit-inputs"
              value={segwitInputs}
              onChange={handleChangeSegwitInputs}
              id="segwit-inputs"
            />
            <label htmlFor="taproot-inputs">Taproot Inputs (+ 57.5 vByte): </label>
            <input
              type="number"
              name="taproot-inputs"
              value={taprootInputs}
              onChange={handleChangeTaprootInputs}
              id="taproot-inputs"
            />
          </div>
          <div className="Calculator-Box">
            <h2>Enter the number of the outputs</h2>
            <h3>Size of outputs: {sumOutputsSize} vByte</h3>
            <label htmlFor="legacy-outputs">Legacy Outputs (+34 vByte): </label>
            <input
              type="number"
              name="legacy-outputs"
              id="legacy-outputs"
              value={legacyOutputs}
              onChange={handleChangeLegacyOutputs}
            />
            <label htmlFor="segwit-outputs">Segwit Outputs (+31 vByte): </label>
            <input
              type="number"
              name="segwit-outputs"
              id="segwit-outputs"
              value={segwitOutputs}
              onChange={handleChangeSegwitOutputs}
            />
            <label htmlFor="taproot-outputs">Taproot Outputs (+43 vByte): </label>
            <input
              type="number"
              name="taproot-outputs"
              id="taproot-outputs"
              value={taprootOutputs}
              onChange={handleChangeTaprootOutputs}
            />
          </div>
          <div className="Calculator-Box">
            <h2>Enter future metrics</h2>
            <label for="future-fees">Future Fees: </label>
            <input
              type="number"
              name="future-fees"
              id="future-fees"
              value={futureFee}
              onChange={handleChangeFutureFees}
            />
            <label for="future-price">Future price: </label>
            <input
              type="number"
              name="future-price"
              id="future-price"
              value={futurePrice}
              onChange={handleChangeFuturePrice}
            />
            <button onClick={handleReset}>Reset Calculator</button>
          </div>
        </div>
        <div className="Calculator-Box">
          <h2>Result</h2>
          <h3>Size of your Transaction: {txSize} vByte</h3>
          <h3>Future Fees: {futureFee * txSize} vByte</h3>
          <h3>Future Fees in Fiat: ${priceSum}</h3>
        </div>
      </div>
    </>
  );
};

export default Calculator;

