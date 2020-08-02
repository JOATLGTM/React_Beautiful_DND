import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const state = {
  availableColumn: [
    {
      id: 'startTime',
      name: 'Start Time'
    },
    {
      id: 'stopTime',
      name: 'Stop Time'
    },
    {
      id: 'perPoint',
      name: 'Per Point'
    },
    {
      id: 'initialMargin',
      name: 'Initial Margin'
    },
    {
      id: 'symbol&Description',
      name: 'Symbol & Description'
    },
    {
      id: 'change%',
      name: 'Change %'
    },
    {
      id: 'change',
      name: 'Change',
    },
    {
      id: 'last',
      name: 'Last'
    },
    {
      id: 'lastVolume',
      name: 'Last Volume'
    },
    {
      id: 'bid',
      name: 'Bid'
    },
    {
      id: 'bidSize',
      name: 'Bid Size'
    },
    {
      id: 'ask',
      name: 'Ask'
    },
    {
      id: 'askSize',
      name: 'Ask Size'
    },
    {
      id: 'totalVolume',
      name: 'Total Volume'
    },
    {
      id: 'high',
      name: 'High'
    }
  ],
  visibleColumn: [],
  lockedColumns: 0
}

ReactDOM.render(
  <React.StrictMode>
    <App 
      availableColumn={state.availableColumn} 
      visibleColumn={state.visibleColumn} 
      lockedColumns={state.lockedColumns}
    />
  </React.StrictMode>,
  document.getElementById('root')
);