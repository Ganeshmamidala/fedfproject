import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Building, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Star,
  Award,
  Target,
  Briefcase,
  UserCheck,
  BarChart3,
  Rocket,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  Play
} from 'lucide-react';

const LandingPage = ({ onShowLogin }) => {
  const [scrollY, setScrollY] = useState(0);
  const [navShrink, setNavShrink] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [counters, setCounters] = useState({
    students: 0,
    companies: 0,
    jobs: 0,
    placements: 0
  });
  
  const sectionRefs = useRef({});
  const observerRef = useRef(null);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setNavShrink(currentScrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observerRef.current.observe(ref);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (visibleSections.has('stats-section')) {
      const targets = { students: 5000, companies: 250, jobs: 1200, placements: 4500 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      const intervals = {};
      Object.keys(targets).forEach(key => {
        const increment = targets[key] / steps;
        let current = 0;
        intervals[key] = setInterval(() => {
          current += increment;
          if (current >= targets[key]) {
            setCounters(prev => ({ ...prev, [key]: targets[key] }));
            clearInterval(intervals[key]);
          } else {
            setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
          }
        }, stepDuration);
      });

      return () => {
        Object.values(intervals).forEach(interval => clearInterval(interval));
      };
    }
  }, [visibleSections]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page bg-white overflow-hidden">
      {/* Sticky Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          navShrink 
            ? 'bg-white shadow-lg py-3' 
            : 'bg-white/95 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 ${
                navShrink ? 'h-10 w-10' : 'h-12 w-12'
              }`}>
                <GraduationCap className={`text-white transition-all duration-300 ${
                  navShrink ? 'h-5 w-5' : 'h-6 w-6'
                }`} />
              </div>
              <h1 className={`font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent transition-all duration-300 ${
                navShrink ? 'text-xl' : 'text-2xl'
              }`}>
                PlacementHub
              </h1>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Features', 'Companies', 'Students', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 hover:text-cyan-600 font-medium transition-all duration-300 relative group link-underline"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={onShowLogin}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-500 font-medium btn-effect transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={onShowLogin}>
              <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-gray-700"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section 
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 via-blue-900/85 to-cyan-900/90"></div>
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeInUp">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your Gateway to
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Dream Career
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Connect with top companies, discover amazing internship and placement opportunities, 
              and launch your professional career with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 px-4">
              <button
                onClick={onShowLogin}
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-500 flex items-center w-full sm:w-auto justify-center btn-effect transform hover:-translate-y-1"
              >
                Start Tracking
                <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:rotate-12 transition-all duration-300" />
              </button>
              <button className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-500 flex items-center border border-white/30 w-full sm:w-auto justify-center transform hover:-translate-y-1 hover:border-white/50">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce mt-16">
              <ChevronRight className="w-8 h-8 text-white mx-auto rotate-90" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Metrics Section */}
      <section 
        id="stats-section"
        ref={el => sectionRefs.current['stats-section'] = el}
        className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: Users, label: 'Students Registered', value: counters.students, color: 'from-cyan-500 to-blue-500' },
              { icon: Building, label: 'Companies Onboarded', value: counters.companies, color: 'from-blue-500 to-indigo-500' },
              { icon: Briefcase, label: 'Jobs Listed', value: counters.jobs, color: 'from-indigo-500 to-purple-500' },
              { icon: Award, label: 'Total Placements', value: counters.placements, color: 'from-purple-500 to-pink-500' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover cursor-pointer group ${
                  visibleSections.has('stats-section') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-6 icon-hover`}>
                  <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-all duration-300" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.value.toLocaleString()}+
                </div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about"
        ref={el => sectionRefs.current['about'] = el}
        className="py-16 sm:py-24 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Images */}
            <div className={`relative transition-all duration-1000 ${
              visibleSections.has('about') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="img-hover rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop" 
                      alt="Team discussion" 
                      className="w-full"
                    />
                  </div>
                  <div className="img-hover rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop" 
                      alt="Professional interview" 
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="img-hover rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop" 
                      alt="Career counseling" 
                      className="w-full"
                    />
                  </div>
                  <div className="img-hover rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop" 
                      alt="Success celebration" 
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 sm:-bottom-8 -right-4 sm:-right-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 sm:px-8 py-4 sm:py-6 rounded-2xl shadow-2xl animate-float">
                <div className="text-center">
                  <Award className="w-10 h-10 sm:w-12 sm:h-12 mb-2 mx-auto" />
                  <p className="text-2xl sm:text-3xl font-bold">10K+</p>
                  <p className="text-xs sm:text-sm opacity-90">Students Placed</p>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className={`transition-all duration-1000 delay-300 ${
              visibleSections.has('about') 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-20'
            }`}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Building Competitive Career Opportunities
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                Our platform connects talented students with leading companies across various industries. 
                We provide comprehensive placement assistance, career guidance, and skill development programs 
                to ensure every student finds their perfect career match.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  { icon: CheckCircle, title: 'Student Success', desc: 'Personalized career guidance and placement support throughout your journey.' },
                  { icon: Target, title: 'Career Mission', desc: 'Connecting talented students with industry-leading companies.' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={onShowLogin}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-500 font-semibold inline-flex items-center btn-effect group transform hover:-translate-y-1"
              >
                More About Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        ref={el => sectionRefs.current['features'] = el}
        className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Everything you need to manage placements efficiently and effectively
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Rocket, title: 'Smart Job Matching', desc: 'AI-powered algorithm matches students with perfect job opportunities based on skills and preferences.', color: 'from-cyan-500 to-blue-500' },
              { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Real-time insights and analytics to track application progress and placement metrics.', color: 'from-blue-500 to-indigo-500' },
              { icon: Shield, title: 'Secure Platform', desc: 'Enterprise-grade security ensuring your data and documents are always protected.', color: 'from-indigo-500 to-purple-500' },
              { icon: Zap, title: 'Quick Applications', desc: 'Apply to multiple jobs with a single click. Save time with smart application management.', color: 'from-purple-500 to-pink-500' },
              { icon: Globe, title: 'Global Reach', desc: 'Connect with companies worldwide and explore international placement opportunities.', color: 'from-pink-500 to-red-500' },
              { icon: UserCheck, title: 'Expert Guidance', desc: 'Access career counseling, resume building, and interview preparation support.', color: 'from-red-500 to-orange-500' },
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover group cursor-pointer ${
                  visibleSections.has('features') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 icon-hover`}>
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-all duration-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section 
        id="companies"
        ref={el => sectionRefs.current['companies'] = el}
        className="py-16 sm:py-24 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
              Trusted by Leading Companies
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Join thousands of students who have landed their dream jobs with top employers
            </p>
          </div>

          {/* Logo Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-8 sm:space-x-12 py-8">
              {[
                { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' },
                { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png' },
                { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png' },
                { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png' },
                { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png' },
                { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/512px-Netflix_2015_logo.svg.png' },
                { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png' },
                { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.svg/512px-Adobe_Corporate_Logo.svg.png' },
                { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/512px-IBM_logo.svg.png' },
                { name: 'Intel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/512px-Intel_logo_%282006-2020%29.svg.png' },
                { name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/512px-Oracle_logo.svg.png' },
                { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png' },
              ].map((company, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-40 h-20 sm:w-48 sm:h-24 bg-white border-2 border-gray-100 rounded-xl flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all duration-500 cursor-pointer group transform hover:-translate-y-1 p-4 hover:border-cyan-200"
                >
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden items-center justify-center w-full h-full">
                    <Building className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 group-hover:text-cyan-600 transition-all duration-300 group-hover:scale-110" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        id="students"
        ref={el => sectionRefs.current['students'] = el}
        className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Get placed in just four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: '01', icon: UserCheck, title: 'Create Profile', desc: 'Sign up and build your professional profile with resume and skills' },
              { step: '02', icon: Briefcase, title: 'Browse Jobs', desc: 'Explore thousands of opportunities from top companies' },
              { step: '03', icon: TrendingUp, title: 'Apply & Track', desc: 'Apply with one click and track your application status' },
              { step: '04', icon: Award, title: 'Get Placed', desc: 'Attend interviews and land your dream job' },
            ].map((item, index) => (
              <div
                key={index}
                className={`relative text-center transition-all duration-700 ${
                  visibleSections.has('students') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Connecting Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-300 to-blue-300 z-0"></div>
                )}
                
                <div className="relative z-10 bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover group">
                  <div className="text-5xl sm:text-6xl font-bold text-gray-100 mb-4 transition-colors duration-300 group-hover:text-gray-200">{item.step}</div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 icon-hover animate-float">
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-all duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="contact"
        ref={el => sectionRefs.current['contact'] = el}
        className="py-16 sm:py-24 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-64 h-64 bg-white/5 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          visibleSections.has('contact') 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of students who have already found their dream placements
          </p>
          <button
            onClick={onShowLogin}
            className="group bg-white text-cyan-600 px-8 sm:px-12 py-4 sm:py-5 rounded-lg text-lg sm:text-xl font-bold hover:shadow-2xl hover:scale-110 transition-all duration-500 inline-flex items-center transform hover:-translate-y-2"
          >
            Get Started Now
            <Rocket className="ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-300" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
            {/* Logo & About */}
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">PlacementHub</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Your trusted partner in career development and placement success. 
                Connecting talent with opportunity since 2020.
              </p>
              {/* Social Icons */}
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-all duration-500 hover:scale-110 transform hover:-translate-y-1 hover:rotate-6"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-400 rounded transition-colors duration-300"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['About Us', 'Features', 'Companies', 'Students', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-cyan-400 transition-colors duration-300 flex items-center group text-sm sm:text-base">
                      <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-cyan-400 transition-colors duration-300 flex items-center group text-sm sm:text-base">
                      <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p className="text-sm sm:text-base">&copy; 2025 PlacementHub. All rights reserved. Built with ❤️ for students.</p>
          </div>
        </div>
      </footer>

      {/* Custom Animations CSS */}
      <style>{`
        /* Keyframe Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Animation Classes */
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }

        /* Enhanced Transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Button Hover Effects */
        button, a {
          position: relative;
          overflow: hidden;
        }

        button::before, a.btn-effect::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        button:hover::before, a.btn-effect:hover::before {
          width: 300px;
          height: 300px;
        }

        /* Card Hover Effects */
        .card-hover {
          position: relative;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .card-hover::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          opacity: 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          pointer-events: none;
        }

        .card-hover:hover::after {
          opacity: 1;
        }

        .card-hover:hover {
          transform: translateY(-8px);
        }

        /* Icon Animations */
        .icon-hover {
          transition: all 0.3s ease;
        }

        .group:hover .icon-hover {
          transform: scale(1.1) rotate(5deg);
        }

        /* Link Underline Animation */
        .link-underline {
          position: relative;
        }

        .link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: currentColor;
          transition: width 0.3s ease;
        }

        .link-underline:hover::after {
          width: 100%;
        }

        /* Image Hover Effects */
        .img-hover {
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          overflow: hidden;
        }

        .img-hover img {
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .img-hover:hover img {
          transform: scale(1.08);
        }

        /* Gradient Animation */
        .gradient-animated {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #2563eb);
          border-radius: 5px;
          transition: background 0.3s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #1d4ed8);
        }

        /* Responsive text sizing */
        @media (max-width: 640px) {
          html {
            font-size: 14px;
          }
        }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
