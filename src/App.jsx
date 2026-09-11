import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './components/theme-provider';
import { prefersReducedMotion } from './lib/gpu';

const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./components/BlogPost'));

const RouteFallback = () => <div className="min-h-screen" aria-busy="true" />;

const App = () => {
  useEffect(() => {
    let cancelled = false;
    if (prefersReducedMotion()) return;
    (async () => {
      const [{ default: AOS }] = await Promise.all([
        import('aos'),
        import('aos/dist/aos.css')
      ]);
      if (cancelled) return;
      AOS.init({ mirror: true, duration: 1000, once: false });
    })().catch(err => console.warn('[App] AOS failed to load', err));
    return () => { cancelled = true; };
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background text-foreground">
          <ErrorBoundary name="Navbar">
            <Navbar />
          </ErrorBoundary>
          <ErrorBoundary
            name="Routes"
            fallback={
              <main className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center space-y-3">
                  <h1 className="text-2xl font-semibold">Something went wrong.</h1>
                  <p className="text-muted-foreground">
                    Try reloading the page.
                  </p>
                </div>
              </main>
            }
          >
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary name="Footer">
            <Footer />
          </ErrorBoundary>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
