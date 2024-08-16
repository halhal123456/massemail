import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./Homepage";
import { Layout } from "./Layout";
import { MassEmail } from "./MassEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<Homepage />} />
          <Route path="massemail" element={<MassEmail />} />
          <Route path="*" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
