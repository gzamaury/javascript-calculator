/* eslint-disable no-unused-vars */
import icons from "../Key/icons";
import Key from "../Key/Key";
import Display from "../Display/Display";
import "./Calculator.css";

function Calculator() {
  return (
    <div className="cal-container">
      <div id="calculator">
        <div id="display-section">
          <Display displayId="display" />
        </div>
        <div id="kb-left" className="kb-section">
          <Key keyId="seven" icon={icons.seven} keyChar="7" className="key" />
          <Key keyId="eight" icon={icons.eight} keyChar="8" className="key" />
          <Key keyId="four" icon={icons.four} keyChar="4" className="key" />
          <Key keyId="five" icon={icons.five} keyChar="5" className="key" />
          <Key keyId="one" icon={icons.one} keyChar="1" className="key" />
          <Key keyId="two" icon={icons.two} keyChar="2" className="key" />
          <Key keyId="zero" icon={icons.zero} keyChar="0" className="key" />
          <Key
            keyId="decimal"
            icon={icons.decimal}
            keyChar="."
            className="key"
          />
        </div>
        <div id="kb-right" className="kb-section">
          <Key keyId="nine" icon={icons.nine} keyChar="9" className="key" />
          <Key keyId="divide" icon={icons.divide} keyChar="/" className="key" />
          <Key keyId="six" icon={icons.six} keyChar="6" className="key" />
          <Key
            keyId="multiply"
            icon={icons.multiply}
            keyChar="*"
            className="key"
          />
          <Key keyId="three" icon={icons.three} keyChar="3" className="key" />
          <Key
            keyId="subtract"
            icon={icons.subtract}
            keyChar="-"
            className="key"
          />
          <Key keyId="add" icon={icons.add} keyChar="+" className="key" />
          <Key keyId="equals" icon={icons.equals} keyChar="=" className="key" />
        </div>
      </div>
    </div>
  );
}
export default Calculator;
