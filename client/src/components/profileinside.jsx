import React, { useState, useEffect } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    BookOpen,
    Award,
    Edit3,
    Save,
    X,
    Camera,
    Settings,
    Clock,
    Star,
    TrendingUp,
    Target,
    Menu,

} from 'lucide-react';
import { useAuth } from '../context/authcontext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './profile';

const ProfileInside = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [profileExists, setProfileExists] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        location: '',
        bio: '',
        joinDate: '',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    });

    const [stats] = useState({
        coursesCompleted: 8,
        hoursLearned: 127,
        certificates: 5,
        currentStreak: 12
    });

    const [enrolledCourses, setEnrolledCourses] = useState(new Set());

    const [achievements] = useState([
        {
            id: 1,
            title: 'Fast Learner',
            description: 'Completed 5 courses in 3 months',
            icon: <TrendingUp className="w-6 h-6" />,
            date: 'March 2024'
        },
        {
            id: 2,
            title: 'Perfect Attendance',
            description: 'Maintained 12-day learning streak',
            icon: <Target className="w-6 h-6" />,
            date: 'February 2024'
        },
        {
            id: 3,
            title: 'Full Stack Graduate',
            description: 'Completed Full Stack Development track',
            icon: <Award className="w-6 h-6" />,
            date: 'January 2024'
        }
    ]);

    // API Base URL
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

    // Available courses data (matching the structure from courses.jsx)
    const availableCourses = [
        {
            id: 1,
            title: "Full Stack Web Development Bootcamp",
            instructor: "Dr. Sarah Johnson",
            category: "Web Development",
            duration: "12 weeks",
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
            description: "Master full stack development with React, Node.js, Express, and MongoDB. Build real-world projects.",
            lessons: 45
        },
        {
            id: 2,
            title: "Data Structure and Algorithms",
            instructor: "Prof. Michael Chen",
            category: "Data Structures and Algorithms",
            duration: "16 weeks",
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
            description: "Learn essential data structures and algorithms. Optimize code and solve complex problems.",
            lessons: 60
        },
        {
            id: 3,
            title: "React Native Mobile App Development",
            instructor: "Emily Rodriguez",
            category: "Mobile Development",
            duration: "10 weeks",
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
            description: "Build cross-platform mobile apps with React Native. Deploy to iOS and Android.",
            lessons: 38
        },
        {
            id: 4,
            title: "UI/UX Design Fundamentals",
            instructor: "Alex Thompson",
            category: "UI/UX Design",
            duration: "8 weeks",
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
            description: "Master design principles, Figma, prototyping, and user research methodologies.",
            lessons: 30
        },
        {
            id: 5,
            title: "Python for Data Analysis",
            instructor: "Dr. James Wilson",
            category: "Data Science",
            duration: "6 weeks",
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
            description: "Learn Python programming for data analysis with pandas, NumPy, and matplotlib.",
            lessons: 25
        },
        {
            id: 6,
            title: "Advanced JavaScript & TypeScript",
            instructor: "Maria Garcia",
            category: "Web Development",
            duration: "14 weeks",
            level: "Advanced",
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
            description: "Deep dive into modern JavaScript, TypeScript, design patterns, and best practices.",
            lessons: 52
        }
    ];

    // Load enrolled courses from localStorage
    useEffect(() => {
        const storedEnrollments = localStorage.getItem('enrolledCourses');
        if (storedEnrollments) {
            try {
                const enrollmentIds = JSON.parse(storedEnrollments);
                // Normalize IDs to numbers to match course data
                setEnrolledCourses(new Set(enrollmentIds.map(id => Number(id))));
            } catch (error) {
                console.error('Error parsing enrolled courses:', error);
                setEnrolledCourses(new Set());
            }
        }
    }, []);

    // Load profile data on component mount
    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);

    // Load user profile from backend
    const loadProfile = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/users/profile-data`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.profile) {
                const profile = response.data.profile;
                setProfileData({
                    name: profile.name || user?.name || '',
                    email: profile.email || user?.email || '',
                    phone: profile.phone || '',
                    location: profile.location || '',
                    bio: profile.bio || '',
                    joinDate: formatJoinDate(profile.joinDate || profile.createdAt),
                    avatar: profile.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
                });
                setProfileExists(true);
            }
        } catch (error) {
            if (error.response?.status === 404) {
                // Profile doesn't exist, show create form
                setProfileExists(false);
                setProfileData(prev => ({
                    ...prev,
                    name: user?.name || '',
                    email: user?.email || ''
                }));
            } else {
                console.error('Error loading profile:', error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Format join date
    const formatJoinDate = (dateString) => {
        if (!dateString) return 'Recently';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    // Validate profile data
    const validateProfile = () => {
        const newErrors = {};

        if (!profileData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (profileData.bio && profileData.bio.length > 500) {
            newErrors.bio = 'Bio must be less than 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEdit = () => {
        setIsEditing(true);
        setErrors({});
        setSuccessMessage('');
    };

    const handleSave = async () => {
        if (!validateProfile()) {
            return;
        }

        setIsSaving(true);
        setErrors({});

        try {
            const token = localStorage.getItem('token');
            const endpoint = profileExists ? 'profile' : 'profile';
            const method = profileExists ? 'put' : 'post';

            const response = await axios[method](`${API_BASE_URL}/users/${endpoint}`, {
                name: profileData.name,
                phone: profileData.phone,
                location: profileData.location,
                bio: profileData.bio,
                avatar: profileData.avatar
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.profile) {
                const savedProfile = response.data.profile;
                setProfileData({
                    ...profileData,
                    joinDate: formatJoinDate(savedProfile.joinDate || savedProfile.createdAt)
                });
                setProfileExists(true);
                setIsEditing(false);
                setSuccessMessage(profileExists ? 'Profile updated successfully!' : 'Profile created successfully!');

                // Clear success message after 3 seconds
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                // Handle validation errors
                const validationErrors = {};
                error.response.data.errors.forEach(err => {
                    validationErrors[err.path] = err.msg;
                });
                setErrors(validationErrors);
            } else {
                setErrors({ general: 'Failed to save profile. Please try again.' });
            }
            console.error('Error saving profile:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setErrors({});
        setSuccessMessage('');
        // Reload original data
        if (profileExists) {
            loadProfile();
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/'); // Navigate to home page after logout
        } catch (error) {
            console.error('Logout failed:', error);
            // Still navigate to home even if logout fails
            navigate('/');
        }
    };

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const getProgressColor = (progress) => {
        if (progress === 100) return 'bg-green-500';
        if (progress >= 70) return 'bg-blue-500';
        if (progress >= 40) return 'bg-yellow-500';
        return 'bg-gray-400';
    };

    // Show loading screen
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-2">
                <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
                    <div className="bg-white rounded shadow-sm p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

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
            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">

                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-3 text-sm">
                        {successMessage}
                    </div>
                )}

                {/* General Error Message */}
                {errors.general && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3 text-sm">
                        {errors.general}
                    </div>
                )}

                {/* Profile Header */}
                <div className="bg-white rounded shadow-sm mt-3 mb-3">
                    <div className="relative h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t">
                        <div className="absolute -bottom-6 left-3">
                            <div className="relative">
                                <img
                                    src={profileData.avatar}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                                />
                                <button className="absolute bottom-0 right-0 bg-blue-600 p-0.5 rounded-full text-white hover:bg-blue-700 transition">
                                    <Camera className="w-2 h-2" />
                                </button>
                            </div>
                        </div>
                        <div className="absolute top-1 right-2">
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="bg-white/20 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-xs font-medium hover:bg-white/30 transition flex items-center space-x-0.5"
                                >
                                    <Edit3 className="w-2.5 h-2.5" />
                                    <span>Edit</span>
                                </button>
                            ) : (
                                <div className="flex space-x-1">
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center space-x-0.5"
                                    >
                                        {isSaving ? (
                                            <>
                                                <div className="animate-spin rounded-full h-2.5 w-2.5 border-b border-white"></div>
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-2.5 h-2.5" />
                                                <span>Save</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-medium hover:bg-red-700 transition flex items-center space-x-0.5"
                                    >
                                        <X className="w-2.5 h-2.5" />
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-8 pb-3 px-3">
                        <div className="grid md:grid-cols-3 gap-3">
                            <div className="md:col-span-2">
                                {!isEditing ? (
                                    <>
                                        <h1 className="text-lg font-bold text-gray-900 mb-0.5">{profileData.name}</h1>
                                        <p className="text-gray-600 mb-2 text-xs">{profileData.bio}</p>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className={`text-lg font-bold text-gray-900 mb-0.5 border-b ${errors.name ? 'border-red-300' : 'border-blue-300'} focus:border-blue-500 outline-none bg-transparent w-full`}
                                        />
                                        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}

                                        <textarea
                                            value={profileData.bio}
                                            onChange={(e) => handleInputChange('bio', e.target.value)}
                                            className={`text-gray-600 mb-2 border ${errors.bio ? 'border-red-300' : 'border-gray-300'} rounded p-1.5 w-full resize-none focus:border-blue-500 outline-none text-xs`}
                                            rows="2"
                                            placeholder="Tell us about yourself..."
                                        />
                                        {errors.bio && <span className="text-red-500 text-xs">{errors.bio}</span>}
                                    </>
                                )}

                                <div className="grid sm:grid-cols-2 gap-1 text-xs">
                                    <div className="flex items-center space-x-1.5">
                                        <Mail className="w-2.5 h-2.5 text-gray-400" />
                                        {!isEditing ? (
                                            <span className="text-gray-600 truncate">{profileData.email}</span>
                                        ) : (
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="text-gray-600 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent flex-1 text-xs"
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <Phone className="w-2.5 h-2.5 text-gray-400" />
                                        {!isEditing ? (
                                            <span className="text-gray-600">{profileData.phone}</span>
                                        ) : (
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="text-gray-600 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent flex-1 text-xs"
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <MapPin className="w-2.5 h-2.5 text-gray-400" />
                                        {!isEditing ? (
                                            <span className="text-gray-600">{profileData.location}</span>
                                        ) : (
                                            <input
                                                type="text"
                                                value={profileData.location}
                                                onChange={(e) => handleInputChange('location', e.target.value)}
                                                className="text-gray-600 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent flex-1 text-xs"
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <Calendar className="w-2.5 h-2.5 text-gray-400" />
                                        <span className="text-gray-600">Joined {profileData.joinDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            {/* <div className="bg-gray-50 rounded p-2">
                                <h3 className="font-semibold text-gray-900 mb-1.5 text-xs">Quick Stats</h3>
                                <div className="grid grid-cols-2 gap-1.5 text-center">
                                    <div>
                                        <div className="text-sm font-bold text-blue-600">{stats.coursesCompleted}</div>
                                        <div className="text-xs text-gray-600">Courses</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-green-600">{stats.hoursLearned}h</div>
                                        <div className="text-xs text-gray-600">Learned</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-purple-600">{stats.certificates}</div>
                                        <div className="text-xs text-gray-600">Certificates</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-orange-600">{stats.currentStreak}</div>
                                        <div className="text-xs text-gray-600">Day Streak</div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-3">

                    {/* /* Enrolled Courses */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded shadow-sm p-3">
                            <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
                                <BookOpen className="w-3 h-3 mr-1.5" />
                                My Courses
                            </h2>
                            <div className="space-y-2">
                                {enrolledCourses.size === 0 ? (
                                    <div className="text-center py-8">
                                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500 text-sm">No courses enrolled yet</p>
                                        <Link
                                            to="/courses"
                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block"
                                        >
                                            Browse Courses
                                        </Link>
                                    </div>
                                ) : (
                                    availableCourses
                                        .filter(course => enrolledCourses.has(course.id))
                                        .map((course) => (
                                            <div key={course.id} className="border border-gray-200 rounded p-3 hover:shadow-sm transition">
                                                <div className="flex items-start space-x-3">
                                                    <img
                                                        src={course.image}
                                                        alt={course.title}
                                                        className="w-12 h-12 rounded object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900 text-sm">{course.title}</h3>
                                                        <p className="text-xs text-gray-600 mt-1">{course.description}</p>
                                                        <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                                                            <span className="flex items-center">
                                                                <User className="w-3 h-3 mr-1" />
                                                                {course.instructor}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Clock className="w-3 h-3 mr-1" />
                                                                {course.duration}
                                                            </span>
                                                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                                                {course.level}
                                                            </span>
                                                        </div>
                                                        <div className="mt-2">
                                                            <Link
                                                                to={course.id === 1 ? '/course/fullstack' : course.id === 2 ? '/course/dsa' : course.id === 6 ? '/course/javascript' : course.id === 4 ? '/course/uiux' : course.id === 3 ? '/course/reactnative' : '#'}
                                                                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-xs font-medium"
                                                            >
                                                                Continue Learning
                                                                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">

                        {/* Settings */}
                        <div className="bg-white rounded shadow-sm p-3">
                            <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
                                <Settings className="w-3 h-3 mr-1.5" />
                                Quick Actions
                            </h2>
                            <div className="space-y-0.5">
                                <button className="w-full text-left px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded transition">
                                    Account Settings
                                </button>
                                <button className="w-full text-left px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded transition">
                                    Privacy & Security
                                </button>
                                <button className="w-full text-left px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded transition">
                                    Notification Preferences
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInside;
