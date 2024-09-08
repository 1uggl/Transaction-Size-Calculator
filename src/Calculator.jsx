import { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [sumInputsSize, setSumInputSize] = useState(0);
  const [sumOutputsSize, setSumOutputsSize] = useState(0)
  const [txSize, setTxSize] = useState(0);
  const [legacyInputs, setLegacyInputs] = useState(0);
  const [segwitInputs, setSegwitInputs] = useState(21);
  const [taprootInputs, setTaprootInputs] = useState(0);
  const [legacyOutputs, setLegacyOutputs] = useState(0);
  const [segwitOutputs, setSegwitOutputs] = useState(1);
  const [taprootOutputs, setTaprootOutputs] = useState(0);
  const [futureFee, setFutureFee] = useState(100);
  const [futurePrice, setFuturePrice] = useState(1000000);
  const [priceSum, setPriceSum] = useState(1);
  const [dollarPrice, setDollarPrice] = useState(0);
  const [euroPrice, setEuroPrice] = useState(0);
  const [fastFee, setFastFee] = useState(1);
  const [halfHourFee, setHalfHourFee] = useState(1);

  useEffect(() => {
    fetch("https://mempool.space/api/v1/fees/recommended")
      .then(response => response.json())
      .then(data => {
        setFastFee(data.fastestFee)
        setHalfHourFee(data.halfHourFee)
      })
  }, [])

  useEffect(() => {
    fetch("https://mempool.space/api/v1/prices")
      .then(response => response.json())
      .then(data => {
        setDollarPrice(data.USD)
        setEuroPrice(data.EUR)}
      )
  }, [])

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
    setFutureFee(100)
    setFuturePrice(1000000)
  }

  return (
    <>
      <div className="Calculator">
        <div className="Calculator-Box">
          <h3>GM! Small UTXOs get to dust in high fee enviroments. Use this tool to visualize the impact of multiple inputs on the transaction size. Use the fee and fiat price input to see, how expensive moving your stack will be in enviroments e.g. with minimum fees at 100 sats/vByte and fiat price at $ 1,000,000!</h3>
        </div>
        <div className="Calculator-User-Input">
          <div className="Calculator-Box">
            <h3>Enter the number and type of your Inputs</h3>
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
            <h3>Enter the number of the outputs</h3>
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
            <h3>Finetuning for future Transactions</h3>
            <div className="Tuning-Box">
              <div className="Calculator-Fee-Box">
                <div className="Calculator-Fee-Box-Inputs">
                  <label for="future-fees">Transaction fees (sats/vByte): </label>
                  <input
                    type="number"
                    name="future-fees"
                    id="future-fees"
                    value={futureFee}
                    onChange={handleChangeFutureFees}
                  />
                  <label for="future-price">Future fiat price: </label>
                  <input
                    type="number"
                    name="future-price"
                    id="future-price"
                    value={futurePrice}
                    onChange={handleChangeFuturePrice}
                  />
                </div>
                <button onClick={handleReset}>Reset Calculator</button>
              </div>
              <div className="Calculator-Price-Box">
                <h3>Price and fee situation at the moment</h3>
                <p>Fastest Fee: {fastFee} sats/vByte</p>
                <p>Half Hour Fee: {halfHourFee} sats/vByte</p>
                <p>1 BTC = ${dollarPrice}</p>
                <p>1 BTC = €{euroPrice}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="Calculator-Box">
          <h3>Your transaction size will be <span className="Calculator-Span-Result">{txSize}</span> vBytes. At the provided fee of <span className="Calculator-Span-Result">{futureFee}</span> sats/vBytes you will have to pay a total fee of <span className="Calculator-Span-Result">{futureFee * txSize}</span> sats equivalent to <span className="Calculator-Span-Result">{priceSum}</span> fiatcoins.</h3>
          <div className="Calculator-Result-Box">
            <div>
              <h3>Size of your Transaction: <span className="Calculator-Span-Result">{txSize}</span> vByte</h3>
              <h3> (includes 10.5 vByte for the Header)</h3>
            </div>
            <div>
              <h3>Future Fees: <span className="Calculator-Span-Result">{futureFee * txSize}</span> sats</h3>
              <h3>Future Fees in Fiat: <span className="Calculator-Span-Result">{priceSum}</span></h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;

