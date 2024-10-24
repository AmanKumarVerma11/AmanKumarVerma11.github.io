import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 
        Developed and maintained by Aman Kumar Verma.
        If you have any questions or need further assistance, feel free to reach out!
            
        LinkedIn: https://www.linkedin.com/in/aman-kr-verma11/
        GitHub: https://github.com/AmanKumarVerma11
            
        Thank you for reviewing my work!
      */}
      <Header />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;