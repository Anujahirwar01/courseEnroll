import React, { useState } from 'react';
import { User, Settings, BookOpen, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const Profile = ({ user }) => {
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    // Guard clause - don't render if no user
    if (!user) {
        return null;
    }

    return (
        <div className="relative">
            {/* Profile Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
            >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium">{user?.name || 'User'}</span>
                <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500">{user?.email || 'No email'}</p>
                    </div>

                    <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                    </Link>

                    {/* <Link
                        to="/my-courses"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        <BookOpen className="w-4 h-4 mr-2" />
                        My Courses
                    </Link>

                    <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                    </Link> */}

                    <div className="border-t border-gray-100">
                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;