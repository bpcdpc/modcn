import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Preview } from "@/components/Preview";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/lib/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col bg-background text-foreground">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <Preview />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
