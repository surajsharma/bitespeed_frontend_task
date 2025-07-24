import { useCallback } from 'react';
import { Handle } from '@xyflow/react';

import wa from "./assets/wa.svg"
import chat from "./assets/chat.svg"

function Node(props) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="node-wrapper">
      <Handle type="target" position="left" id="in" style={{ background: "#666", width: "4px", height: "4px" }} />

      <div className="node">
        <div className="head">
          <div className="head-label">
            <img width={10} src={chat} alt="chat input" />
            <label htmlFor="text">Send Message</label>
          </div>
          <img width={10} src={wa} alt="whatsapp output" />
        </div>
        <div className="message">
          <label htmlFor="text">{props.data.msg}</label>
        </div>
      </div>

      <Handle type="source" position="right" id="out" style={{ background: "#666", width: "4px", height: "4px" }} />
    </div>

  );
}

export default Node;
