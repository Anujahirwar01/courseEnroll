import React ,{useState} from 'react';
import {  Target, CheckCircle, Globe,BookOpen, Users, Shield, TrendingUp, Menu, X, ChevronRight, Star, Clock, Award} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';


const About = () => {
      const { user, isAuthenticated, isLoading } = useAuth();
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const stats = [
        { icon: <Users className="w-6 h-6" />, label: "Active Students", value: "2,500+" },
        { icon: <BookOpen className="w-6 h-6" />, label: "Courses Available", value: "50+" },
        { icon: <Award className="w-6 h-6" />, label: "Expert Instructors", value: "30+" },
        { icon: <Star className="w-6 h-6" />, label: "Average Rating", value: "4.8" }
    ];

    const features = [
        {
            icon: <BookOpen className="w-8 h-8 text-blue-600" />,
            title: "Quality Education",
            description: "Access high-quality courses created by industry experts and experienced instructors."
        },
        {
            icon: <Users className="w-8 h-8 text-green-600" />,
            title: "Community Learning",
            description: "Join a vibrant community of learners and interact with peers from around the world."
        },
        {
            icon: <Globe className="w-8 h-8 text-purple-600" />,
            title: "Global Access",
            description: "Learn from anywhere, anytime with our fully online platform and mobile-friendly design."
        },
        {
            icon: <Shield className="w-8 h-8 text-orange-600" />,
            title: "Secure Platform",
            description: "Your data and progress are protected with industry-standard security measures."
        }
    ];

    const values = [
        {
            title: "Innovation",
            description: "We constantly evolve our platform to provide cutting-edge learning experiences."
        },
        {
            title: "Excellence",
            description: "We maintain the highest standards in course quality and student experience."
        },
        {
            title: "Accessibility",
            description: "Education should be accessible to everyone, regardless of location or background."
        },
        {
            title: "Growth",
            description: "We believe in continuous learning and personal development for all our students."
        }
    ];

    const team = [
        {
            name: "Dr. Sarah Johnson",
            role: "Lead Instructor - Full Stack Development",
            description: "10+ years experience in web development and software architecture.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
        },
        {
            name: "Prof. Michael Chen",
            role: "Data Science & AI Instructor",
            description: "Former Google engineer with expertise in machine learning and data analytics.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
        },
        {
            name: "Emily Rodriguez",
            role: "Mobile Development Specialist",
            description: "iOS and Android development expert with 8+ years of industry experience.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
        }
    ];

    return (
        
        <div className="min-h-screen bg-gray-50 ">
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
            <section className=" bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">About EduEnroll</h1>
                    <p className="text-lg md:text-xl mb-6 text-blue-100 max-w-2xl mx-auto">
                        Empowering learners worldwide with high-quality, accessible education through innovative technology
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                        <div className="bg-white p-2 rounded-full">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="text-xl font-bold">EduEnroll Platform</span>
                    </div>
                </div>
            </section>            {/* Mission Section */}
            <section className="py-10 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-base text-gray-600 mb-4">
                                At EduEnroll, we're committed to democratizing education by making high-quality learning
                                accessible to everyone. Our platform connects students with expert instructors from around
                                the world, fostering a global learning community.
                            </p>
                            <p className="text-base text-gray-600 mb-6">
                                Built with modern MERN stack technology, we provide a seamless, secure, and engaging
                                learning experience that adapts to your schedule and learning style.
                            </p>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-gray-700 text-sm">Trusted by thousands of students worldwide</span>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                                    alt="Students learning"
                                    className="rounded-lg shadow-lg w-full h-48 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-10 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Impact</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center bg-white rounded-lg p-4 shadow-md">
                                <div className="flex justify-center text-blue-600 mb-3">
                                    {stat.icon}
                                </div>
                                <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-gray-600 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-10 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">Why Choose EduEnroll?</h2>
                    <p className="text-base text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                        We're more than just an online learning platform. We're your partner in personal and professional growth.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-3">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-10 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Values</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            {/* <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Meet Our Instructors</h2>
                    <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Learn from industry experts who bring real-world experience to every lesson.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Technology Section */}
            {/* <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Built with Modern Technology</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        EduEnroll is built using the MERN stack (MongoDB, Express.js, React, Node.js)
                        to provide a fast, secure, and scalable learning platform.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                        <div className="text-center">
                            <div className="bg-green-600 rounded-lg p-4 inline-block mb-3">
                                <span className="text-2xl font-bold">M</span>
                            </div>
                            <p className="text-sm">MongoDB</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-yellow-600 rounded-lg p-4 inline-block mb-3">
                                <span className="text-2xl font-bold">E</span>
                            </div>
                            <p className="text-sm">Express.js</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-600 rounded-lg p-4 inline-block mb-3">
                                <span className="text-2xl font-bold">R</span>
                            </div>
                            <p className="text-sm">React</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-700 rounded-lg p-4 inline-block mb-3">
                                <span className="text-2xl font-bold">N</span>
                            </div>
                            <p className="text-sm">Node.js</p>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className="py-12 bg-blue-600">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-2xl font-bold text-white mb-3">Ready to Start Learning?</h2>
                    <p className="text-lg text-blue-100 mb-6">
                        Join thousands of students who are already advancing their careers with EduEnroll
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/courses" className="bg-white text-blue-600 px-6 py-2 rounded-lg text-base font-semibold hover:shadow-lg transition">
                            Browse Courses
                        </Link>
                        <button className="border-2 border-white text-white px-6 py-2 rounded-lg text-base font-semibold hover:bg-white hover:text-blue-600 transition">
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
