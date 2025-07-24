import { useCallback } from 'react';
import { Handle } from '@xyflow/react';

import wa from "./assets/wa.svg"
import chat from "./assets/chat.svg"

function Node(props) {
  const onClick = useCallback((evt) => {
    console.log(evt, props);
  }, []);

  return (
    <div className="node-wrapper">
      <Handle type="target" position="left" id="in" style={{ background: "#666", width: "2px", height: "2px" }} />
      <div className="node" onClick={onClick}>
        <div className="head">
          <div className="head-label">
            <img width={10} src={chat} alt="chat input" className='green' />
            <label htmlFor="text">Send Message</label>
          </div>
          <img width={10} src={wa} alt="whatsapp output" className='green' />
        </div>
        <div className="message">
          <label htmlFor="text">{props.data.msg}</label>
        </div>
      </div>
      <Handle type="source" position="right" id="out" style={{ background: "#888", width: "2px", height: "2px" }} />
    </div>

  );
}

export default Node;
