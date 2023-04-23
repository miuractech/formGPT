import React from "react";
import { Button } from "@mantine/core"
import { Route, Routes } from "react-router-dom";
import Data1 from "../data/data1";
import { Data2 } from "../data/data2";
import Data3 from "../data/data3";
import Data4 from "../data/data4";
import Data5 from "../data/data5";
import Data6 from "../data/data6";

function App() {
  return (
    <div className='min-h-screen'>
      <Routes>
        <Route index element={<Data1 />} />
        <Route path="/data2" element={<Data2 />} />
        <Route path="/data3" element={<Data3 />} />
        <Route path="/data4" element={<Data4 />} />
        <Route path="/data5" element={<Data5 />} />
        <Route path="/data6" element={<Data6 />} />
      </Routes>
    </div>
  );
}

export default App;
