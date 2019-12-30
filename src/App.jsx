import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import Timer from './components/Timer';

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Timer" key="1">
          <Timer />
        </TabPane>
        <TabPane tab="Countdown" key="2">
          <Timer type="countdown" />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
