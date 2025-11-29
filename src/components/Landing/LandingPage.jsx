import React from 'react';
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
  BarChart3
} from 'lucide-react';



const LandingPage = ({ onShowLogin }) => {
  const handleWatchDemo = () => {
    // Create a demo modal or redirect to demo video
    const demoModal = document.createElement('div');
    demoModal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    demoModal.innerHTML = `
      <div class="bg-white rounded-xl p-8 max-w-2xl w-full relative">
        <button onclick="this.parentElement.parentElement.remove()" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">PlacementHub Demo</h3>
        <div class="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
            </div>
            <p class="text-gray-600">Demo video coming soon!</p>
            <p class="text-sm text-gray-500 mt-2">Experience the full platform by signing in with a demo account.</p>
          </div>
        </div>
        <div class="flex justify-center space-x-4">
          <button onclick="this.parentElement.parentElement.parentElement.remove()" class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Close
          </button>
          <button onclick="this.parentElement.parentElement.parentElement.remove(); arguments[0].target.closest('.landing-page').querySelector('.login-button').click()" class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
            Try Demo Account
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(demoModal);
  };

  const features = [
    {
      icon: Briefcase,
      title: 'Job Opportunities',
      description: 'Access thousands of job postings from top companies and startups.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: UserCheck,
      title: 'Smart Matching',
      description: 'Get matched with jobs that fit your skills and career goals.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Career Analytics',
      description: 'Track your application progress and career development.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Placement Success',
      description: 'Join thousands of students who found their dream jobs.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Students Placed', icon: Users },
    { number: '500+', label: 'Partner Companies', icon: Building },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
    { number: '24/7', label: 'Support Available', icon: CheckCircle }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer at Google',
      content: 'PlacementHub helped me land my dream job at Google. The platform made the entire process seamless!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Data Scientist at Microsoft',
      content: 'The career guidance and job matching features are incredible. Highly recommended for all students!',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Product Manager at Amazon',
      content: 'Thanks to PlacementHub, I found the perfect role that matches my skills and career aspirations.',
      rating: 5
    }
  ];

  return (
    <div className="landing-page min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-400 rounded-full opacity-10"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full opacity-10"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                PlacementHub
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">Home</a>
                <a href="#" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">About Us</a>
                <a href="#" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">Pages</a>
                <a href="#" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">Blog</a>
                <a href="#" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">Contact</a>
              </nav>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>📞</span>
                <span className="font-semibold">Make A Call Anytime</span>
              </div>
              <button
                onClick={onShowLogin}
                className="login-button bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Upgrade Your
                <br />
                <span className="text-gray-800">Career Journey</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Connect with top companies, discover amazing internship and placement opportunities, 
                and launch your professional career with confidence. Join thousands of students who have 
                found their dream jobs through our platform.
              </p>

              <div className="flex items-center space-x-4 mb-12">
                <button
                  onClick={onShowLogin}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-base font-semibold"
                >
                  Discover Opportunities
                </button>
                <button 
                  onClick={handleWatchDemo}
                  className="flex items-center space-x-3 text-gray-700 hover:text-cyan-600 transition-colors font-medium"
                >
                  <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                    </svg>
                  </div>
                  <span>Watch The Video</span>
                </button>
              </div>

              {/* Progress Stats */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 max-w-md">
                <h3 className="text-lg font-bold text-gray-900 mb-4">We Aim To Provide Placement Success</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Students Placed</span>
                      <span className="font-semibold text-gray-900">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-semibold text-gray-900">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Students/Professional Image */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl relative overflow-hidden">
                  {/* Students/professionals image */}
                  <div className="aspect-square">
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=800&fit=crop" 
                      alt="Students collaborating" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-8 left-8 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-6 rounded-2xl shadow-xl">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">🎓</div>
                      <div>
                        <p className="text-2xl font-bold">Placement Hub</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative cyan circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - We Build Competitive Business */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Images Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gray-200 rounded-2xl aspect-square overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop" 
                      alt="Students working together" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-gray-200 rounded-2xl aspect-video overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop" 
                      alt="Professional interview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-gray-200 rounded-2xl aspect-video overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop" 
                      alt="Career counseling" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-gray-200 rounded-2xl aspect-square overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop" 
                      alt="Students celebrating success" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-6 rounded-2xl shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <Award className="w-12 h-12 mb-2" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold">10K+</p>
                    <p className="text-sm opacity-90">Students Placed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                We Build Competitive Career Opportunities
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our platform connects talented students with leading companies across various industries. 
                We provide comprehensive placement assistance, career guidance, and skill development programs 
                to ensure every student finds their perfect career match. With our advanced matching algorithms 
                and dedicated support team, we've helped thousands of students launch successful careers.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Success</h3>
                    <p className="text-gray-600">We prioritize student success with personalized career guidance and placement support throughout your journey.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Mission</h3>
                    <p className="text-gray-600">Connecting talented students with industry-leading companies to build successful and fulfilling careers.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center space-x-6 p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                  <Users className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Placement Team</p>
                  <p className="text-gray-600">Career Counselors & Advisors</p>
                </div>
                <button 
                  onClick={onShowLogin}
                  className="ml-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md font-medium"
                >
                  More About Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Best Placement Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive placement and career development services to help students achieve their 
              professional goals and land their dream jobs with top companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div className="text-6xl font-bold text-gray-100 mb-4">01</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Job Opportunities</h3>
              <p className="text-gray-600 mb-6">
                Access thousands of internship and placement opportunities from top companies across various industries and sectors.
              </p>
              <a href="#" className="text-cyan-600 font-semibold hover:text-cyan-700 inline-flex items-center">
                Learn More... <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="text-6xl font-bold text-gray-100 mb-4">02</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Analytics</h3>
              <p className="text-gray-600 mb-6">
                Track your application progress, interview performance, and career growth with our advanced analytics dashboard.
              </p>
              <a href="#" className="text-cyan-600 font-semibold hover:text-cyan-700 inline-flex items-center">
                Learn More... <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-6xl font-bold text-gray-100 mb-4">03</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Guidance</h3>
              <p className="text-gray-600 mb-6">
                Get personalized career counseling, resume building, and interview preparation support from our expert team.
              </p>
              <a href="#" className="text-cyan-600 font-semibold hover:text-cyan-700 inline-flex items-center">
                Learn More... <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={onShowLogin}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg font-semibold"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose PlacementHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed in your career journey, from job discovery to placement success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-200/50 card-hover text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to land your dream job
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Your Profile</h3>
              <p className="text-gray-600">Build a comprehensive profile showcasing your skills, experience, and career goals.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Discover Opportunities</h3>
              <p className="text-gray-600">Browse thousands of job listings and get matched with positions that fit your profile.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Hired</h3>
              <p className="text-gray-600">Apply with confidence and track your progress until you land your dream job.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from students who found their dream jobs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-200/50 card-hover">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students who have already found their dream careers through PlacementHub.
            </p>
            <button
              onClick={onShowLogin}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-semibold flex items-center justify-center mx-auto"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">PlacementHub</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Connecting students with their dream careers since 2020
          </p>
          <div className="text-sm text-gray-500">
            © 2024 PlacementHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;