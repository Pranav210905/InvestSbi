import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { SavedSchemesProvider } from './contexts/SavedSchemesContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { Home } from './pages/Home';
import { SchemeDetails } from './pages/SchemeDetails';
import { SavedSchemes } from './pages/SavedSchemes';
import { Login } from './components/Login'
import { SignUp } from './components/SignUp'
import InvestmentsAdvisor from './pages/InvestmentsAdvisor';
import { VideoGuides } from './pages/VideoGuides';
import { Advice } from './components/Advicers';
import { MutualFundExplorer } from './components/MutualFundExplorer';
import { LICPolicyExplorer } from './components/LICPolicyExplorer';
import CommunityX from './Community/CommunityX';
import HomeX from './Community/pages/Home';
import ProfileX from './Community/pages/Profile';
import ExploreX from './Community/pages/Explore';
import NotFoundX from './Community/pages/NotFound';
import { PostOfficeSchemeExplorer } from './components/PostOfficeSchemes';
import InvestmentAnalysis from './components/FinancialAnalysis';
import GoldRatesTable from './components/Gold';




function App() {
  return (
    <ThemeProvider>
      <SavedSchemesProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/scheme/:id" element={<SchemeDetails />} />
                <Route path="/saved" element={<SavedSchemes />} />
                <Route path='/login' element={<Login/>}/>
                <Route path='/signUp' element={<SignUp/>}/>
                <Route path="/investments" element={<InvestmentsAdvisor/>}/>
                <Route path="/video-guides" element={<VideoGuides />} />
                <Route path="/advice" element={<Advice/>}/>
                {/* <Route path='/investments_2' element={<Invest2 />}/> */}
                <Route path="/lic-explorer" element={<LICPolicyExplorer/>}/>
                <Route path="/post-office-explorer" element={<PostOfficeSchemeExplorer />} />
                <Route path='/get-mutual-funds' element={<MutualFundExplorer/>} />
                <Route path="/community" element={<CommunityX/>} />
                <Route path="/homex" element={<HomeX />} />
                <Route path="/financial-doc-analysis" element={<InvestmentAnalysis/>}/>
                <Route path="/postoffice" element={<PostOfficeSchemeExplorer/>}/>
            <Route path="/profilex" element={<ProfileX />} />
            <Route path="/explorex" element={<ExploreX />} />
            <Route path="/gold" element={<GoldRatesTable rates={[]} loading={false} />}/>
            <Route path="*" element={<NotFoundX />} />
              </Routes>
            </main>
            <Footer />
            <ChatBot />
          </div>
        </Router>
      </SavedSchemesProvider>
    </ThemeProvider>
  );
}

export default App;