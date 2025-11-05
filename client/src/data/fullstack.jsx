import React, { useState, useEffect } from 'react';
import {
    Code,
    Database,
    Server,
    Globe,
    CheckCircle,
    Circle,
    Search,
    Filter,
    BookOpen,
    Play,
    FileText,
    ExternalLink,
    User,
    ArrowLeft,
    Clock,
    Trophy,
    Target,
    Zap,
    Layers,
    GitBranch,
    Cloud,
    Shield
} from 'lucide-react';
import { useAuth } from '../context/authcontext';
import { useNavigate, Link } from 'react-router-dom';

const MERNStackCourse = () => {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [courseLoading, setCourseLoading] = useState(true);
    const [completedTopics, setCompletedTopics] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedModule, setSelectedModule] = useState('all');
    const [activeTab, setActiveTab] = useState('overview');

    // Course modules and topics
    const courseModules = [
        {
            id: 'frontend',
            title: 'Frontend Development (React)',
            icon: <Globe className="w-5 h-5" />,
            color: 'blue',
            description: 'Master React.js and modern frontend development'
        },
        {
            id: 'backend',
            title: 'Backend Development (Node.js & Express)',
            icon: <Server className="w-5 h-5" />,
            color: 'green',
            description: 'Build robust server-side applications'
        },
        {
            id: 'database',
            title: 'Database (MongoDB)',
            icon: <Database className="w-5 h-5" />,
            color: 'orange',
            description: 'Learn NoSQL database management'
        },
        {
            id: 'integration',
            title: 'Full Stack Integration',
            icon: <Layers className="w-5 h-5" />,
            color: 'purple',
            description: 'Connect frontend and backend seamlessly'
        },
        {
            id: 'deployment',
            title: 'Deployment & DevOps',
            icon: <Cloud className="w-5 h-5" />,
            color: 'indigo',
            description: 'Deploy applications to production'
        }
    ];

    const courseTopics = [
        // Frontend Development (React)
        {
            id: 1,
            title: 'Introduction to React',
            module: 'frontend',
            difficulty: 'Beginner',
            description: 'Learn React fundamentals, JSX, and component basics',
            topics: ['JSX Syntax', 'Components', 'Props', 'Virtual DOM'],
            estimatedTime: '2 hours',
            resources: {
                video: 'https://example.com/react-intro',
                documentation: 'https://reactjs.org/docs/getting-started.html',
                practice: 'Build your first React component'
            }
        },
        {
            id: 2,
            title: 'React Hooks and State Management',
            module: 'frontend',
            difficulty: 'Intermediate',
            description: 'Master useState, useEffect, and custom hooks',
            topics: ['useState Hook', 'useEffect Hook', 'Custom Hooks', 'State Lifting'],
            estimatedTime: '3 hours',
            resources: {
                video: 'https://example.com/react-hooks',
                documentation: 'https://reactjs.org/docs/hooks-intro.html',
                practice: 'Create a todo app with hooks'
            }
        },
        {
            id: 3,
            title: 'React Router and Navigation',
            module: 'frontend',
            difficulty: 'Intermediate',
            description: 'Implement client-side routing in React applications',
            topics: ['React Router Setup', 'Route Parameters', 'Nested Routes', 'Protected Routes'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/react-router',
                documentation: 'https://reactrouter.com/',
                practice: 'Build a multi-page React app'
            }
        },
        {
            id: 4,
            title: 'Context API and Global State',
            module: 'frontend',
            difficulty: 'Advanced',
            description: 'Manage global state without external libraries',
            topics: ['Context API', 'useContext Hook', 'State Providers', 'Performance Optimization'],
            estimatedTime: '2 hours',
            resources: {
                video: 'https://example.com/context-api',
                documentation: 'https://reactjs.org/docs/context.html',
                practice: 'Implement authentication context'
            }
        },
        {
            id: 5,
            title: 'React Forms and Validation',
            module: 'frontend',
            difficulty: 'Intermediate',
            description: 'Handle forms, inputs, and validation in React',
            topics: ['Controlled Components', 'Form Validation', 'Custom Form Hooks', 'Form Libraries'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/react-forms',
                documentation: 'https://reactjs.org/docs/forms.html',
                practice: 'Build a registration form with validation'
            }
        },

        // Backend Development (Node.js & Express)
        {
            id: 6,
            title: 'Node.js Fundamentals',
            module: 'backend',
            difficulty: 'Beginner',
            description: 'Introduction to Node.js runtime and core modules',
            topics: ['Node.js Architecture', 'Modules', 'File System', 'Asynchronous Programming'],
            estimatedTime: '3 hours',
            resources: {
                video: 'https://example.com/nodejs-intro',
                documentation: 'https://nodejs.org/en/docs/',
                practice: 'Create a simple file server'
            }
        },
        {
            id: 7,
            title: 'Express.js Framework',
            module: 'backend',
            difficulty: 'Intermediate',
            description: 'Build web applications with Express.js',
            topics: ['Express Setup', 'Routing', 'Middleware', 'Request/Response'],
            estimatedTime: '3.5 hours',
            resources: {
                video: 'https://example.com/express-basics',
                documentation: 'https://expressjs.com/',
                practice: 'Build a REST API server'
            }
        },
        {
            id: 8,
            title: 'RESTful API Design',
            module: 'backend',
            difficulty: 'Intermediate',
            description: 'Design and implement RESTful APIs',
            topics: ['REST Principles', 'HTTP Methods', 'Status Codes', 'API Documentation'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/rest-api',
                documentation: 'https://restfulapi.net/',
                practice: 'Create a complete CRUD API'
            }
        },
        {
            id: 9,
            title: 'Authentication & Authorization',
            module: 'backend',
            difficulty: 'Advanced',
            description: 'Implement secure authentication systems',
            topics: ['JWT Tokens', 'Password Hashing', 'Middleware Authentication', 'Role-based Access'],
            estimatedTime: '4 hours',
            resources: {
                video: 'https://example.com/auth-jwt',
                documentation: 'https://jwt.io/',
                practice: 'Build authentication system'
            }
        },
        {
            id: 10,
            title: 'Error Handling and Validation',
            module: 'backend',
            difficulty: 'Intermediate',
            description: 'Handle errors and validate data properly',
            topics: ['Error Middleware', 'Input Validation', 'Custom Errors', 'Logging'],
            estimatedTime: '2 hours',
            resources: {
                video: 'https://example.com/error-handling',
                documentation: 'https://expressjs.com/en/guide/error-handling.html',
                practice: 'Implement comprehensive error handling'
            }
        },

        // Database (MongoDB)
        {
            id: 11,
            title: 'MongoDB Fundamentals',
            module: 'database',
            difficulty: 'Beginner',
            description: 'Introduction to NoSQL and MongoDB basics',
            topics: ['NoSQL Concepts', 'Collections', 'Documents', 'BSON Data Types'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/mongodb-intro',
                documentation: 'https://docs.mongodb.com/',
                practice: 'Create your first MongoDB database'
            }
        },
        {
            id: 12,
            title: 'Mongoose ODM',
            module: 'database',
            difficulty: 'Intermediate',
            description: 'Object Document Mapping with Mongoose',
            topics: ['Schemas', 'Models', 'Validation', 'Middleware'],
            estimatedTime: '3 hours',
            resources: {
                video: 'https://example.com/mongoose-odm',
                documentation: 'https://mongoosejs.com/',
                practice: 'Design database schemas'
            }
        },
        {
            id: 13,
            title: 'Database Operations',
            module: 'database',
            difficulty: 'Intermediate',
            description: 'CRUD operations and advanced queries',
            topics: ['Create', 'Read', 'Update', 'Delete', 'Aggregation Pipeline'],
            estimatedTime: '3.5 hours',
            resources: {
                video: 'https://example.com/mongodb-crud',
                documentation: 'https://docs.mongodb.com/manual/crud/',
                practice: 'Implement complex database queries'
            }
        },
        {
            id: 14,
            title: 'Database Relationships',
            module: 'database',
            difficulty: 'Advanced',
            description: 'Model relationships in MongoDB',
            topics: ['Embedded Documents', 'References', 'Population', 'Transactions'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/mongodb-relationships',
                documentation: 'https://docs.mongodb.com/manual/tutorial/model-relationships-between-documents/',
                practice: 'Design relational data models'
            }
        },

        // Full Stack Integration
        {
            id: 15,
            title: 'Connecting React to Express API',
            module: 'integration',
            difficulty: 'Intermediate',
            description: 'Integrate frontend and backend applications',
            topics: ['Axios HTTP Client', 'API Integration', 'Error Handling', 'Loading States'],
            estimatedTime: '3 hours',
            resources: {
                video: 'https://example.com/react-api-integration',
                documentation: 'https://axios-http.com/',
                practice: 'Connect React app to your API'
            }
        },
        {
            id: 16,
            title: 'State Management with API',
            module: 'integration',
            difficulty: 'Advanced',
            description: 'Manage application state with server data',
            topics: ['Data Fetching Patterns', 'Caching', 'Optimistic Updates', 'Real-time Updates'],
            estimatedTime: '3.5 hours',
            resources: {
                video: 'https://example.com/state-management-api',
                documentation: 'https://react-query.tanstack.com/',
                practice: 'Implement advanced state management'
            }
        },
        {
            id: 17,
            title: 'File Upload and Media Handling',
            module: 'integration',
            difficulty: 'Advanced',
            description: 'Handle file uploads and media in full stack apps',
            topics: ['Multer Middleware', 'File Validation', 'Cloud Storage', 'Image Processing'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/file-upload',
                documentation: 'https://github.com/expressjs/multer',
                practice: 'Build file upload feature'
            }
        },
        {
            id: 18,
            title: 'Real-time Communication',
            module: 'integration',
            difficulty: 'Advanced',
            description: 'Implement real-time features with Socket.IO',
            topics: ['WebSockets', 'Socket.IO', 'Real-time Events', 'Chat Applications'],
            estimatedTime: '4 hours',
            resources: {
                video: 'https://example.com/socketio',
                documentation: 'https://socket.io/',
                practice: 'Create a real-time chat app'
            }
        },

        // Deployment & DevOps
        {
            id: 19,
            title: 'Production Environment Setup',
            module: 'deployment',
            difficulty: 'Intermediate',
            description: 'Prepare applications for production deployment',
            topics: ['Environment Variables', 'Production Build', 'Security Headers', 'Performance Optimization'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/prod-setup',
                documentation: 'https://create-react-app.dev/docs/deployment/',
                practice: 'Optimize app for production'
            }
        },
        {
            id: 20,
            title: 'Cloud Deployment (Heroku/Vercel)',
            module: 'deployment',
            difficulty: 'Intermediate',
            description: 'Deploy applications to cloud platforms',
            topics: ['Heroku Deployment', 'Vercel Deployment', 'Database Hosting', 'Domain Configuration'],
            estimatedTime: '3 hours',
            resources: {
                video: 'https://example.com/cloud-deployment',
                documentation: 'https://devcenter.heroku.com/',
                practice: 'Deploy your full stack app'
            }
        },
        {
            id: 21,
            title: 'CI/CD Pipeline',
            module: 'deployment',
            difficulty: 'Advanced',
            description: 'Implement continuous integration and deployment',
            topics: ['GitHub Actions', 'Automated Testing', 'Build Pipeline', 'Deployment Automation'],
            estimatedTime: '3.5 hours',
            resources: {
                video: 'https://example.com/cicd-pipeline',
                documentation: 'https://docs.github.com/en/actions',
                practice: 'Set up automated deployment'
            }
        },
        {
            id: 22,
            title: 'Monitoring and Analytics',
            module: 'deployment',
            difficulty: 'Advanced',
            description: 'Monitor application performance and user analytics',
            topics: ['Error Tracking', 'Performance Monitoring', 'User Analytics', 'Log Management'],
            estimatedTime: '2 hours',
            resources: {
                video: 'https://example.com/monitoring',
                documentation: 'https://sentry.io/welcome/',
                practice: 'Implement monitoring and analytics'
            }
        }
    ];

    // Check authentication and redirect if needed
    useEffect(() => {
        // wait for auth context to finish loading
        if (authLoading) return;

        if (!isAuthenticated) {
            navigate('/login', {
                state: {
                    message: 'Please login to access the MERN Stack course',
                    returnTo: '/course/fullstack'
                }
            });
            return;
        }

        setCourseLoading(false);
    }, [authLoading, isAuthenticated, navigate]);

    // Load completed topics from localStorage
    useEffect(() => {
        if (isAuthenticated && user) {
            const stored = localStorage.getItem(`mern_progress_${user.email}`);
            if (stored) {
                try {
                    const progress = JSON.parse(stored);
                    setCompletedTopics(new Set(progress));
                } catch (error) {
                    console.error('Error loading progress:', error);
                }
            }
        }
    }, [isAuthenticated, user]);

    // Save progress to localStorage
    const saveProgress = (newCompletedTopics) => {
        if (user?.email) {
            try {
                localStorage.setItem(
                    `mern_progress_${user.email}`,
                    JSON.stringify([...newCompletedTopics])
                );
            } catch (error) {
                console.error('Error saving progress:', error);
            }
        }
    };

    // Toggle topic completion
    const toggleTopicCompletion = (topicId) => {
        const newCompleted = new Set(completedTopics);
        if (newCompleted.has(topicId)) {
            newCompleted.delete(topicId);
        } else {
            newCompleted.add(topicId);
        }
        setCompletedTopics(newCompleted);
        saveProgress(newCompleted);
    };

    // Filter topics
    const filteredTopics = courseTopics.filter(topic => {
        const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesModule = selectedModule === 'all' || topic.module === selectedModule;

        return matchesSearch && matchesModule;
    });

    // Calculate progress
    const totalTopics = courseTopics.length;
    const completedCount = completedTopics.size;
    const progressPercentage = totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0;

    // Get module progress
    const getModuleProgress = (moduleId) => {
        const moduleTopics = courseTopics.filter(topic => topic.module === moduleId);
        const completedInModule = moduleTopics.filter(topic => completedTopics.has(topic.id)).length;
        return moduleTopics.length > 0 ? (completedInModule / moduleTopics.length) * 100 : 0;
    };

    // Get difficulty color
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'text-green-600 bg-green-100';
            case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
            case 'Advanced': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    // Get module color
    const getModuleColor = (moduleId) => {
        const module = courseModules.find(m => m.id === moduleId);
        return module ? module.color : 'gray';
    };

    // Loading screen
    if (courseLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading MERN Stack Course...</p>
                </div>
            </div>
        );
    }

    // Access denied screen for unauthenticated users
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
                    <p className="text-gray-600 mb-6">
                        Please login to access the MERN Stack course and track your progress.
                    </p>
                    <div className="space-y-3">
                        <Link
                            to="/login"
                            state={{ returnTo: '/course/fullstack', message: 'Login to access MERN Course' }}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium block"
                        >
                            Login to Continue
                        </Link>
                        <Link
                            to="/courses"
                            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium block"
                        >
                            Back to Courses
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/courses"
                                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="text-sm font-medium">Back to Courses</span>
                            </Link>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <div className="flex items-center space-x-2">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-lg">
                                    <Code className="w-4 h-4 text-white" />
                                </div>
                                <h1 className="text-lg font-bold text-gray-900">MERN Stack Course</h1>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                            <div className="text-center">
                                <div className="text-lg font-bold text-blue-600">{completedCount}</div>
                                <div className="text-xs text-gray-500">Completed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">{totalTopics}</div>
                                <div className="text-xs text-gray-500">Total Topics</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-green-600">{Math.round(progressPercentage)}%</div>
                                <div className="text-xs text-gray-500">Progress</div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                        <div className="bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Welcome Message */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
                            <p className="text-blue-100 mb-4">
                                Master the MERN Stack and become a full-stack developer
                            </p>
                            <div className="flex items-center space-x-6 text-sm">
                                <div className="flex items-center space-x-2">
                                    <Target className="w-4 h-4" />
                                    <span>22 Comprehensive Topics</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4" />
                                    <span>60+ Hours of Learning</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Trophy className="w-4 h-4" />
                                    <span>Industry-Ready Skills</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-white/20 rounded-lg p-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold">{Math.round(progressPercentage)}%</div>
                                    <div className="text-sm text-blue-100">Complete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { id: 'overview', label: 'Course Overview', icon: <BookOpen className="w-4 h-4" /> },
                                { id: 'topics', label: 'Topics & Learning', icon: <Code className="w-4 h-4" /> },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Course Modules */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Course Modules</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {courseModules.map((module) => {
                                            const progress = getModuleProgress(module.id);
                                            const moduleTopicsCount = courseTopics.filter(t => t.module === module.id).length;
                                            const completedInModule = courseTopics.filter(t => t.module === module.id && completedTopics.has(t.id)).length;

                                            return (
                                                <div key={module.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <div className={`bg-${module.color}-100 p-2 rounded-lg`}>
                                                            {module.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-900 text-sm">{module.title}</h4>
                                                            <p className="text-xs text-gray-600">{module.description}</p>
                                                        </div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                            <span>{completedInModule}/{moduleTopicsCount} topics</span>
                                                            <span>{Math.round(progress)}%</span>
                                                        </div>
                                                        <div className="bg-gray-200 rounded-full h-1.5">
                                                            <div
                                                                className={`bg-${module.color}-500 h-1.5 rounded-full transition-all duration-300`}
                                                                style={{ width: `${progress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => {
                                                            setSelectedModule(module.id);
                                                            setActiveTab('topics');
                                                        }}
                                                        className={`w-full bg-${module.color}-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-${module.color}-700 transition-colors`}
                                                    >
                                                        {progress === 100 ? 'Review Topics' : 'Start Learning'}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Learning Path */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Learning Path</h3>
                                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                                        <div className="space-y-4">
                                            {courseModules.map((module, index) => (
                                                <div key={module.id} className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <div className={`w-8 h-8 rounded-full bg-${module.color}-100 flex items-center justify-center text-${module.color}-600 font-bold text-sm`}>
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900 text-sm">{module.title}</h4>
                                                        <p className="text-xs text-gray-600">{module.description}</p>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        {getModuleProgress(module.id) === 100 ? (
                                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                                        ) : (
                                                            <Circle className="w-5 h-5 text-gray-300" />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'topics' && (
                            <div>
                                {/* Search and Filter */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search topics, descriptions, or technologies..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        />
                                    </div>

                                    <div className="relative">
                                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <select
                                            value={selectedModule}
                                            onChange={(e) => setSelectedModule(e.target.value)}
                                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white min-w-48"
                                        >
                                            <option value="all">All Modules</option>
                                            {courseModules.map((module) => (
                                                <option key={module.id} value={module.id}>
                                                    {module.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Topics List */}
                                <div className="space-y-4">
                                    {filteredTopics.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-500">No topics found matching your search.</p>
                                        </div>
                                    ) : (
                                        filteredTopics.map((topic) => {
                                            const isCompleted = completedTopics.has(topic.id);
                                            const moduleColor = getModuleColor(topic.module);
                                            const module = courseModules.find(m => m.id === topic.module);

                                            return (
                                                <div
                                                    key={topic.id}
                                                    className={`bg-white border rounded-lg p-4 hover:shadow-md transition-all duration-200 ${isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                                                        }`}
                                                >
                                                    <div className="flex items-start space-x-4">
                                                        <button
                                                            onClick={() => toggleTopicCompletion(topic.id)}
                                                            className="flex-shrink-0 mt-1"
                                                        >
                                                            {isCompleted ? (
                                                                <CheckCircle className="w-5 h-5 text-green-500 hover:text-green-600" />
                                                            ) : (
                                                                <Circle className="w-5 h-5 text-gray-300 hover:text-blue-500" />
                                                            )}
                                                        </button>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center space-x-3 mb-2">
                                                                <h3 className={`font-semibold text-sm ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                                                                    {topic.title}
                                                                </h3>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                                                                    {topic.difficulty}
                                                                </span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${moduleColor}-100 text-${moduleColor}-700`}>
                                                                    {module?.title}
                                                                </span>
                                                            </div>

                                                            <p className="text-gray-600 text-sm mb-3">
                                                                {topic.description}
                                                            </p>

                                                            <div className="flex flex-wrap gap-2 mb-3">
                                                                {topic.topics.map((subtopic, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                                                                    >
                                                                        {subtopic}
                                                                    </span>
                                                                ))}
                                                            </div>

                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                                    <div className="flex items-center space-x-1">
                                                                        <Clock className="w-3 h-3" />
                                                                        <span>{topic.estimatedTime}</span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center space-x-2">
                                                                    {topic.resources.video && (
                                                                        <a
                                                                            href={topic.resources.video}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs"
                                                                        >
                                                                            <Play className="w-3 h-3" />
                                                                            <span>Video</span>
                                                                        </a>
                                                                    )}
                                                                    {topic.resources.documentation && (
                                                                        <a
                                                                            href={topic.resources.documentation}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-xs"
                                                                        >
                                                                            <FileText className="w-3 h-3" />
                                                                            <span>Docs</span>
                                                                        </a>
                                                                    )}
                                                                    {topic.resources.practice && (
                                                                        <div className="flex items-center space-x-1 text-purple-600 text-xs">
                                                                            <Code className="w-3 h-3" />
                                                                            <span>Practice: {topic.resources.practice}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                {/* Progress Summary */}
                                {filteredTopics.length > 0 && (
                                    <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-1">Your Progress</h3>
                                                <p className="text-sm text-gray-600">
                                                    {completedCount} of {totalTopics} topics completed
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-blue-600 mb-1">
                                                    {Math.round(progressPercentage)}%
                                                </div>
                                                <p className="text-xs text-gray-500">Complete</p>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <div className="bg-white rounded-full h-3">
                                                <div
                                                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                                                    style={{ width: `${progressPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {progressPercentage === 100 && (
                                            <div className="mt-4 flex items-center space-x-2 text-green-600">
                                                <Trophy className="w-5 h-5" />
                                                <span className="font-semibold">Congratulations! You've completed the MERN Stack course! 🎉</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MERNStackCourse;
