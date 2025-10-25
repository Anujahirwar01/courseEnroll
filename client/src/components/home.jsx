import React, { useState } from 'react';
import { BookOpen, Users, Shield, TrendingUp, Menu, X, ChevronRight, Star, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Profile from './profile';
import { useAuth } from '../context/authcontext.jsx';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

  // Debug: Check what we're getting from auth
  console.log('Auth Debug:', { user, isAuthenticated, isLoading });

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      instructor: "Dr. Sarah Johnson",
      duration: "12 weeks",
      enrolled: 234,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      instructor: "Prof. Michael Chen",
      duration: "16 weeks",
      enrolled: 189,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Mobile App Development",
      instructor: "Emily Rodriguez",
      duration: "10 weeks",
      enrolled: 156,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop"
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Quality Courses",
      description: "Access to high-quality courses created by expert instructors with real-world experience"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Easy Enrollment",
      description: "Simple enrollment process with instant access to course materials and community"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor your learning progress, complete assignments, and earn certificates"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Learning",
      description: "Safe and secure platform with protected content and personal progress tracking"
    }
  ];

  const stats = [
    { label: "Active Courses", value: "50+" },
    { label: "Enrolled Students", value: "2,500+" },
    { label: "Expert Instructors", value: "30+" },
    { label: "Success Rate", value: "95%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
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
              <a href="#features" className="text-sm text-gray-700 hover:text-blue-600 transition">Features</a>
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold">
              🎓 A Best Learning Platform
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Enroll in Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Dream Course </span>
              Today
            </h1>
            <p className="text-lg text-gray-600">
              Secure, modern platform for students. Free courses, track Growth, and build your future with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/courses" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-base font-semibold hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center">
                Browse Courses <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 shadow-xl transform rotate-2 hover:rotate-0 transition duration-500">
              <div className="bg-white rounded-lg p-4 transform -rotate-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <Award className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Enrollments</p>
                      <p className="text-lg font-bold text-gray-900">2,543</p>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600 mb-2">Quick Stats</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-blue-50 p-2 rounded-md">
                        <p className="text-xs text-gray-600">Active</p>
                        <p className="text-sm font-bold text-blue-600">50+</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded-md">
                        <p className="text-xs text-gray-600">Rating</p>
                        <p className="text-sm font-bold text-purple-600">4.8★</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl md:text-3xl font-bold bg-blue-600 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Powerful Features</h2>
          <p className="text-base text-gray-600">Everything you need for seamless course management</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-3">
                <div className="w-6 h-6">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Featured Courses</h2>
            <p className="text-base text-gray-600">Start learning with our top-rated courses</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1">
                <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                      {course.duration}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-gray-700 font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      {course.enrolled} enrolled
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:shadow-md transition">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-base text-blue-100 mb-6">
            Join thousands of students already enrolled in our courses
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to='/signup' className="bg-white text-blue-600 px-8 py-3 rounded-lg text-base font-semibold hover:shadow-lg transition transform hover:-translate-y-0.5">
              Sign Up Now
            </Link>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-base font-semibold hover:bg-white hover:text-blue-600 transition">
              Browse Courses
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">EduEnroll</span>
              </div>
              <p className="text-gray-400">Modern course enrollment platform built for Students.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/courses" className="hover:text-blue-400 transition">Browse Courses</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition">My Learning</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Certificates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
                {/* <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li> */}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EduEnroll. Built by Student, For the Students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}