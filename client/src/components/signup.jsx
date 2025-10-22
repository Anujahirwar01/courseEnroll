import React, { useState } from 'react'

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
            <div className="w-full max-w-sm mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Sign Up
                    </h1>
                    <p className="text-sm text-gray-600">
                        Create your account to get started
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 placeholder-gray-500 transition duration-200"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 placeholder-gray-500 transition duration-200"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a strong password"
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 placeholder-gray-500 transition duration-200"
                            />
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start mt-4">
                            <input
                                id="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded shrink-0"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-700 leading-tight">
                                I agree to the{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full mt-6 bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm transition duration-200"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-center mt-4">
                    <p className="text-xs text-gray-500 leading-tight">
                        By creating an account, you agree to our privacy policy and terms of service.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
