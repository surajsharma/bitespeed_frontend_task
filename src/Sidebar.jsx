import React, { useCallback, useState } from 'react';
import Draggable from './Draggable.jsx';

import lt from "./assets/left.svg"
import chat from "./assets/chat.svg"
import { useEffect } from 'react';

export default ({ nodes, setNodes, nodeSelected, message, selectedNodeId }) => {
  const [msg, setMsg] = useState(message);

  useEffect(() => {
    setMsg(message)
  }, [message])

  const selectAll = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        return {
          ...node,
          selected: true,
        };
      }),
    );
  }, [setNodes]);

  const deSelectAll = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        return {
          ...node,
          selected: false,
        };
      }),
    );
  }, [setNodes]);

  const updateMessage = (evt) => {
    setMsg(evt.target.value)
    setNodes((nds) =>
      nds.map((node) => {
        console.log(selectedNodeId, node.id)
        return {
          ...node,
          data: {
            msg: node.id == selectedNodeId ? evt.target.value : node.data.msg,
          }
        };
      }),
    );

  }

  return (
    <div className="sidebar">
      {nodeSelected ?
        <div className="sidebar-message-wrapper">
          <div className="sidebar-message-head">
            <img onClick={deSelectAll} width={40} src={lt} alt="chat input" />
            <label>Message</label>
            <hr />
          </div>
          <div className="sidebar-message-textarea">
            <textarea value={msg} onChange={updateMessage}></textarea>
          </div>
        </div> :
        <div className="buttons">
          <Draggable>
            <div className="xy-theme__button button" onClick={selectAll}>
              <img width={30} src={chat} alt="chat input" className='blue' />
              message
            </div>
          </Draggable>
        </div>
      }
    </div>
  );
};
