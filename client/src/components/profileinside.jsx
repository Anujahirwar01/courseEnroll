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
    Target
} from 'lucide-react';
import { useAuth } from '../context/authcontext';

const ProfileInside = () => {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || 'John Doe',
        email: user?.email || 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        bio: 'Passionate learner and technology enthusiast. Currently pursuing full-stack development and excited about building innovative solutions.',
        joinDate: 'January 2024',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    });

    const [stats] = useState({
        coursesCompleted: 8,
        hoursLearned: 127,
        certificates: 5,
        currentStreak: 12
    });

    const [enrolledCourses] = useState([
        {
            id: 1,
            title: 'Full Stack Web Development',
            progress: 75,
            instructor: 'Dr. Sarah Johnson',
            duration: '12 weeks',
            status: 'In Progress'
        },
        {
            id: 2,
            title: 'React Advanced Concepts',
            progress: 100,
            instructor: 'Prof. Michael Chen',
            duration: '8 weeks',
            status: 'Completed'
        },
        {
            id: 3,
            title: 'Node.js & Express Mastery',
            progress: 45,
            instructor: 'Emily Rodriguez',
            duration: '10 weeks',
            status: 'In Progress'
        }
    ]);

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

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save to backend
        console.log('Saving profile data:', profileData);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original data if needed
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

    return (
        <div className="min-h-screen bg-gray-50 py-2">
            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">

                {/* Profile Header */}
                <div className="bg-white rounded shadow-sm mb-3">
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
                                        className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-medium hover:bg-green-700 transition flex items-center space-x-0.5"
                                    >
                                        <Save className="w-2.5 h-2.5" />
                                        <span>Save</span>
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
                                            className="text-lg font-bold text-gray-900 mb-0.5 border-b border-blue-300 focus:border-blue-500 outline-none bg-transparent w-full"
                                        />
                                        <textarea
                                            value={profileData.bio}
                                            onChange={(e) => handleInputChange('bio', e.target.value)}
                                            className="text-gray-600 mb-2 border border-gray-300 rounded p-1.5 w-full resize-none focus:border-blue-500 outline-none text-xs"
                                            rows="2"
                                        />
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

                    {/* Enrolled Courses */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded shadow-sm p-3">
                            <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
                                <BookOpen className="w-3 h-3 mr-1.5" />
                                My Courses
                            </h2>
                            <div className="space-y-2">
                                {enrolledCourses.map((course) => (
                                    <div key={course.id} className="border border-gray-200 rounded p-2 hover:shadow-sm transition">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-semibold text-gray-900 text-xs">{course.title}</h3>
                                            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${course.status === 'Completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {course.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 mb-1">
                                            {course.instructor} • {course.duration}
                                        </p>
                                        <div className="flex items-center space-x-1.5">
                                            <div className="flex-1 bg-gray-200 rounded-full h-1">
                                                <div
                                                    className={`h-1 rounded-full ${getProgressColor(course.progress)}`}
                                                    style={{ width: `${course.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">{course.progress}%</span>
                                        </div>
                                    </div>
                                ))}
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
                                    onClick={logout}
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
