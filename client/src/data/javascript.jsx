import React, { useState, useEffect } from 'react';
import {
    Code,
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
    Settings,
    Terminal,
    Braces,
    Type
} from 'lucide-react';
import { useAuth } from '../context/authcontext';
import { useNavigate, Link } from 'react-router-dom';

const JavaScriptTypeScriptCourse = () => {
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
            id: 'javascript',
            title: 'Modern JavaScript (ES6+)',
            icon: <Globe className="w-5 h-5" />,
            color: 'yellow',
            description: 'Master modern JavaScript features and concepts'
        },
        {
            id: 'typescript',
            title: 'TypeScript Fundamentals',
            icon: <Type className="w-5 h-5" />,
            color: 'blue',
            description: 'Learn static typing with TypeScript'
        },
        {
            id: 'advanced',
            title: 'Advanced Patterns',
            icon: <Layers className="w-5 h-5" />,
            color: 'purple',
            description: 'Design patterns and advanced concepts'
        },
        {
            id: 'async',
            title: 'Asynchronous Programming',
            icon: <Zap className="w-5 h-5" />,
            color: 'green',
            description: 'Promises, async/await, and event loops'
        },
        {
            id: 'tooling',
            title: 'Development Tools',
            icon: <Settings className="w-5 h-5" />,
            color: 'indigo',
            description: 'Webpack, Babel, ESLint, and more'
        }
    ];

    const courseTopics = [
        // Modern JavaScript (ES6+)
        {
            id: 1,
            title: 'ES6+ Features and Syntax',
            module: 'javascript',
            difficulty: 'Beginner',
            description: 'Learn modern JavaScript syntax: let/const, arrow functions, destructuring',
            topics: ['Let/Const vs Var', 'Arrow Functions', 'Destructuring', 'Template Literals', 'Default Parameters'],
            estimatedTime: '2 hours',
            resources: {
                video: 'https://example.com/es6-features',
                documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
                practice: 'Convert ES5 code to ES6+'
            }
        },
        {
            id: 2,
            title: 'Advanced Functions and Closures',
            module: 'javascript',
            difficulty: 'Intermediate',
            description: 'Master function concepts, closures, and higher-order functions',
            topics: ['Function Declarations vs Expressions', 'Closures', 'Higher-Order Functions', 'IIFE', 'Function Binding'],
            estimatedTime: '3 hours',
            resources: {
                video: 'https://example.com/js-functions',
                documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
                practice: 'Build a counter with closures'
            }
        },
        {
            id: 3,
            title: 'Objects and Prototypes',
            module: 'javascript',
            difficulty: 'Intermediate',
            description: 'Understand JavaScript objects, prototypal inheritance, and classes',
            topics: ['Object Creation', 'Prototype Chain', 'Class Syntax', 'Inheritance', 'Object Methods'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/js-objects',
                documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain',
                practice: 'Create a class hierarchy'
            }
        },
        {
            id: 4,
            title: 'Modules and Import/Export',
            module: 'javascript',
            difficulty: 'Intermediate',
            description: 'Learn JavaScript module system and code organization',
            topics: ['ES6 Modules', 'Import/Export Syntax', 'Default Exports', 'Module Patterns', 'Dynamic Imports'],
            estimatedTime: '2 hours',
            resources: {
                video: 'https://example.com/js-modules',
                documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules',
                practice: 'Refactor code into modules'
            }
        },
        {
            id: 5,
            title: 'Array Methods and Functional Programming',
            module: 'javascript',
            difficulty: 'Intermediate',
            description: 'Master array methods and functional programming concepts',
            topics: ['Map, Filter, Reduce', 'ForEach vs For loops', 'Pure Functions', 'Immutability', 'Chaining Methods'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/js-arrays',
                documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
                practice: 'Build data processing pipeline'
            }
        },

        // TypeScript Fundamentals
        {
            id: 6,
            title: 'TypeScript Basics and Types',
            module: 'typescript',
            difficulty: 'Beginner',
            description: 'Introduction to TypeScript and basic type annotations',
            topics: ['Basic Types', 'Type Annotations', 'Type Inference', 'Union Types', 'Type Aliases'],
            estimatedTime: '3 hours',
            resources: {
                video: 'https://example.com/ts-basics',
                documentation: 'https://www.typescriptlang.org/docs/',
                practice: 'Add types to JavaScript project'
            }
        },
        {
            id: 7,
            title: 'Interfaces and Object Types',
            module: 'typescript',
            difficulty: 'Intermediate',
            description: 'Define object shapes and contracts with interfaces',
            topics: ['Interface Declaration', 'Optional Properties', 'Readonly Properties', 'Extending Interfaces', 'Index Signatures'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/ts-interfaces',
                documentation: 'https://www.typescriptlang.org/docs/handbook/interfaces.html',
                practice: 'Create API response interfaces'
            }
        },
        {
            id: 8,
            title: 'Classes and Inheritance in TypeScript',
            module: 'typescript',
            difficulty: 'Intermediate',
            description: 'Object-oriented programming with TypeScript classes',
            topics: ['Class Declaration', 'Access Modifiers', 'Abstract Classes', 'Inheritance', 'Method Overriding'],
            estimatedTime: '3 hours',
            resources: {
                video: 'https://example.com/ts-classes',
                documentation: 'https://www.typescriptlang.org/docs/handbook/classes.html',
                practice: 'Build a class hierarchy'
            }
        },
        {
            id: 9,
            title: 'Generics and Advanced Types',
            module: 'typescript',
            difficulty: 'Advanced',
            description: 'Create reusable components with generics and utility types',
            topics: ['Generic Functions', 'Generic Classes', 'Constraints', 'Utility Types', 'Conditional Types'],
            estimatedTime: '3.5 hours',
            resources: {
                video: 'https://example.com/ts-generics',
                documentation: 'https://www.typescriptlang.org/docs/handbook/generics.html',
                practice: 'Build generic data structures'
            }
        },
        {
            id: 10,
            title: 'Enums and Modules',
            module: 'typescript',
            difficulty: 'Intermediate',
            description: 'Organize code with enums and module systems',
            topics: ['Numeric Enums', 'String Enums', 'Const Enums', 'Namespaces', 'Module Resolution'],
            estimatedTime: '2 hours',
            resources: {
                video: 'https://example.com/ts-enums-modules',
                documentation: 'https://www.typescriptlang.org/docs/handbook/enums.html',
                practice: 'Organize project with modules'
            }
        },

        // Advanced Patterns
        {
            id: 11,
            title: 'Design Patterns in JavaScript',
            module: 'advanced',
            difficulty: 'Advanced',
            description: 'Implement common design patterns in JavaScript',
            topics: ['Module Pattern', 'Observer Pattern', 'Factory Pattern', 'Singleton Pattern', 'Strategy Pattern'],
            estimatedTime: '4 hours',
            resources: {
                video: 'https://example.com/js-patterns',
                documentation: 'https://addyosmani.com/resources/essentialjsdesignpatterns/book/',
                practice: 'Implement design patterns'
            }
        },
        {
            id: 12,
            title: 'Memory Management and Performance',
            module: 'advanced',
            difficulty: 'Advanced',
            description: 'Optimize JavaScript performance and manage memory',
            topics: ['Garbage Collection', 'Memory Leaks', 'Performance Optimization', 'Profiling Tools', 'Best Practices'],
            estimatedTime: '3 hours',
            resources: {
                video: 'https://example.com/js-performance',
                documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management',
                practice: 'Optimize application performance'
            }
        },
        {
            id: 13,
            title: 'Error Handling and Debugging',
            module: 'advanced',
            difficulty: 'Intermediate',
            description: 'Master error handling and debugging techniques',
            topics: ['Try-Catch-Finally', 'Custom Errors', 'Error Boundaries', 'Debugging Tools', 'Stack Traces'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/js-debugging',
                documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch',
                practice: 'Build robust error handling'
            }
        },

        // Asynchronous Programming
        {
            id: 14,
            title: 'Promises and Promise Chains',
            module: 'async',
            difficulty: 'Intermediate',
            description: 'Master promises for asynchronous operations',
            topics: ['Promise Creation', 'Promise.then/catch', 'Promise Chaining', 'Promise.all/race', 'Error Handling'],
            estimatedTime: '3 hours',
            resources: {
                video: 'https://example.com/js-promises',
                documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
                practice: 'Build async data fetcher'
            }
        },
        {
            id: 15,
            title: 'Async/Await and Modern Async Patterns',
            module: 'async',
            difficulty: 'Intermediate',
            description: 'Write cleaner asynchronous code with async/await',
            topics: ['Async Functions', 'Await Keyword', 'Error Handling', 'Parallel Execution', 'Sequential vs Parallel'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/js-async-await',
                documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function',
                practice: 'Refactor promises to async/await'
            }
        },
        {
            id: 16,
            title: 'Event Loop and Concurrency',
            module: 'async',
            difficulty: 'Advanced',
            description: 'Understand JavaScript\'s event loop and concurrency model',
            topics: ['Call Stack', 'Event Loop', 'Microtasks vs Macrotasks', 'setTimeout vs setImmediate', 'Web Workers'],
            estimatedTime: '3.5 hours',
            resources: {
                video: 'https://example.com/js-event-loop',
                documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop',
                practice: 'Visualize event loop execution'
            }
        },
        {
            id: 17,
            title: 'Fetch API and HTTP Requests',
            module: 'async',
            difficulty: 'Intermediate',
            description: 'Make HTTP requests with the Fetch API',
            topics: ['Fetch Basics', 'Request Options', 'Response Handling', 'Error States', 'AbortController'],
            estimatedTime: '2 hours',
            resources: {
                video: 'https://example.com/js-fetch',
                documentation: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
                practice: 'Build API client'
            }
        },

        // Development Tools
        {
            id: 18,
            title: 'Package Managers and Dependencies',
            module: 'tooling',
            difficulty: 'Beginner',
            description: 'Manage project dependencies with npm and yarn',
            topics: ['NPM vs Yarn', 'Package.json', 'Semantic Versioning', 'Lock Files', 'Scripts'],
            estimatedTime: '2 hours',
            resources: {
                video: 'https://example.com/package-managers',
                documentation: 'https://docs.npmjs.com/',
                practice: 'Set up project with dependencies'
            }
        },
        {
            id: 19,
            title: 'Webpack and Module Bundling',
            module: 'tooling',
            difficulty: 'Advanced',
            description: 'Bundle JavaScript applications with Webpack',
            topics: ['Webpack Config', 'Loaders', 'Plugins', 'Code Splitting', 'Hot Module Replacement'],
            estimatedTime: '4 hours',
            resources: {
                video: 'https://example.com/webpack',
                documentation: 'https://webpack.js.org/concepts/',
                practice: 'Configure Webpack from scratch'
            }
        },
        {
            id: 20,
            title: 'Babel and JavaScript Transpilation',
            module: 'tooling',
            difficulty: 'Intermediate',
            description: 'Transform modern JavaScript for browser compatibility',
            topics: ['Babel Setup', 'Presets', 'Plugins', 'Polyfills', 'Browser Targets'],
            estimatedTime: '2.5 hours',
            resources: {
                video: 'https://example.com/babel',
                documentation: 'https://babeljs.io/docs/',
                practice: 'Set up Babel pipeline'
            }
        },
        {
            id: 21,
            title: 'ESLint and Code Quality',
            module: 'tooling',
            difficulty: 'Intermediate',
            description: 'Maintain code quality with linting and formatting',
            topics: ['ESLint Configuration', 'Rules and Plugins', 'Prettier Integration', 'Pre-commit Hooks', 'CI/CD Integration'],
            estimatedTime: '2 hours',
            resources: {
                video: 'https://example.com/eslint',
                documentation: 'https://eslint.org/docs/',
                practice: 'Set up code quality pipeline'
            }
        },
        {
            id: 22,
            title: 'Testing JavaScript Applications',
            module: 'tooling',
            difficulty: 'Advanced',
            description: 'Write and run tests for JavaScript code',
            topics: ['Unit Testing', 'Jest Framework', 'Mocking', 'Integration Tests', 'Test Coverage'],
            estimatedTime: '3.5 hours',
            resources: {
                video: 'https://example.com/js-testing',
                documentation: 'https://jestjs.io/docs/',
                practice: 'Write comprehensive test suite'
            }
        }
    ];

    // Q&A Data
    const courseQAs = [
        {
            id: 1,
            question: "What is the difference between let, const, and var in JavaScript?",
            answer: "var is function-scoped and can be redeclared, let is block-scoped and can be reassigned but not redeclared, const is block-scoped and cannot be reassigned or redeclared. const must be initialized at declaration.",
            category: "JavaScript Basics",
            difficulty: "Beginner"
        },
        {
            id: 2,
            question: "How do closures work in JavaScript?",
            answer: "A closure is created when an inner function has access to variables from its outer (enclosing) function's scope even after the outer function has finished executing. The inner function 'closes over' the outer function's variables.",
            category: "Advanced Concepts",
            difficulty: "Intermediate"
        },
        {
            id: 3,
            question: "What are the key differences between TypeScript and JavaScript?",
            answer: "TypeScript is a superset of JavaScript that adds static type checking. Key differences include: type annotations, compile-time error checking, better IDE support, interfaces, generics, and enhanced tooling for large applications.",
            category: "TypeScript",
            difficulty: "Beginner"
        },
        {
            id: 4,
            question: "Explain the JavaScript event loop and how it works.",
            answer: "The event loop is JavaScript's concurrency model. It continuously monitors the call stack and task queue. When the call stack is empty, it moves tasks from the queue to the stack. Microtasks (promises) have higher priority than macrotasks (setTimeout).",
            category: "Asynchronous Programming",
            difficulty: "Advanced"
        },
        {
            id: 5,
            question: "What is the difference between async/await and Promises?",
            answer: "async/await is syntactic sugar built on top of Promises. It makes asynchronous code look more like synchronous code. async functions always return a Promise, and await pauses execution until the Promise resolves.",
            category: "Asynchronous Programming",
            difficulty: "Intermediate"
        },
        {
            id: 6,
            question: "How do you implement inheritance in TypeScript?",
            answer: "TypeScript supports class-based inheritance using the 'extends' keyword. You can also use interfaces with 'implements' keyword. Abstract classes provide a base for other classes to extend with some methods implemented and others abstract.",
            category: "TypeScript",
            difficulty: "Intermediate"
        },
        {
            id: 7,
            question: "What are TypeScript generics and when would you use them?",
            answer: "Generics allow you to create reusable components that work with multiple types while maintaining type safety. Use them when you want to create functions, classes, or interfaces that work with various types without losing type information.",
            category: "TypeScript",
            difficulty: "Advanced"
        },
        {
            id: 8,
            question: "Explain the difference between == and === in JavaScript.",
            answer: "== performs type coercion (converts types before comparison), while === performs strict equality (no type conversion). === compares both value and type. Generally, === is preferred to avoid unexpected type conversions.",
            category: "JavaScript Basics",
            difficulty: "Beginner"
        },
        {
            id: 9,
            question: "What are JavaScript modules and how do you use them?",
            answer: "Modules allow you to organize code into separate files and import/export functionality. Use 'export' to expose functions/variables and 'import' to bring them into other files. Modern browsers and Node.js support ES6 modules.",
            category: "Modern JavaScript",
            difficulty: "Intermediate"
        },
        {
            id: 10,
            question: "How do you handle errors in async/await functions?",
            answer: "Use try-catch blocks around await statements. You can also use .catch() on the returned Promise or create wrapper functions that return [error, data] tuples for consistent error handling patterns.",
            category: "Asynchronous Programming",
            difficulty: "Intermediate"
        },
        {
            id: 11,
            question: "What is the purpose of TypeScript interfaces?",
            answer: "Interfaces define contracts for object shapes, function signatures, and class structures. They provide compile-time type checking, enable better IDE support, and help document expected data structures without generating runtime code.",
            category: "TypeScript",
            difficulty: "Beginner"
        },
        {
            id: 12,
            question: "Explain the concept of hoisting in JavaScript.",
            answer: "Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their containing scope during compilation. var declarations are hoisted and initialized with undefined, while let/const are hoisted but not initialized (temporal dead zone).",
            category: "JavaScript Basics",
            difficulty: "Intermediate"
        },
        {
            id: 13,
            question: "What are the benefits of using TypeScript in large applications?",
            answer: "TypeScript provides: static type checking, better IDE support with autocomplete and refactoring, early error detection, improved code documentation, easier maintenance, better team collaboration, and enhanced tooling ecosystem.",
            category: "TypeScript",
            difficulty: "Beginner"
        },
        {
            id: 14,
            question: "How do you optimize JavaScript performance?",
            answer: "Optimize by: minimizing DOM manipulations, using efficient algorithms and data structures, avoiding memory leaks, implementing lazy loading, using web workers for heavy computations, optimizing bundle sizes, and leveraging browser caching.",
            category: "Performance",
            difficulty: "Advanced"
        },
        {
            id: 15,
            question: "What are JavaScript design patterns and why are they useful?",
            answer: "Design patterns are reusable solutions to common problems. Popular JS patterns include Module, Observer, Factory, Singleton, and Strategy patterns. They improve code organization, maintainability, and team communication.",
            category: "Advanced Concepts",
            difficulty: "Advanced"
        },
        {
            id: 16,
            question: "What is the difference between call(), apply(), and bind() methods?",
            answer: "All three methods are used to set the 'this' context. call() invokes function immediately with arguments passed individually. apply() invokes immediately with arguments as an array. bind() returns a new function with 'this' bound to the specified value.",
            category: "JavaScript Basics",
            difficulty: "Intermediate"
        },
        {
            id: 17,
            question: "Explain JavaScript's prototype chain and prototypal inheritance.",
            answer: "Every JavaScript object has a prototype property that points to another object. When accessing a property, JS looks up the prototype chain until it finds the property or reaches null. Objects inherit properties and methods from their prototype.",
            category: "Advanced Concepts",
            difficulty: "Advanced"
        },
        {
            id: 18,
            question: "What are TypeScript utility types and give examples?",
            answer: "Utility types transform existing types. Examples: Partial<T> makes all properties optional, Required<T> makes all required, Pick<T,K> selects specific properties, Omit<T,K> excludes properties, Record<K,T> creates object type with specific keys.",
            category: "TypeScript",
            difficulty: "Advanced"
        },
        {
            id: 19,
            question: "How do you handle memory leaks in JavaScript?",
            answer: "Common causes: global variables, event listeners not removed, closures holding references, circular references. Solutions: use WeakMap/WeakSet, remove event listeners, avoid global variables, use browser dev tools to detect leaks, implement proper cleanup in components.",
            category: "Performance",
            difficulty: "Advanced"
        },
        {
            id: 20,
            question: "What is the difference between arrow functions and regular functions?",
            answer: "Arrow functions: don't have their own 'this' (lexical binding), can't be used as constructors, no 'arguments' object, more concise syntax. Regular functions: have their own 'this', can be constructors, have 'arguments' object, can be hoisted.",
            category: "Modern JavaScript",
            difficulty: "Intermediate"
        },
        {
            id: 21,
            question: "Explain TypeScript decorators and their use cases.",
            answer: "Decorators are functions that modify classes, methods, properties, or parameters at design time. Common uses: dependency injection, logging, validation, caching, authentication. They provide a clean way to add cross-cutting concerns without modifying the original code.",
            category: "TypeScript",
            difficulty: "Advanced"
        },
        {
            id: 22,
            question: "What are JavaScript Symbols and when would you use them?",
            answer: "Symbols are primitive data types that create unique identifiers. Used for: creating private object properties, defining well-known symbols (Symbol.iterator), avoiding naming collisions, creating unique keys for WeakMap, implementing custom iteration protocols.",
            category: "Modern JavaScript",
            difficulty: "Advanced"
        },
        {
            id: 23,
            question: "How do you implement debouncing and throttling in JavaScript?",
            answer: "Debouncing delays function execution until after a pause in calls. Throttling limits function execution to once per time period. Debouncing: use setTimeout and clearTimeout. Throttling: use timestamps or flags to control execution frequency. Both optimize performance for frequent events.",
            category: "Performance",
            difficulty: "Intermediate"
        },
        {
            id: 24,
            question: "What are TypeScript conditional types and mapped types?",
            answer: "Conditional types: T extends U ? X : Y - creates types based on conditions. Mapped types: iterate over keys of a type to create new types. Examples: {[K in keyof T]: T[K] | null} adds null to all properties. Both enable advanced type transformations.",
            category: "TypeScript",
            difficulty: "Advanced"
        },
        {
            id: 25,
            question: "Explain the difference between undefined and null in JavaScript.",
            answer: "undefined: variable declared but not assigned, function returns no value, accessing non-existent property. null: intentional absence of value, must be explicitly assigned. typeof undefined is 'undefined', typeof null is 'object' (JavaScript quirk).",
            category: "JavaScript Basics",
            difficulty: "Beginner"
        },
        {
            id: 26,
            question: "How do Web Workers work and when should you use them?",
            answer: "Web Workers run JavaScript in background threads, separate from main UI thread. Use for: CPU-intensive calculations, data processing, image/video manipulation, cryptography. They communicate via message passing and don't have access to DOM directly.",
            category: "Advanced Concepts",
            difficulty: "Advanced"
        },
        {
            id: 27,
            question: "What is currying in JavaScript and how do you implement it?",
            answer: "Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument. Implementation: return nested functions that accumulate arguments until all are provided. Useful for creating specialized functions and function composition.",
            category: "Functional Programming",
            difficulty: "Advanced"
        },
        {
            id: 28,
            question: "Explain JavaScript's strict mode and its benefits.",
            answer: "'use strict' enables strict mode which: prevents use of undeclared variables, makes assignments to non-writable properties throw errors, prevents duplicate parameter names, disables 'with' statements, changes 'this' behavior in functions, helps catch common errors.",
            category: "JavaScript Basics",
            difficulty: "Intermediate"
        },
        {
            id: 29,
            question: "What are TypeScript union and intersection types?",
            answer: "Union types (A | B): value can be either type A or B. Intersection types (A & B): value must have properties of both A and B. Union for 'either-or' scenarios, intersection for combining multiple type contracts into one.",
            category: "TypeScript",
            difficulty: "Intermediate"
        },
        {
            id: 30,
            question: "How do you implement a singleton pattern in JavaScript?",
            answer: "Multiple approaches: IIFE returning object, class with static instance, module pattern. ES6 class example: private constructor, static getInstance() method that creates instance only once. Ensures only one instance exists throughout application lifetime.",
            category: "Design Patterns",
            difficulty: "Intermediate"
        },
        {
            id: 31,
            question: "What is the difference between synchronous and asynchronous programming?",
            answer: "Synchronous: code executes line by line, blocking subsequent operations. Asynchronous: operations can run concurrently, non-blocking. JavaScript uses callbacks, promises, async/await for async operations. Async improves performance and user experience by preventing UI freezing.",
            category: "Asynchronous Programming",
            difficulty: "Beginner"
        },
        {
            id: 32,
            question: "Explain JavaScript's Map and Set data structures.",
            answer: "Map: key-value pairs where keys can be any type, maintains insertion order, has size property. Set: collection of unique values, automatically handles duplicates. Both are iterable and have better performance than objects/arrays for certain operations like frequent additions/deletions.",
            category: "Modern JavaScript",
            difficulty: "Intermediate"
        },
        {
            id: 33,
            question: "How do you handle type guards in TypeScript?",
            answer: "Type guards narrow down types within conditional blocks. Methods: typeof, instanceof, 'in' operator, custom type predicates (is operator), discriminated unions. They help TypeScript understand which specific type you're working with in a union type scenario.",
            category: "TypeScript",
            difficulty: "Intermediate"
        },
        {
            id: 34,
            question: "What are JavaScript generators and how do they work?",
            answer: "Generators are functions that can pause and resume execution using yield keyword. They return iterator objects with next() method. Useful for: creating iterators, lazy evaluation, implementing async patterns, infinite sequences, and state machines.",
            category: "Advanced Concepts",
            difficulty: "Advanced"
        },
        {
            id: 35,
            question: "Explain the concept of tree shaking in JavaScript bundlers.",
            answer: "Tree shaking eliminates dead code from bundles by analyzing import/export statements. Only imports actually used in code are included. Requires ES6 modules and static analysis. Webpack, Rollup, and other bundlers support it, significantly reducing bundle sizes.",
            category: "Build Tools",
            difficulty: "Intermediate"
        },
        {
            id: 36,
            question: "What are JavaScript Proxy objects and their use cases?",
            answer: "Proxy intercepts and customizes operations on objects (property access, assignment, enumeration, function invocation). Use cases: validation, property access logging, default values for missing properties, creating reactive objects, implementing virtual objects.",
            category: "Advanced Concepts",
            difficulty: "Advanced"
        },
        {
            id: 37,
            question: "How do you implement observer pattern in JavaScript?",
            answer: "Observer pattern defines one-to-many dependency between objects. Implementation: Subject maintains list of observers, provides methods to add/remove/notify observers. Observers implement update method. Useful for event systems, MVC architectures, reactive programming.",
            category: "Design Patterns",
            difficulty: "Intermediate"
        },
        {
            id: 38,
            question: "What is TypeScript's never type and when is it used?",
            answer: "never represents values that never occur. Used for: functions that never return (throw errors, infinite loops), unreachable code branches, exhaustive type checking in switch statements, bottom type in type system. Helps catch logical errors at compile time.",
            category: "TypeScript",
            difficulty: "Advanced"
        },
        {
            id: 39,
            question: "Explain JavaScript's microtask and macrotask queues.",
            answer: "Event loop has multiple queues. Microtasks (promises, queueMicrotask): higher priority, processed after current execution but before next macrotask. Macrotasks (setTimeout, setInterval, I/O): lower priority. Microtasks can starve macrotasks if continuously queued.",
            category: "Asynchronous Programming",
            difficulty: "Advanced"
        },
        {
            id: 40,
            question: "How do you implement deep cloning of objects in JavaScript?",
            answer: "Methods: JSON.parse(JSON.stringify()) for simple objects, recursive function for complex objects, Lodash cloneDeep, structuredClone() (newer). Consider: circular references, functions, dates, regex, symbols. Each method has trade-offs in terms of performance and completeness.",
            category: "JavaScript Basics",
            difficulty: "Intermediate"
        },
        {
            id: 41,
            question: "What are TypeScript template literal types?",
            answer: "Template literal types create new string literal types by combining literal types. Syntax: `prefix${Union}suffix`. Useful for: creating dynamic property names, URL patterns, CSS class names, API endpoints. Enables powerful string manipulation at type level.",
            category: "TypeScript",
            difficulty: "Advanced"
        },
        {
            id: 42,
            question: "Explain the concept of immutability in JavaScript.",
            answer: "Immutability means data cannot be changed after creation. Benefits: predictable code, easier debugging, enables optimizations, prevents side effects. Techniques: Object.freeze(), spread operator, libraries like Immutable.js, functional programming patterns, avoiding mutating methods.",
            category: "Functional Programming",
            difficulty: "Intermediate"
        },
        {
            id: 43,
            question: "How do you implement module federation in JavaScript?",
            answer: "Module federation allows sharing modules between applications at runtime. Webpack 5 feature that enables micro-frontends. Configure host and remote applications, expose/consume modules, handle dynamic imports. Useful for large-scale applications and independent deployments.",
            category: "Build Tools",
            difficulty: "Advanced"
        },
        {
            id: 44,
            question: "What are JavaScript WeakMap and WeakSet?",
            answer: "WeakMap: key-value pairs with object keys only, keys are weakly held (garbage collected when no other references). WeakSet: collection of objects, objects are weakly held. Both prevent memory leaks, useful for storing metadata, private data, caching.",
            category: "Modern JavaScript",
            difficulty: "Advanced"
        },
        {
            id: 45,
            question: "Explain TypeScript's declaration merging.",
            answer: "Declaration merging combines multiple declarations with same name into single definition. Works with: interfaces (properties merged), namespaces (members merged), classes with namespaces. Useful for extending external libraries, modular code organization, ambient declarations.",
            category: "TypeScript",
            difficulty: "Advanced"
        }
    ];

    // Load progress from localStorage
    useEffect(() => {
        if (user?.email) {
            const savedProgress = localStorage.getItem(`jsTs_progress_${user.email}`);
            if (savedProgress) {
                setCompletedTopics(new Set(JSON.parse(savedProgress)));
            }
        }
    }, [user]);

    // Save progress to localStorage
    useEffect(() => {
        if (user?.email && completedTopics.size > 0) {
            localStorage.setItem(`jsTs_progress_${user.email}`, JSON.stringify([...completedTopics]));
        }
    }, [completedTopics, user]);

    // Check authentication and redirect if needed
    useEffect(() => {
        if (!authLoading) {
            setCourseLoading(false);
            if (!isAuthenticated) {
                navigate('/login', {
                    state: { returnTo: '/course/javascript', message: 'Login to access JavaScript & TypeScript Course' }
                });
            }
        }
    }, [authLoading, isAuthenticated, navigate]);

    const toggleTopicCompletion = (topicId) => {
        setCompletedTopics(prev => {
            const newSet = new Set(prev);
            if (newSet.has(topicId)) {
                newSet.delete(topicId);
            } else {
                newSet.add(topicId);
            }
            return newSet;
        });
    };

    const filteredTopics = courseTopics.filter(topic => {
        const matchesModule = selectedModule === 'all' || topic.module === selectedModule;
        const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesModule && matchesSearch;
    });

    const progressPercentage = Math.round((completedTopics.size / courseTopics.length) * 100);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'bg-green-100 text-green-800';
            case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'Advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getModuleColor = (moduleId) => {
        const module = courseModules.find(m => m.id === moduleId);
        switch (module?.color) {
            case 'yellow': return 'text-yellow-600 bg-yellow-50';
            case 'blue': return 'text-blue-600 bg-blue-50';
            case 'purple': return 'text-purple-600 bg-purple-50';
            case 'green': return 'text-green-600 bg-green-50';
            case 'indigo': return 'text-indigo-600 bg-indigo-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    // Show loading screen
    if (courseLoading || authLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading JavaScript & TypeScript Course...</p>
                </div>
            </div>
        );
    }

    // Show access denied if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
                    <p className="text-gray-600 mb-6">Please log in to access the JavaScript & TypeScript Course.</p>
                    <Link
                        to="/login"
                        state={{ returnTo: '/course/javascript', message: 'Login to access JavaScript & TypeScript Course' }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login to Continue
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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
                                <User className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium text-gray-700">
                                    Welcome, {user?.name || 'User'}!
                                </span>
                            </div>
                            <div className="text-sm text-gray-600 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                                Progress: {completedTopics.size}/{courseTopics.length} ({progressPercentage}%)
                            </div>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <Link
                                to="/profile"
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-3">
                {/* Course Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 rounded-lg p-4 text-white mb-4 shadow-lg">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>

                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <div className="p-1.5 bg-white/20 rounded-lg mr-3">
                                        <Code className="w-4 h-4" />
                                    </div>
                                    <h1 className="text-lg font-bold">Advanced JavaScript & TypeScript</h1>
                                </div>

                                <p className="text-white/90 text-sm mb-3 leading-relaxed">
                                    Deep dive into modern JavaScript, TypeScript, design patterns, and best practices.
                                    Master advanced concepts and development tools.
                                </p>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-white/80">Topics</span>
                                            <span className="text-sm font-bold">{courseTopics.length}</span>
                                        </div>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-white/80">Completed</span>
                                            <span className="text-sm font-bold">{completedTopics.size}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center ml-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full border-3 border-white/30 flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                            <Type className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                                        <Trophy className="w-3 h-3 text-yellow-800" />
                                    </div>
                                </div>
                                <span className="text-xs text-white/80 mt-1">Advanced</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('topics')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'topics'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Topics ({courseTopics.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('qa')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'qa'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Q&A ({courseQAs.length})
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Course Modules */}
                                <div className="lg:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Modules</h3>
                                    <div className="grid gap-4">
                                        {courseModules.map((module) => (
                                            <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-start space-x-3">
                                                    <div className={`p-2 rounded-lg ${getModuleColor(module.id)}`}>
                                                        {module.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900">{module.title}</h4>
                                                        <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                                                        <div className="mt-2">
                                                            <span className="text-xs text-gray-500">
                                                                {courseTopics.filter(t => t.module === module.id).length} topics
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Course Stats */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Statistics</h3>
                                    <div className="space-y-4">
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-blue-900">Progress</p>
                                                    <p className="text-2xl font-bold text-blue-600">{progressPercentage}%</p>
                                                </div>
                                                <Trophy className="w-8 h-8 text-blue-500" />
                                            </div>
                                        </div>

                                        <div className="bg-green-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-green-900">Completed</p>
                                                    <p className="text-2xl font-bold text-green-600">{completedTopics.size}</p>
                                                </div>
                                                <CheckCircle className="w-8 h-8 text-green-500" />
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Remaining</p>
                                                    <p className="text-2xl font-bold text-gray-600">{courseTopics.length - completedTopics.size}</p>
                                                </div>
                                                <Target className="w-8 h-8 text-gray-500" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                                        <h4 className="font-semibold text-yellow-900 mb-2">💡 Learning Tips</h4>
                                        <ul className="text-sm text-yellow-800 space-y-1">
                                            <li>• Practice coding along with examples</li>
                                            <li>• Build projects to reinforce concepts</li>
                                            <li>• Join the community for discussions</li>
                                            <li>• Set up a development environment</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'topics' && (
                            <div>
                                {/* Search and Filter */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search topics..."
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <select
                                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-48"
                                            value={selectedModule}
                                            onChange={(e) => setSelectedModule(e.target.value)}
                                        >
                                            <option value="all">All Modules</option>
                                            {courseModules.map(module => (
                                                <option key={module.id} value={module.id}>
                                                    {module.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Topics List */}
                                <div className="space-y-4">
                                    {filteredTopics.map((topic) => {
                                        const isCompleted = completedTopics.has(topic.id);
                                        const module = courseModules.find(m => m.id === topic.module);

                                        return (
                                            <div
                                                key={topic.id}
                                                className={`border rounded-lg p-6 transition-all ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <button
                                                                onClick={() => toggleTopicCompletion(topic.id)}
                                                                className="flex-shrink-0"
                                                            >
                                                                {isCompleted ? (
                                                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                                                ) : (
                                                                    <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                                                                )}
                                                            </button>
                                                            <div>
                                                                <h3 className={`text-lg font-semibold ${isCompleted ? 'text-green-900 line-through' : 'text-gray-900'}`}>
                                                                    {topic.title}
                                                                </h3>
                                                                <div className="flex items-center space-x-3 mt-1">
                                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModuleColor(topic.module)}`}>
                                                                        {module?.title}
                                                                    </span>
                                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                                                                        {topic.difficulty}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500 flex items-center">
                                                                        <Clock className="w-3 h-3 mr-1" />
                                                                        {topic.estimatedTime}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <p className="text-gray-600 mb-3">{topic.description}</p>

                                                        <div className="mb-4">
                                                            <h4 className="font-medium text-gray-900 mb-2">Topics Covered:</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {topic.topics.map((subtopic, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                                                                    >
                                                                        {subtopic}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center space-x-4 text-sm">
                                                            <a
                                                                href={topic.resources.video}
                                                                className="flex items-center text-blue-600 hover:text-blue-800"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Play className="w-4 h-4 mr-1" />
                                                                Video
                                                            </a>
                                                            <a
                                                                href={topic.resources.documentation}
                                                                className="flex items-center text-green-600 hover:text-green-800"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <FileText className="w-4 h-4 mr-1" />
                                                                Docs
                                                            </a>
                                                            <span className="flex items-center text-purple-600">
                                                                <Terminal className="w-4 h-4 mr-1" />
                                                                {topic.resources.practice}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {filteredTopics.length === 0 && (
                                    <div className="text-center py-12">
                                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No topics found</h3>
                                        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'qa' && (
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Frequently Asked Questions</h3>
                                    <p className="text-gray-600 text-sm">
                                        Common questions and answers about JavaScript and TypeScript concepts covered in this course.
                                    </p>
                                </div>

                                {/* Q&A List */}
                                <div className="space-y-4">
                                    {courseQAs.map((qa) => {
                                        const getDifficultyColor = (difficulty) => {
                                            switch (difficulty) {
                                                case 'Beginner': return 'bg-green-100 text-green-800';
                                                case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
                                                case 'Advanced': return 'bg-red-100 text-red-800';
                                                default: return 'bg-gray-100 text-gray-800';
                                            }
                                        };

                                        return (
                                            <div key={qa.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{qa.question}</h4>
                                                        <div className="flex items-center space-x-3 mb-3">
                                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                                {qa.category}
                                                            </span>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(qa.difficulty)}`}>
                                                                {qa.difficulty}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <p className="text-gray-700 leading-relaxed">{qa.answer}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Q&A Categories Summary */}
                                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                                    <h4 className="font-semibold text-blue-900 mb-4">Question Categories</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {[...new Set(courseQAs.map(qa => qa.category))].map((category) => {
                                            const count = courseQAs.filter(qa => qa.category === category).length;
                                            return (
                                                <div key={category} className="bg-white rounded-lg p-3 text-center">
                                                    <div className="text-lg font-bold text-blue-600">{count}</div>
                                                    <div className="text-sm text-gray-600">{category}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JavaScriptTypeScriptCourse;