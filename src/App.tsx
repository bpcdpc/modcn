import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Preview } from "@/components/Preview";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { useDraftStore } from "@/store/useDraftStore";

function App() {
  const { isReady, markAsReady } = useDraftStore((state) => ({
    isReady: state.isReady,
    markAsReady: state.markAsReady,
  }));

  useEffect(() => {
    // 첫 프레임이 완전히 렌더링될 때까지 대기
    // requestAnimationFrame을 두 번 사용하여 브라우저가 완전히 렌더링할 시간을 줌
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        markAsReady();
      });
    });
  }, [markAsReady]);

  // 초기 렌더링 완료 전까지는 로딩 화면 표시
  if (!isReady) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm">Loading...</div>
      </div>
    );
  }

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
