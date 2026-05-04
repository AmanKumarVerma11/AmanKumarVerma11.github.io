import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-ink font-sans">
      <Header />
      <main className="flex-grow w-full">
        <div key={location.pathname} className="animate-page-in">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
