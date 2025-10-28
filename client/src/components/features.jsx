import React from 'react';
import { 
  BookOpen, 
  Users, 
  Award, 
  Clock, 
  Star, 
  Globe, 
  Shield, 
  Zap,
  PlayCircle,
  Download,
  MessageCircle,
  TrendingUp,
  CheckCircle,
  Smartphone,
  HeadphonesIcon,
  Target,
    X,
    Menu

} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import Profile from './profile';
import { useState } from 'react';



const Features = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const { user, isAuthenticated, isLoading } = useAuth();
  const mainFeatures = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience and proven track records.",
      highlight: "50+ Courses"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Interactive Learning",
      description: "Engage with fellow students, participate in discussions, and collaborate on projects.",
      highlight: "2,500+ Students"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Verified Certificates",
      description: "Earn industry-recognized certificates upon successful completion of courses.",
      highlight: "Accredited"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "Flexible Schedule",
      description: "Learn at your own pace with 24/7 access to course materials and recorded sessions.",
      highlight: "24/7 Access"
    }
  ];

  const additionalFeatures = [
    {
      icon: <PlayCircle className="w-6 h-6 text-blue-500" />,
      title: "HD Video Lectures",
      description: "Crystal-clear video content with subtitles and multiple playback speeds."
    },
    {
      icon: <Download className="w-6 h-6 text-green-500" />,
      title: "Offline Access",
      description: "Download course materials and watch videos offline on any device."
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-purple-500" />,
      title: "Direct Instructor Support",
      description: "Get help directly from instructors through Q&A sessions and forums."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
      title: "Progress Tracking",
      description: "Monitor your learning progress with detailed analytics and milestones."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-pink-500" />,
      title: "Mobile Friendly",
      description: "Access your courses seamlessly across desktop, tablet, and mobile devices."
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-indigo-500" />,
      title: "Audio Lessons",
      description: "Learn on the go with downloadable audio versions of video content."
    }
  ];

  const stats = [
    { number: "2,500+", label: "Active Students", icon: <Users className="w-5 h-5" /> },
    { number: "50+", label: "Expert Courses", icon: <BookOpen className="w-5 h-5" /> },
    { number: "98%", label: "Success Rate", icon: <Star className="w-5 h-5" /> },
    { number: "24/7", label: "Support", icon: <Shield className="w-5 h-5" /> }
  ];

  const benefits = [
    "Lifetime access to purchased courses",
    "Regular content updates and new materials",
    "Community forum access",
    "Career guidance and mentorship",
    "Project-based learning approach",
    "Industry-relevant curriculum"
  ];

  return (
    <div className="bg-gray-50 ">
        <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-blue-600 bg-clip-text text-transparent">
                EduEnroll
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link to="/courses" className="text-sm text-gray-700 hover:text-blue-600 transition">Courses</Link>
              <Link to="/features" className="text-sm text-gray-700 hover:text-blue-600 transition">Features</Link>
              <Link to="/about" className="text-sm text-gray-700 hover:text-blue-600 transition">About</Link>

              {isAuthenticated ? (
                <Profile user={user} />
              ) : isLoading ? (
                <div className="w-8 h-8 animate-spin border-2 border-blue-600 border-t-transparent rounded-full"></div>
              ) : (
                <div className="flex items-center space-x-3">
                  
                  <Link to="/signup" className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:shadow-md transition">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden py-3 space-y-3 border-t border-gray-100">
                <Link to="/courses" className="block text-sm text-gray-700 hover:text-blue-600">Courses</Link>
                <a href="#features" className="block text-sm text-gray-700 hover:text-blue-600">Features</a>
                <Link to="/about" className="block text-sm text-gray-700 hover:text-blue-600">About</Link>

                {isAuthenticated ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-900 font-medium">Welcome, {user?.name}</p>
                    <Link to="/profile" className="block text-sm text-gray-700 hover:text-blue-600">My Profile</Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" className="block w-full bg-gray-100 text-gray-700 px-4 py-1.5 rounded-md text-sm text-center">
                      Login
                    </Link>
                    <Link to="/signup" className="block w-full bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm text-center">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Powerful Learning Features
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of students choose EduEnroll for their learning journey. 
            Our platform combines cutting-edge technology with proven educational methods.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200">
              <div className="flex justify-center text-blue-600 mb-2">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg">
                  {feature.icon}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {feature.highlight}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-gray-600">
              Comprehensive tools and resources designed to enhance your learning experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition duration-200">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Students Love EduEnroll</h2>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Achieve Your Goals</h3>
              <p className="text-gray-600 mb-6">
                Join thousands of successful students who have transformed their careers through our comprehensive learning platform.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-700">4.8/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-700">50+ Countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our community of learners and unlock your potential with expert-led courses and cutting-edge learning tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition">
              Browse Courses
            </Link>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
