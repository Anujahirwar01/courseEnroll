import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Clock, TrendingUp, Trophy, UserCheck } from 'lucide-react';
import { useAuth } from '../context/authcontext';

const ReactNativeCourse = () => {
    const { user } = useAuth();
    const [completedTopics, setCompletedTopics] = useState(new Set());
    const [activeModule, setActiveModule] = useState(0);
    const [showQA, setShowQA] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('react-native-progress');
        if (saved) {
            setCompletedTopics(new Set(JSON.parse(saved)));
        }
    }, []);

    const saveProgress = (newCompleted) => {
        localStorage.setItem('react-native-progress', JSON.stringify([...newCompleted]));
        setCompletedTopics(newCompleted);
    };

    const toggleTopic = (topicId) => {
        const newCompleted = new Set(completedTopics);
        if (newCompleted.has(topicId)) {
            newCompleted.delete(topicId);
        } else {
            newCompleted.add(topicId);
        }
        saveProgress(newCompleted);
    };

    const courseModules = [
        {
            title: "React Native Fundamentals",
            description: "Core concepts and setup for cross-platform mobile development",
            duration: "2 weeks",
            difficulty: "Beginner",
            topics: [
                "What is React Native? - Cross-platform mobile development overview",
                "React Native vs Native Development - Pros, cons, and use cases",
                "Development Environment Setup - Android Studio, Xcode, and CLI tools",
                "Expo vs React Native CLI - When to use each approach",
                "Project Structure - Understanding files, folders, and configurations",
                "JSX in React Native - Components, props, and mobile-specific syntax",
                "Running on Simulators and Devices - iOS Simulator and Android Emulator",
                "Hot Reload and Fast Refresh - Development workflow optimization"
            ]
        },
        {
            title: "Core Components & Styling",
            description: "Essential React Native components and mobile-first styling approaches",
            duration: "3 weeks",
            difficulty: "Beginner",
            topics: [
                "View, Text, and Image Components - Building blocks of mobile interfaces",
                "TouchableOpacity and Button - Creating interactive elements",
                "ScrollView and FlatList - Handling scrollable content efficiently",
                "TextInput and Forms - User input handling and validation",
                "StyleSheet and Inline Styles - React Native styling fundamentals",
                "Flexbox Layout - Mobile-responsive design patterns",
                "Dimensions and Screen Sizes - Adaptive layouts for different devices",
                "Platform-specific Styling - iOS vs Android design differences",
                "Safe Area and Status Bar - Handling device-specific UI elements"
            ]
        },
        {
            title: "Navigation & Routing",
            description: "Implementing navigation patterns for mobile app user flows",
            duration: "3 weeks",
            difficulty: "Intermediate",
            topics: [
                "React Navigation Setup - Installing and configuring navigation library",
                "Stack Navigator - Screen-to-screen navigation with history",
                "Tab Navigator - Bottom and top tab navigation patterns",
                "Drawer Navigator - Slide-out menu navigation implementation",
                "Nested Navigation - Combining multiple navigation patterns",
                "Navigation Props and Parameters - Passing data between screens",
                "Header Customization - Custom headers, buttons, and styling",
                "Deep Linking - Handling external links and app state restoration",
                "Navigation State Management - Persisting and restoring navigation state"
            ]
        },
        {
            title: "State Management",
            description: "Managing application state in React Native applications",
            duration: "3 weeks",
            difficulty: "Intermediate",
            topics: [
                "useState and useEffect - Local component state management",
                "Context API - Global state sharing across components",
                "Redux Setup - Predictable state container for mobile apps",
                "Redux Toolkit - Modern Redux patterns and best practices",
                "AsyncStorage - Persistent local data storage solutions",
                "State Persistence - Maintaining state across app sessions",
                "Middleware and Side Effects - Handling async operations",
                "State Architecture Patterns - Organizing complex application state",
                "Performance Optimization - Preventing unnecessary re-renders"
            ]
        },
        {
            title: "APIs & Data Management",
            description: "Fetching, caching, and managing data from external sources",
            duration: "3 weeks",
            difficulty: "Intermediate",
            topics: [
                "Fetch API and Axios - Making HTTP requests to REST APIs",
                "Async/Await Patterns - Handling asynchronous operations",
                "Error Handling - Network errors and retry mechanisms",
                "Loading States - User feedback during data operations",
                "Data Caching Strategies - Improving performance and offline experience",
                "React Query/SWR - Advanced data fetching and caching libraries",
                "GraphQL Integration - Modern API consumption patterns",
                "Offline Data Management - Local database solutions",
                "Real-time Data - WebSockets and real-time updates"
            ]
        },
        {
            title: "Device Features & Native APIs",
            description: "Accessing device capabilities and native platform features",
            duration: "4 weeks",
            difficulty: "Advanced",
            topics: [
                "Camera and Photo Library - Image capture and selection",
                "Geolocation Services - GPS positioning and location tracking",
                "Push Notifications - Local and remote notification handling",
                "Device Storage - File system access and document management",
                "Biometric Authentication - Fingerprint and face recognition",
                "Device Sensors - Accelerometer, gyroscope, and motion detection",
                "Native Modules - Bridging to platform-specific code",
                "Permissions Management - Runtime permission handling",
                "Background Tasks - Running code when app is not active"
            ]
        },
        {
            title: "Performance Optimization",
            description: "Techniques for building fast and efficient React Native applications",
            duration: "3 weeks",
            difficulty: "Advanced",
            topics: [
                "Performance Profiling - Identifying bottlenecks and memory leaks",
                "List Optimization - FlatList performance and virtualization",
                "Image Optimization - Caching, compression, and lazy loading",
                "Bundle Size Optimization - Code splitting and dynamic imports",
                "Native Module Performance - When to bridge to native code",
                "Memory Management - Preventing memory leaks and crashes",
                "Animation Performance - Using native driver for smooth animations",
                "Startup Time Optimization - Reducing initial load times",
                "Network Performance - Request optimization and caching strategies"
            ]
        },
        {
            title: "Testing & Debugging",
            description: "Comprehensive testing strategies and debugging techniques",
            duration: "3 weeks",
            difficulty: "Advanced",
            topics: [
                "Unit Testing with Jest - Testing business logic and utilities",
                "Component Testing - React Native Testing Library",
                "Integration Testing - Testing component interactions",
                "End-to-End Testing - Detox and Appium for full app testing",
                "Debug Tools - Flipper, React DevTools, and debugging techniques",
                "Error Monitoring - Crash reporting with Bugsnag or Sentry",
                "Performance Testing - Measuring and optimizing app performance",
                "Mock Services - Testing with mock APIs and data",
                "Continuous Integration - Automated testing in CI/CD pipelines"
            ]
        },
        {
            title: "App Store Deployment",
            description: "Preparing, building, and publishing apps to app stores",
            duration: "2 weeks",
            difficulty: "Advanced",
            topics: [
                "Build Configuration - Release builds and signing certificates",
                "iOS App Store Process - Xcode, TestFlight, and App Store Connect",
                "Google Play Store Process - Android App Bundle and Play Console",
                "App Store Optimization - Screenshots, descriptions, and metadata",
                "Version Management - Semantic versioning and release strategies",
                "Code Signing - iOS provisioning profiles and Android keystore",
                "Beta Testing - TestFlight and Play Console beta distribution",
                "App Store Guidelines - Meeting platform requirements and policies"
            ]
        },
        {
            title: "Advanced Topics & Best Practices",
            description: "Advanced patterns, security, and production considerations",
            duration: "4 weeks",
            difficulty: "Advanced",
            topics: [
                "Code Architecture - Clean architecture and design patterns",
                "Security Best Practices - Data encryption and secure storage",
                "Internationalization - Multi-language support and localization",
                "Accessibility - Making apps usable for users with disabilities",
                "Custom Component Libraries - Building reusable UI components",
                "Monorepo Strategies - Managing multi-platform codebases",
                "Web Integration - React Native Web and code sharing",
                "Third-party Library Integration - Choosing and integrating packages",
                "Production Monitoring - Analytics, crash reporting, and user feedback"
            ]
        }
    ];

    const courseQAs = [
        // Beginner Level
        {
            question: "What is React Native and how does it differ from native development?",
            answer: "React Native is a framework that allows you to build mobile apps using React and JavaScript. Unlike native development where you write separate code for iOS (Swift/Objective-C) and Android (Java/Kotlin), React Native lets you write once and deploy to both platforms. It uses native components under the hood, so apps have near-native performance while sharing most of the codebase.",
            level: "Beginner"
        },
        {
            question: "What's the difference between Expo and React Native CLI?",
            answer: "Expo is a platform and toolchain that simplifies React Native development with pre-built native modules and easy deployment. React Native CLI gives you more control and access to native code but requires more setup. Use Expo for rapid prototyping and simpler apps, use CLI when you need custom native modules or specific platform features.",
            level: "Beginner"
        },
        {
            question: "How does styling work in React Native?",
            answer: "React Native uses a subset of CSS implemented in JavaScript. You can use StyleSheet.create() for performance optimization, or inline styles. It uses Flexbox for layout by default. Unlike web CSS, there's no inheritance, and you use camelCase property names. Some CSS properties aren't available, but React Native provides mobile-specific alternatives.",
            level: "Beginner"
        },
        {
            question: "What are the core components in React Native?",
            answer: "Core components include: View (like div), Text (for displaying text), Image (for images), ScrollView (scrollable container), FlatList (performant lists), TextInput (text input), TouchableOpacity (touchable elements), Button (basic button), SafeAreaView (safe area handling), and Modal (overlay screens).",
            level: "Beginner"
        },
        {
            question: "How do you handle user input in React Native?",
            answer: "Use TextInput component with props like value, onChangeText, placeholder, keyboardType, etc. For forms, manage state with useState or form libraries like Formik. Handle different input types with keyboardType prop (numeric, email, etc.). Use onSubmitEditing for handling enter key and returnKeyType for keyboard return key appearance.",
            level: "Beginner"
        },
        {
            question: "What is Flexbox and how is it used in React Native?",
            answer: "Flexbox is the default layout system in React Native. Key properties include flexDirection (row/column), justifyContent (main axis alignment), alignItems (cross axis alignment), flex (size ratio), and flexWrap. Unlike web, the default flexDirection is 'column'. It's essential for creating responsive layouts that work across different screen sizes.",
            level: "Beginner"
        },
        {
            question: "How do you debug React Native applications?",
            answer: "Use React Native Debugger, Chrome DevTools, or Flipper for debugging. Enable Debug JS Remotely for debugging in Chrome. Use console.log, breakpoints, and React DevTools. For performance, use Flipper's performance monitor. Use Reactotron for Redux debugging and API monitoring. Xcode and Android Studio provide native debugging capabilities.",
            level: "Beginner"
        },
        {
            question: "What is AsyncStorage and when should you use it?",
            answer: "AsyncStorage is React Native's persistent storage system for simple key-value pairs. Use it for user preferences, authentication tokens, or small amounts of data that need to persist between app sessions. It's asynchronous and global to the app. For complex data, consider SQLite or Realm. Always handle promises/async-await when using AsyncStorage.",
            level: "Beginner"
        },

        // Intermediate Level
        {
            question: "How does React Navigation work and what are the different navigator types?",
            answer: "React Navigation provides navigation solutions for React Native. Main types: Stack Navigator (push/pop screens), Tab Navigator (bottom/top tabs), Drawer Navigator (side menu). You can nest navigators for complex flows. Navigation uses a navigation prop passed to screens, with methods like navigate(), goBack(), and push(). It maintains navigation state and history automatically.",
            level: "Intermediate"
        },
        {
            question: "What are the best practices for state management in React Native?",
            answer: "Start with local state (useState) for component-specific data. Use Context API for app-wide state that doesn't change frequently. Consider Redux or Zustand for complex state with many interactions. Keep AsyncStorage for persistent data. Use useReducer for complex local state logic. Avoid prop drilling by lifting state up appropriately or using global state management.",
            level: "Intermediate"
        },
        {
            question: "How do you optimize FlatList performance for large datasets?",
            answer: "Use keyExtractor for unique keys, set getItemLayout if item heights are fixed, implement onEndReached for pagination, use removeClippedSubviews for memory optimization, set maxToRenderPerBatch and updateCellsBatchingPeriod for render batching, use memo for list items to prevent unnecessary re-renders, and consider VirtualizedList for complex scenarios.",
            level: "Intermediate"
        },
        {
            question: "How do you handle API calls and loading states in React Native?",
            answer: "Use fetch or axios for HTTP requests with async/await. Manage loading states with useState. Handle errors with try/catch blocks. Consider using React Query or SWR for advanced caching and synchronization. Show loading indicators during requests. Implement retry mechanisms for failed requests. Store API responses in global state if needed across components.",
            level: "Intermediate"
        },
        {
            question: "What are the different ways to pass data between screens?",
            answer: "Use navigation parameters with route.params, global state management (Redux, Context), AsyncStorage for persistent data, or passing callbacks through navigation params. For complex data, use global state. For simple values, use params. For data that needs to persist, use AsyncStorage. Event emitters can be used for loosely coupled communication.",
            level: "Intermediate"
        },
        {
            question: "How do you implement custom hooks in React Native?",
            answer: "Custom hooks follow the same patterns as React hooks. Create functions starting with 'use' that can call other hooks. Common patterns: useAsyncStorage for storage operations, useApi for API calls, usePermissions for device permissions, useOrientation for screen orientation. Custom hooks promote reusability and separation of concerns.",
            level: "Intermediate"
        },
        {
            question: "What are the security considerations in React Native apps?",
            answer: "Secure sensitive data with Keychain (iOS) or Keystore (Android). Validate user inputs to prevent injection attacks. Use HTTPS for API calls. Implement certificate pinning for critical APIs. Obfuscate code in production builds. Store secrets securely, not in plain text. Use biometric authentication when appropriate. Implement proper session management.",
            level: "Intermediate"
        },
        {
            question: "How do you handle different screen sizes and orientations?",
            answer: "Use Dimensions API to get screen dimensions. Create responsive layouts with percentage-based widths and flexbox. Use Platform-specific styles when needed. Handle orientation changes with orientation libraries or Dimensions change listeners. Design for the smallest target screen first. Use aspectRatio for maintaining proportions. Test on various devices and simulators.",
            level: "Intermediate"
        },
        {
            question: "What is the React Native bridge and how does it work?",
            answer: "The bridge is the communication layer between JavaScript and native code. JavaScript runs in a separate thread and communicates with native modules asynchronously through JSON messages. This enables access to platform-specific APIs. The new architecture (Fabric/TurboModules) aims to replace the bridge with direct synchronous communication for better performance.",
            level: "Intermediate"
        },
        {
            question: "How do you implement push notifications in React Native?",
            answer: "Use libraries like @react-native-firebase/messaging or @react-native-push-notification. Set up Firebase Cloud Messaging or Apple Push Notification service. Handle notification permissions, token registration, and message handling. Implement both foreground and background notification handling. Test on real devices as push notifications don't work in simulators.",
            level: "Intermediate"
        },

        // Advanced Level
        {
            question: "How do you create and integrate native modules in React Native?",
            answer: "Native modules allow you to write platform-specific code in Swift/Objective-C (iOS) or Java/Kotlin (Android) and expose it to JavaScript. Create module classes that extend RCTBridgeModule (iOS) or ReactContextBaseJavaModule (Android). Use RCT_EXPORT_METHOD to expose methods. Handle callbacks and promises for async operations. Register modules in AppDelegate (iOS) or MainApplication (Android).",
            level: "Advanced"
        },
        {
            question: "What is the new React Native architecture (Fabric and TurboModules)?",
            answer: "The new architecture includes Fabric (new rendering system) and TurboModules (new native module system). Fabric provides better performance with synchronous layout and reduced bridge usage. TurboModules enable lazy loading of native modules and direct JavaScript-to-native communication. This architecture reduces bridge overhead and improves startup time and memory usage.",
            level: "Advanced"
        },
        {
            question: "How do you implement code splitting and lazy loading in React Native?",
            answer: "Use React.lazy() with Suspense for component-level code splitting. Implement dynamic imports for feature-based splitting. Use bundle splitting in Metro configuration. Consider Haul or other bundlers for advanced splitting. Lazy load screens that aren't immediately needed. Preload critical paths while lazy loading secondary features. Monitor bundle sizes with tools like bundle-analyzer.",
            level: "Advanced"
        },
        {
            question: "What are the best practices for React Native app performance optimization?",
            answer: "Use FlatList instead of ScrollView for long lists. Optimize images with appropriate formats and sizes. Use native driver for animations. Implement lazy loading and pagination. Minimize bridge communication. Use PureComponent or memo for components. Profile with Flipper or React DevTools. Reduce bundle size. Use ProGuard/R8 for Android. Optimize startup time with splash screens.",
            level: "Advanced"
        },
        {
            question: "How do you implement offline functionality in React Native?",
            answer: "Use @react-native-netinfo to detect connectivity. Implement local data storage with SQLite, Realm, or AsyncStorage. Cache API responses and sync when online. Use Redux Persist or similar for state persistence. Implement queue systems for offline actions. Show offline indicators to users. Handle conflict resolution for data synchronization. Consider using libraries like react-query for offline caching.",
            level: "Advanced"
        },
        {
            question: "What are the testing strategies for React Native applications?",
            answer: "Unit test business logic with Jest. Use React Native Testing Library for component testing. Implement integration tests for navigation flows. Use Detox for end-to-end testing on real devices/simulators. Mock native modules and APIs. Test on both platforms. Use Flipper for debugging tests. Implement visual regression testing. Set up CI/CD pipelines with automated testing.",
            level: "Advanced"
        },
        {
            question: "How do you handle memory management and prevent memory leaks?",
            answer: "Clean up subscriptions and timers in useEffect cleanup. Avoid circular references in objects. Use weak references where appropriate. Clean up event listeners. Avoid holding references to unmounted components. Use React DevTools Profiler to identify memory leaks. Implement proper cleanup in native modules. Monitor memory usage with platform tools. Use React.memo to prevent unnecessary re-renders.",
            level: "Advanced"
        },
        {
            question: "What are the considerations for implementing animations in React Native?",
            answer: "Use Animated API with native driver for smooth animations. Consider Reanimated library for complex animations. Use LayoutAnimation for automatic layout transitions. Implement gesture-based animations with PanGestureHandler. Avoid animating many properties simultaneously. Use transform properties for performance. Cache animated values. Consider using Lottie for complex animations. Test animations on lower-end devices.",
            level: "Advanced"
        },
        {
            question: "How do you implement deep linking and universal links?",
            answer: "Configure URL schemes in iOS (Info.plist) and Android (AndroidManifest.xml). Use React Navigation for handling navigation from deep links. Implement universal links (iOS) and app links (Android) for web-to-app transitions. Handle link parsing and parameter extraction. Implement fallback mechanisms for when app isn't installed. Test deep links thoroughly across different app states (cold start, background, foreground).",
            level: "Advanced"
        },
        {
            question: "What are the best practices for React Native app deployment and CI/CD?",
            answer: "Automate builds with Fastlane or similar tools. Implement proper code signing for iOS and Android. Use semantic versioning for releases. Set up automated testing in CI pipelines. Implement staging and production environments. Use CodePush for over-the-air updates. Monitor crash reports and analytics. Implement gradual rollouts. Document release processes. Use proper environment variable management.",
            level: "Advanced"
        }
    ];

    const getProgressPercentage = () => {
        const totalTopics = courseModules.reduce((sum, module) => sum + module.topics.length, 0);
        return Math.round((completedTopics.size / totalTopics) * 100);
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h2>
                    <p className="text-gray-600">Please log in to access the React Native course.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/courses"
                                className="flex items-center text-gray-700 hover:text-blue-600 transition-all duration-300 group"
                            >
                                <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                                    <ArrowLeft className="w-4 h-4" />
                                </div>
                                <span className="ml-2 font-medium">Back to Courses</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                                <UserCheck className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium text-gray-700">
                                    Welcome, {user?.name || 'User'}!
                                </span>
                            </div>
                            <Link
                                to="/profile"
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-3">
                {/* Course Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-700 rounded-lg p-4 text-white mb-4 shadow-lg">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>

                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <div className="p-1.5 bg-white/20 rounded-lg mr-3">
                                        <BookOpen className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold mb-1">React Native Development</h1>
                                        <p className="text-blue-100 text-sm">Master cross-platform mobile development</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                                        <BookOpen className="w-3 h-3 mr-1" />
                                        <span className="font-medium text-xs">70+ Topics</span>
                                    </div>
                                    <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                                        <Clock className="w-3 h-3 mr-1" />
                                        <span className="font-medium text-xs">Self-paced</span>
                                    </div>
                                    <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        <span className="font-medium text-xs">Beginner to Advanced</span>
                                    </div>
                                    <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                                        <Trophy className="w-3 h-3 mr-1" />
                                        <span className="font-medium text-xs">30+ Q&As</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 rounded-lg p-2 mb-2">
                                    <div className="text-lg font-bold">{getProgressPercentage()}%</div>
                                    <div className="text-xs text-blue-100">Complete</div>
                                </div>
                                <div className="w-12 bg-white/20 rounded-full h-1.5">
                                    <div
                                        className="bg-white h-1.5 rounded-full transition-all duration-500"
                                        style={{ width: `${getProgressPercentage()}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-12">
                    {/* Progress Bar */}
                    <div className="mb-12 bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Your Progress</h3>
                            <span className="text-2xl font-bold text-blue-600">{getProgressPercentage()}%</span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-4">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full transition-all duration-500"
                                style={{ width: `${getProgressPercentage()}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            {completedTopics.size} of {courseModules.reduce((sum, module) => sum + module.topics.length, 0)} topics completed
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="mb-8 flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => setShowQA(false)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${!showQA
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                    : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
                                }`}
                        >
                            Course Content
                        </button>
                        <button
                            onClick={() => setShowQA(true)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${showQA
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                    : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
                                }`}
                        >
                            Q&A Section ({courseQAs.length})
                        </button>
                    </div>

                    {!showQA ? (
                        /* Course Modules */
                        <div className="grid gap-8 lg:grid-cols-2">
                            {courseModules.map((module, moduleIndex) => (
                                <div
                                    key={moduleIndex}
                                    className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-white">
                                                Module {moduleIndex + 1}
                                            </h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${module.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                                    module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {module.difficulty}
                                            </span>
                                        </div>
                                        <p className="text-blue-100 font-medium mb-2">{module.title}</p>
                                        <p className="text-blue-200 text-sm mb-3">{module.description}</p>
                                        <div className="flex items-center space-x-4 text-xs">
                                            <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                                                <Clock className="w-3 h-3 mr-1" />
                                                <span>{module.duration}</span>
                                            </div>
                                            <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                                                <BookOpen className="w-3 h-3 mr-1" />
                                                <span>{module.topics.length} Topics</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="space-y-3">
                                            {module.topics.map((topic, topicIndex) => {
                                                const topicId = `${moduleIndex}-${topicIndex}`;
                                                const isCompleted = completedTopics.has(topicId);

                                                return (
                                                    <div
                                                        key={topicIndex}
                                                        className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${isCompleted
                                                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
                                                                : 'bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200'
                                                            }`}
                                                        onClick={() => toggleTopic(topicId)}
                                                    >
                                                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${isCompleted
                                                                ? 'bg-green-500 border-green-500'
                                                                : 'border-gray-300 hover:border-blue-400'
                                                            }`}>
                                                            {isCompleted && (
                                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className={`font-medium ${isCompleted ? 'text-green-800' : 'text-gray-700'
                                                            }`}>
                                                            {topic}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Q&A Section */
                        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-center">
                                <h2 className="text-3xl font-bold text-white mb-2">React Native Q&A</h2>
                                <p className="text-blue-100">Comprehensive questions and answers for React Native mastery</p>
                            </div>
                            <div className="p-8">
                                <div className="mb-8 flex flex-wrap gap-4 justify-center">
                                    {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                        <button
                                            key={level}
                                            className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                                        >
                                            {level} {level !== 'All' && `(${courseQAs.filter(qa => qa.level === level).length})`}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    {courseQAs.map((qa, index) => (
                                        <div key={index} className="border border-blue-100 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                                            <div className="flex items-start justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                                                    Q{index + 1}: {qa.question}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${qa.level === 'Beginner' ? 'bg-green-100 text-green-600' :
                                                        qa.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                                                            'bg-red-100 text-red-600'
                                                    }`}>
                                                    {qa.level}
                                                </span>
                                            </div>
                                            <div className="text-gray-700 leading-relaxed">
                                                <strong className="text-blue-600">Answer:</strong> {qa.answer}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReactNativeCourse;