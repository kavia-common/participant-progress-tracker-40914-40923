import React, { useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardContent from "./components/DashboardContent";

// PUBLIC_INTERFACE
function App() {
  /** App entry rendering a responsive dashboard shell with static placeholders. */
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelect = (label) => {
    setActiveSection(label);
    // On small screens, close after selecting for better UX.
    setIsSidebarOpen(false);
  };

  const handleToggleSidebar = () => setIsSidebarOpen((v) => !v);

  const content = useMemo(() => {
    // For now, always render the same placeholders; show selected section name.
    return <DashboardContent activeSection={activeSection} />;
  }, [activeSection]);

  return (
    <div className="App bpp-app">
      <Header onToggleSidebar={handleToggleSidebar} />

      <div className="bpp-layout">
        <Sidebar
          activeItem={activeSection}
          onSelectItem={handleSelect}
          isOpen={isSidebarOpen}
        />
        {content}
      </div>
    </div>
  );
}

export default App;
