import { lazy, Suspense, memo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RightBar from "./components/RightBar";
import Header from "./components/Header";

const Dashboard = lazy(() => import("./components/Dashboard"));
const Table = lazy(() => import("./components/Table"));

const Spinner = memo(() => (
  <div className="flex items-center justify-center h-screen w-full">
    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
  </div>
));
Spinner.displayName = "Spinner";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex flex-col w-full">
          <Header className="static" />

          <div className="border-x-2 border-zinc-200 flex flex-col overflow-y-scroll">
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<Table />} />
              </Routes>
            </Suspense>
          </div>
        </div>

        <RightBar />
      </div>
    </Router>
  );
};

App.displayName = "App";

export default memo(App);
