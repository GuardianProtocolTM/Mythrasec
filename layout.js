import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Home, LayoutDashboard, DollarSign, MessageSquare, User, GraduationCap, 
  Sparkles, Settings, LogIn, Globe, Shield, Menu, X, LogOut, Folder, 
  Target, Share2, Users, ChevronDown, BookOpen, AlertTriangle, Eye, 
  Radio, Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SecurityFingerprint from '@/components/security/SecurityFingerprint';
import { useSubscriptionAccess } from '@/components/security/SubscriptionGate';
import DigitalEscapeHatch from '@/components/security/DigitalEscapeHatch';

export default function Layout({ children, currentPageName }) {
  const { hasAccess } = useSubscriptionAccess();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Simulate authentication check (replace with your own logic)
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // Simulate an authentication check without base44
    // Replace this with your own user authentication logic
    const currentUser = null; // Replace this with actual user fetching logic
    setUser(currentUser);
    setLoading(false);
  };

  const publicPages = ['Home', 'Pricing', 'TrainingWorkshops', 'PrivacyPolicy', 'TermsOfService'];
  const isPublicPage = publicPages.includes(currentPageName);

  // Organized navigation categories (same as before)
  const navCategories = [
    { name: 'Main', items: [ { name: 'Home', path: 'Home', icon: Home, public: true }, { name: 'Dashboard', path: 'SecurityDashboard', icon: LayoutDashboard, public: false }, { name: 'Pricing', path: 'Pricing', icon: DollarSign, public: true }, ] },
    { name: 'Security Tools', items: [ { name: 'Control Panel', path: 'SecurityControlPanel', icon: Settings, public: false }, { name: 'Security Agent', path: 'SecurityAgent', icon: MessageSquare, public: false }, { name: 'Secure VPN', path: 'SecureVPN', icon: Globe, public: true }, { name: 'Threat Alerts', path: 'ThreatAlerts', icon: AlertTriangle, public: false }, { name: 'Dark Web', path: 'DarkWebMonitoring', icon: Server, public: false }, ] },
    { name: 'Advanced Security', condition: () => hasAccess('soc_monitoring'), items: [ { name: 'EDR Monitoring', path: 'EDRMonitoring', icon: Shield, public: false, requireAccess: 'soc_monitoring' }, { name: 'Threat Hunting', path: 'ThreatHunting', icon: Target, public: false, requireAccess: 'soc_monitoring' }, { name: 'Cases', path: 'Cases', icon: Folder, public: false, requireAccess: 'soc_monitoring' }, { name: 'Pen Test', path: 'PenTestSandbox', icon: Radio, public: false, requireAccess: 'soc_monitoring' }, ] },
    { name: 'Insights & Learning', items: [ { name: 'AI Chat', path: 'CybersecurityChat', icon: Sparkles, public: false, requireAccess: 'ai_chat' }, { name: 'Threat Stories', path: 'ThreatStorytelling', icon: BookOpen, public: false }, { name: 'Training', path: 'TrainingWorkshops', icon: GraduationCap, public: true }, ] },
    { name: 'Community & Privacy', items: [ { name: 'Trust Map', path: 'DigitalTrustMap', icon: Share2, public: false }, { name: 'Community', path: 'CommunityMode', icon: Users, public: false }, ] },
    { name: 'Account', condition: () => user, items: [ { name: 'Profile', path: 'Profile', icon: User, public: false }, ] },
  ];

  if (currentPageName === 'Home') {
    return (
      <>
        <SecurityFingerprint />
        <style>{`/* Your existing styles */`}</style>
        {children}
        <div className="fixed bottom-6 right-6 z-50 md:hidden">
          <Link to={createPageUrl("SecurityDashboard")}>
            <Button size="lg" className="rounded-full w-16 h-16 shadow-2xl" style={{ background: 'linear-gradient(135deg, #00C2C7, #0891b2)', boxShadow: '0 10px 40px rgba(0, 194, 199, 0.3)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #0891b2, #00C2C7)'} onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #00C2C7, #0891b2)'}>
              <Shield className="w-8 h-8" />
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SecurityFingerprint />
      <style>{`/* Your existing styles */`}</style>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0B1C2C 0%, #162533 100%)' }}>
        {/* Navigation Code (unchanged) */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ background: 'rgba(11, 28, 44, 0.95)', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <Link to={createPageUrl('Home')} className="flex items-center gap-2 group flex-shrink-0">
                <img src="https://example.com/logo.png" alt="Mythrasec" className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
                <div className="hidden sm:flex flex-col">
                  <span className="text-lg font-bold" style={{ background: 'linear-gradient(90deg, #D4AF37, #00C2C7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mythrasec™</span>
                  <span className="text-[9px] -mt-1 hidden lg:block" style={{ color: '#B8860B' }}>Where Legends Guard Your Data</span>
                </div>
              </Link>
              <div className="flex items-center gap-3">
                {!user && !loading && (
                  <Button onClick={() => console.log('Redirect to login')} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700" size="sm">
                    <LogIn className="w-4 h-4 mr-1.5" />
                    <span className="hidden sm:inline">Login</span>
                  </Button>
                )}
                {user && (
                  <Button onClick={() => console.log('Logout')} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-red-400 hover:border-red-500/50" size="sm">
                    <LogOut className="w-4 h-4 mr-1.5" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setMenuOpen(!menuOpen)} className="text-slate-300 hover:bg-slate-800">
                  {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Slide-out Menu Code (unchanged) */}
        {menuOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setMenuOpen(false)} />
            <div className="fixed top-0 left-0 bottom-0 w-80 md:w-96 bg-slate-900 border-r border-slate-800 z-50 overflow-y-auto nav-scrollbar menu-open shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img src="https://example.com/logo.png" alt="Mythrasec" className="w-10 h-10 object-contain" />
                    <div>
                      <div className="font-bold text-lg" style={{ background: 'linear-gradient(90deg, #D4AF37, #00C2C7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Navigation</div>
                      <p className="text-xs text-slate-400">Explore all features</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {navCategories.map((category) => {
                    if (category.condition && !category.condition()) return null;

                    const visibleItems = category.items.filter(item => {
                      if (!item.public && !user) return false;
                      if (item.requireAccess && !hasAccess(item.requireAccess)) return false;
                      return true;
                    });

                    if (visibleItems.length === 0) return null;

                    const isExpanded = expandedCategory === category.name;

                    return (
                      <div key={category.name}>
                        <button
                          onClick={() => setExpandedCategory(isExpanded ? null : category.name)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-all group"
                        >
                          <span className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                            {category.name}
                            <span className="text-xs opacity-50">({visibleItems.length})</span>
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
                        </button>

                        {isExpanded && (
                          <div className="mt-1 space-y-1 ml-2 border-l-2 border-slate-800 pl-2">
                            {visibleItems.map((item) => (
                              <Link
                                key={item.path}
                                to={createPageUrl(item.path)}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                  currentPageName === item.path
                                    ? 'font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-l-2 border-cyan-400'
                                    : 'hover:bg-slate-800/50 text-slate-300 hover:text-white border-l-2 border-transparent hover:border-slate-600'
                                }`}
                              >
                                <item.icon className={`w-5 h-5 flex-shrink-0 ${currentPageName === item.path ? 'text-cyan-400' : ''}`} />
                                <span className="text-sm">{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-semibold text-cyan-400">Legendary Protection</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Your digital guardian is always watching over you. Stay safe, stay secure.</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        <div className="pt-20">
          {children}
        </div>

        {currentPageName !== 'Home' && user && <DigitalEscapeHatch />}
      </div>
    </>
  );
}
