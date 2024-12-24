import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { OurAi } from './pages/OurAi'
import { Toaster } from "@/components/ui/toaster"

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-poppins flex flex-col">
        <Header />
        <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how" element={<OurAi />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  )
}