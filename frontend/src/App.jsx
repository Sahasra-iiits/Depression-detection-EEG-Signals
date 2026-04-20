import React from "react";
import Navbar from "./components/Navbar";
import Box1 from "./components/Box1";
import Box2 from "./components/Box2";
import Question from "./components/Question";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./components/Details";
import NextPhase from "./components/NextPhase";
import ProtectedRoute from "./components/ProtectedRoute";
import End from "./components/End";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/details" element={<Details />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Box1 title="Phase-1" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/phase1"
            element={
              <ProtectedRoute>
                <Box2 title="Phase-1" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/phase1/questions"
            element={
              <ProtectedRoute>
                <Question phase="1" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/next_phase"
            element={
              <ProtectedRoute>
                <NextPhase />
              </ProtectedRoute>
            }
          />
          <Route
            path="/next"
            element={
              <ProtectedRoute>
                <Box1 title="Phase-2" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/phase2"
            element={
              <ProtectedRoute>
                <Box2 title="Phase-2" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/phase2/questions"
            element={
              <ProtectedRoute>
                <Question phase="2" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/end"
            element={
              <ProtectedRoute>
                <End />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
