import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Clock, TrendingUp, Trophy, UserCheck } from 'lucide-react';
import { useAuth } from '../context/authcontext';

const UIUXCourse = () => {
    const { user } = useAuth();
    const [completedTopics, setCompletedTopics] = useState(new Set());
    const [activeModule, setActiveModule] = useState(0);
    const [showQA, setShowQA] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('uiux-progress');
        if (saved) {
            setCompletedTopics(new Set(JSON.parse(saved)));
        }
    }, []);

    const saveProgress = (newCompleted) => {
        localStorage.setItem('uiux-progress', JSON.stringify([...newCompleted]));
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
            title: "Introduction to UI/UX Design",
            description: "Foundation concepts and principles of user interface and user experience design",
            duration: "2 weeks",
            difficulty: "Beginner",
            topics: [
                "What is UI Design? - Visual elements, layouts, and interface components",
                "What is UX Design? - User research, psychology, and experience optimization",
                "The Evolution of Design - From print to digital, responsive to mobile-first",
                "Difference between UI and UX - Roles, responsibilities, and collaboration",
                "Design Thinking Process - Empathize, Define, Ideate, Prototype, Test",
                "User-Centered Design Principles - Accessibility, usability, and inclusive design",
                "Design Ethics and Psychology - Cognitive biases and ethical considerations"
            ]
        },
        {
            title: "User Research & Analysis",
            description: "Methods and techniques for understanding user needs, behaviors, and motivations",
            duration: "3 weeks",
            difficulty: "Beginner",
            topics: [
                "Quantitative vs Qualitative Research - When and how to use each approach",
                "User Research Methods - Interviews, surveys, focus groups, and observations",
                "Creating User Personas - Data-driven character representations of target users",
                "User Journey Mapping - Visualizing user touchpoints and emotional states",
                "Empathy Maps - Understanding user thoughts, feelings, actions, and pain points",
                "Competitive Analysis - Market research and feature comparison techniques",
                "Surveys and Interviews - Question design and data interpretation",
                "Stakeholder Interviews - Aligning business goals with user needs",
                "Research Planning and Execution - Timeline, budget, and resource management"
            ]
        },
        {
            title: "Information Architecture",
            description: "Organizing and structuring content for optimal user navigation and comprehension",
            duration: "2 weeks",
            difficulty: "Intermediate",
            topics: [
                "Information Architecture Principles - Hierarchy, categorization, and labeling",
                "Site Maps and User Flow - Planning navigation paths and user journeys",
                "Card Sorting Techniques - Open, closed, and hybrid sorting methods",
                "Navigation Design Patterns - Primary, secondary, and contextual navigation",
                "Content Strategy - Content audit, taxonomy, and content modeling",
                "Mental Models - Understanding how users categorize and process information",
                "Search and Findability - Search design, filters, and faceted navigation",
                "Cross-platform IA - Consistency across web, mobile, and other touchpoints"
            ]
        },
        {
            title: "Wireframing & Prototyping",
            description: "Creating blueprints and interactive models to test and validate design concepts",
            duration: "3 weeks",
            difficulty: "Intermediate",
            topics: [
                "Low-fidelity Wireframes - Sketching and rapid ideation techniques",
                "High-fidelity Wireframes - Detailed layouts with content and interactions",
                "Interactive Prototypes - Clickable mockups and user flow validation",
                "Paper Prototyping - Rapid testing with physical mockups",
                "Digital Prototyping Tools - Figma, Adobe XD, Sketch, and InVision",
                "Prototype Fidelity Levels - When to use sketches vs. high-fidelity prototypes",
                "Animation and Transitions - Creating smooth user interactions",
                "Prototype Testing - Gathering feedback and iterating on designs",
                "Handoff Documentation - Specifications for developers and stakeholders"
            ]
        },
        {
            title: "Visual Design Principles",
            description: "Fundamental principles of visual hierarchy, composition, and aesthetic design",
            duration: "3 weeks",
            difficulty: "Intermediate",
            topics: [
                "Color Theory and Psychology - Color wheels, harmony, and emotional impact",
                "Typography and Hierarchy - Font selection, pairing, and readability",
                "Layout and Grid Systems - Rule of thirds, golden ratio, and responsive grids",
                "White Space and Balance - Creating breathing room and visual equilibrium",
                "Visual Hierarchy - Guiding user attention through size, color, and contrast",
                "Contrast and Accessibility - WCAG guidelines and inclusive design",
                "Imagery and Iconography - Selecting and creating visual elements",
                "Brand Guidelines - Maintaining consistency across touchpoints",
                "Gestalt Principles - Proximity, similarity, continuity, and closure"
            ]
        },
        {
            title: "Design Systems",
            description: "Building scalable, consistent design frameworks for large-scale projects",
            duration: "4 weeks",
            difficulty: "Advanced",
            topics: [
                "Design System Architecture - Atomic design and component hierarchies",
                "Component Libraries - Reusable UI elements and pattern documentation",
                "Style Guides - Visual standards, voice, tone, and brand guidelines",
                "Design Tokens - Scalable design decisions for colors, typography, and spacing",
                "Pattern Libraries - Common UI patterns and interaction guidelines",
                "Maintaining Consistency - Version control and design system governance",
                "Documentation Strategy - Making design systems accessible to teams",
                "Tool Integration - Figma libraries, code integration, and automation",
                "Design System Evolution - Scaling and maintaining systems over time"
            ]
        },
        {
            title: "Interaction Design",
            description: "Creating engaging and intuitive user interactions and micro-experiences",
            duration: "3 weeks",
            difficulty: "Advanced",
            topics: [
                "Micro-interactions - Feedback, state changes, and delightful details",
                "Animation Principles - Timing, easing, and purposeful motion design",
                "Gesture Design - Touch interactions, swipes, and multi-touch interfaces",
                "Feedback and States - Loading, error, empty, and success states",
                "Accessibility in Interactions - Screen reader support and keyboard navigation",
                "Voice User Interface (VUI) - Conversational design and voice commands",
                "AR/VR Interaction Patterns - Spatial design and immersive experiences",
                "Progressive Disclosure - Revealing information at the right time",
                "Error Prevention and Recovery - Helping users avoid and fix mistakes"
            ]
        },
        {
            title: "Usability Testing",
            description: "Methods for evaluating and improving user experience through testing and analytics",
            duration: "3 weeks",
            difficulty: "Intermediate",
            topics: [
                "Usability Testing Methods - Moderated, unmoderated, and remote testing",
                "A/B Testing - Statistical significance and experiment design",
                "User Testing Sessions - Planning, conducting, and analyzing sessions",
                "Analytics and Metrics - KPIs, conversion rates, and user behavior data",
                "Heuristic Evaluation - Expert review using Nielsen's usability principles",
                "Accessibility Testing - Screen readers, keyboard navigation, and WCAG compliance",
                "Iterative Design Process - Continuous improvement through testing cycles",
                "Test Planning and Recruitment - Finding representative users and setting goals",
                "Reporting and Actionable Insights - Communicating findings to stakeholders"
            ]
        },
        {
            title: "Design Tools Mastery",
            description: "Advanced techniques in industry-standard design and prototyping tools",
            duration: "4 weeks",
            difficulty: "Intermediate",
            topics: [
                "Figma Advanced Features - Auto-layout, components, variants, and plugins",
                "Adobe XD Workflow - Artboards, symbols, states, and voice prototyping",
                "Sketch for UI Design - Symbols, libraries, and plugin ecosystem",
                "Principle and Framer - Advanced animation and interaction prototyping",
                "Design Handoff Process - Developer collaboration and specification tools",
                "Version Control for Designers - Git workflows and collaborative design",
                "Plugin Development - Creating custom tools and automations",
                "Design-to-Code Tools - Figma to React, automated code generation",
                "Cross-tool Workflows - Integration between design, project management, and development tools"
            ]
        },
        {
            title: "Mobile & Responsive Design",
            description: "Designing for multiple devices, screen sizes, and interaction paradigms",
            duration: "3 weeks",
            difficulty: "Advanced",
            topics: [
                "Mobile-First Design Strategy - Progressive enhancement and content prioritization",
                "Responsive Breakpoints - Flexible grids and adaptive layouts",
                "Touch Interface Design - Finger-friendly interactions and gesture patterns",
                "iOS Human Interface Guidelines - Apple's design principles and patterns",
                "Material Design System - Google's design language and components",
                "Progressive Web Apps - Offline functionality and app-like experiences",
                "Cross-platform Consistency - Maintaining brand across different operating systems",
                "Performance Optimization - Image optimization and loading strategies",
                "Device-specific Considerations - Notches, curved screens, and emerging form factors"
            ]
        }
    ];

    const courseQAs = [
        // Beginner Level
        {
            question: "What is the main difference between UI and UX design?",
            answer: "UI (User Interface) design focuses on the visual and interactive elements of a product - buttons, layouts, colors, typography. UX (User Experience) design focuses on the overall experience and journey a user has with a product - research, testing, information architecture, and user satisfaction. UI is about how it looks, UX is about how it works and feels.",
            level: "Beginner"
        },
        {
            question: "What are the key principles of user-centered design?",
            answer: "1. Focus on users and their tasks 2. Measure usability empirically 3. Design iteratively 4. Involve users throughout the design process 5. Address the whole user experience 6. Have a multidisciplinary team 7. Make trade-offs explicit and clear.",
            level: "Beginner"
        },
        {
            question: "What is a user persona and why is it important?",
            answer: "A user persona is a fictional character that represents a segment of your target audience, based on real user research data. It includes demographics, behaviors, needs, and goals. Personas help teams make user-centered design decisions, prioritize features, and create empathy for users throughout the design process.",
            level: "Beginner"
        },
        {
            question: "What is the design thinking process?",
            answer: "Design thinking is a 5-stage process: 1. Empathize - understand users' needs 2. Define - frame the problem 3. Ideate - brainstorm solutions 4. Prototype - build testable versions 5. Test - validate with users. It's an iterative, human-centered approach to innovation and problem-solving.",
            level: "Beginner"
        },
        {
            question: "What is information architecture in UX design?",
            answer: "Information architecture (IA) is the structural design of shared information environments. It involves organizing, structuring, and labeling content in an effective and sustainable way. IA includes site maps, user flows, navigation systems, and content hierarchy to help users find and understand information easily.",
            level: "Beginner"
        },
        {
            question: "What are wireframes and why are they important?",
            answer: "Wireframes are low-fidelity, skeletal outlines of web pages or app screens that show the basic structure and layout without visual design elements. They're important because they help focus on functionality and user flow, facilitate early feedback, save time and resources, and serve as blueprints for development.",
            level: "Beginner"
        },
        {
            question: "What is the rule of thirds in design?",
            answer: "The rule of thirds is a composition principle where you divide your design into a 3x3 grid and place important elements along the grid lines or at their intersections. This creates more balanced, interesting, and visually appealing layouts than centering everything. It's widely used in photography, web design, and visual arts.",
            level: "Beginner"
        },
        {
            question: "What is white space (negative space) and why is it important?",
            answer: "White space is the empty area around and between design elements. It's important because it: improves readability, creates visual hierarchy, reduces cognitive load, makes designs look more elegant and professional, helps focus attention on key elements, and improves overall user experience.",
            level: "Beginner"
        },

        // Intermediate Level
        {
            question: "How do you conduct effective user research?",
            answer: "Effective user research involves: 1. Define clear research objectives 2. Choose appropriate methods (surveys, interviews, observations, usability testing) 3. Recruit representative participants 4. Create unbiased questions 5. Document findings systematically 6. Analyze data objectively 7. Share insights with stakeholders 8. Validate findings through multiple methods.",
            level: "Intermediate"
        },
        {
            question: "What is a design system and what are its key components?",
            answer: "A design system is a collection of reusable components, guided by clear standards, that can be assembled to build applications. Key components include: Design tokens (colors, typography, spacing), UI components library, patterns and templates, style guides, documentation, code snippets, and governance guidelines. It ensures consistency and efficiency across products.",
            level: "Intermediate"
        },
        {
            question: "How do you create an effective user journey map?",
            answer: "To create an effective user journey map: 1. Define user persona and scenario 2. Identify all touchpoints 3. Map user actions at each stage 4. Document user thoughts and emotions 5. Identify pain points and opportunities 6. Include relevant stakeholders and systems 7. Validate with real user data 8. Use it to guide design decisions and improvements.",
            level: "Intermediate"
        },
        {
            question: "What are the principles of good typography in UI design?",
            answer: "Good typography principles include: 1. Hierarchy - use size, weight, and color to create clear information hierarchy 2. Readability - ensure text is legible across devices 3. Consistency - maintain consistent type scales 4. Contrast - sufficient contrast between text and background 5. Alignment - proper text alignment for flow 6. Line height and spacing - optimal reading experience 7. Font pairing - harmonious font combinations.",
            level: "Intermediate"
        },
        {
            question: "How do you design for accessibility in UI/UX?",
            answer: "Designing for accessibility involves: 1. Color contrast ratios (WCAG guidelines) 2. Keyboard navigation support 3. Screen reader compatibility 4. Alternative text for images 5. Semantic HTML structure 6. Focus indicators 7. Error handling and feedback 8. Scalable text and UI elements 9. Motion preferences consideration 10. Testing with assistive technologies.",
            level: "Intermediate"
        },
        {
            question: "What is progressive disclosure and when should you use it?",
            answer: "Progressive disclosure is a technique that presents only essential information first, then reveals additional details on demand. Use it when: dealing with complex workflows, reducing cognitive load, accommodating different user expertise levels, limited screen space, or when some information is relevant only to specific user segments. Examples include multi-step forms, expandable sections, and drill-down navigation.",
            level: "Intermediate"
        },
        {
            question: "How do you conduct A/B testing for UX improvements?",
            answer: "A/B testing process: 1. Identify specific hypothesis to test 2. Define success metrics 3. Create variation (B) of original design (A) 4. Split traffic randomly between versions 5. Run test for statistically significant duration 6. Analyze results objectively 7. Implement winning version 8. Document learnings 9. Consider long-term effects and edge cases.",
            level: "Intermediate"
        },
        {
            question: "What are micro-interactions and how do they improve UX?",
            answer: "Micro-interactions are small, functional animations or design elements that accomplish a single task. They improve UX by: providing immediate feedback, guiding user attention, indicating system status, making interfaces feel more responsive and alive, helping users understand cause and effect, reducing uncertainty, and adding delight to mundane tasks. Examples: button hover states, loading animations, form validation feedback.",
            level: "Intermediate"
        },
        {
            question: "How do you design effective forms in UI/UX?",
            answer: "Effective form design principles: 1. Minimize form fields 2. Use clear, descriptive labels 3. Group related fields logically 4. Provide inline validation 5. Use appropriate input types 6. Show progress for multi-step forms 7. Make error messages helpful 8. Use smart defaults 9. Ensure mobile optimization 10. Test with real users 11. Consider accessibility requirements.",
            level: "Intermediate"
        },
        {
            question: "What is card sorting and how does it help with information architecture?",
            answer: "Card sorting is a user research method where participants organize topics into categories. Types include: open (users create categories), closed (predefined categories), and hybrid. It helps with IA by revealing users' mental models, informing navigation structure, validating content organization, identifying unclear labels, and reducing the gap between designer assumptions and user expectations.",
            level: "Intermediate"
        },
        {
            question: "How do you design for different screen sizes and devices?",
            answer: "Responsive design approach: 1. Start with mobile-first design 2. Define breakpoints strategically 3. Use flexible grid systems 4. Scale typography appropriately 5. Optimize touch targets for mobile 6. Consider thumb zones and reachability 7. Adapt navigation patterns 8. Test on real devices 9. Consider context of use 10. Optimize performance for different connections.",
            level: "Intermediate"
        },
        {
            question: "What are the key metrics for measuring UX success?",
            answer: "Key UX metrics include: 1. Task success rate 2. Time on task 3. Error rate 4. User satisfaction scores (SUS, NPS) 5. Conversion rates 6. User retention 7. Feature adoption 8. Support ticket volume 9. User engagement metrics 10. Accessibility compliance scores. Choose metrics aligned with business goals and user needs.",
            level: "Intermediate"
        },

        // Advanced Level
        {
            question: "How do you establish and maintain a design system at scale?",
            answer: "Establishing design systems at scale requires: 1. Leadership buy-in and dedicated resources 2. Cross-functional team collaboration 3. Comprehensive component audit 4. Modular, token-based architecture 5. Clear governance and contribution guidelines 6. Automated testing and quality assurance 7. Regular maintenance and versioning 8. Training and adoption programs 9. Metrics and feedback loops 10. Documentation that scales with the system.",
            level: "Advanced"
        },
        {
            question: "How do you design for emerging technologies like AR/VR?",
            answer: "Designing for AR/VR involves: 1. Understanding spatial computing principles 2. Considering user comfort and motion sickness 3. Designing for 3D environments and depth 4. Natural gesture and voice interactions 5. Contextual and environmental awareness 6. Accessibility in immersive environments 7. Performance optimization for real-time rendering 8. Multi-modal input systems 9. Privacy and safety considerations 10. Prototyping with specialized tools.",
            level: "Advanced"
        },
        {
            question: "What is design ops and how does it impact UX teams?",
            answer: "Design ops (Design Operations) focuses on optimizing design team efficiency and impact. It includes: 1. Tool and workflow standardization 2. Design system governance 3. User research operations 4. Quality assurance processes 5. Team onboarding and training 6. Metrics and performance tracking 7. Cross-team collaboration facilitation 8. Resource and project management 9. Design culture cultivation 10. Strategic planning alignment.",
            level: "Advanced"
        },
        {
            question: "How do you design ethical user experiences?",
            answer: "Ethical UX design involves: 1. Transparent data collection and usage 2. Avoiding dark patterns that manipulate users 3. Inclusive design for diverse abilities and backgrounds 4. Respecting user privacy and consent 5. Designing for user agency and control 6. Considering long-term societal impact 7. Avoiding addiction-driven design patterns 8. Providing clear opt-out mechanisms 9. Regular ethical audits of design decisions 10. Advocating for user rights within organizations.",
            level: "Advanced"
        },
        {
            question: "How do you conduct strategic UX research for product decisions?",
            answer: "Strategic UX research involves: 1. Aligning research with business objectives 2. Mixed-methods approach for comprehensive insights 3. Longitudinal studies for behavior patterns 4. Competitive and market analysis 5. Stakeholder interviews and alignment 6. Quantitative data analysis and interpretation 7. Research repository and knowledge management 8. Cross-functional insight sharing 9. Research impact measurement 10. Future-focused research planning.",
            level: "Advanced"
        },
        {
            question: "What are the challenges of designing for global markets?",
            answer: "Global design challenges include: 1. Cultural differences in visual perception and interaction patterns 2. Right-to-left (RTL) language support 3. Color symbolism and cultural meanings 4. Local regulations and compliance requirements 5. Technology infrastructure variations 6. Payment and transaction method differences 7. Content localization beyond translation 8. Time zones and date format conventions 9. Accessibility standards variations 10. User research across different markets.",
            level: "Advanced"
        },
        {
            question: "How do you measure and improve design system adoption?",
            answer: "Measuring design system adoption: 1. Component usage analytics 2. Code compliance audits 3. Designer and developer surveys 4. Time-to-market metrics 5. Design consistency scores 6. Support request volume 7. Training completion rates 8. Cross-team collaboration metrics. Improvement strategies: education programs, tool integration, incentive structures, feedback loops, and continuous iteration based on user needs.",
            level: "Advanced"
        },
        {
            question: "What is service design and how does it relate to UX?",
            answer: "Service design is the practice of designing services from the user's perspective across all touchpoints and stakeholder interactions. It relates to UX by: 1. Extending UX beyond digital interfaces 2. Considering entire customer journey 3. Mapping all service touchpoints 4. Designing for employees and internal processes 5. Systems thinking approach 6. Service blueprinting and ecosystem mapping 7. Cross-channel experience consistency 8. Organizational change management.",
            level: "Advanced"
        },
        {
            question: "How do you design for complex B2B workflows and enterprise users?",
            answer: "Designing for B2B/enterprise involves: 1. Understanding complex user roles and hierarchies 2. Accommodating expert users and power features 3. Integration with existing enterprise systems 4. Compliance and security considerations 5. Scalable information architecture 6. Customization and configuration options 7. Extensive data visualization and reporting 8. Multi-user collaboration features 9. Training and onboarding at scale 10. Long-term user relationship management.",
            level: "Advanced"
        },
        {
            question: "What is the future of UX design and emerging trends?",
            answer: "Future UX trends include: 1. AI-powered personalization and automation 2. Voice and conversational interfaces 3. Augmented and virtual reality integration 4. Biometric and emotion-based interfaces 5. Sustainable and ethical design practices 6. No-code/low-code design tools 7. Real-time collaborative design 8. Advanced accessibility technologies 9. Cross-reality (XR) experiences 10. Quantum computing interface design considerations 11. Neurofeedback-based UX optimization.",
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
                    <p className="text-gray-600">Please log in to access the UI/UX Design course.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/courses"
                                className="flex items-center text-gray-700 hover:text-purple-600 transition-all duration-300 group"
                            >
                                <div className="p-2 rounded-full bg-purple-50 group-hover:bg-purple-100 transition-colors duration-300">
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
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-3">
                {/* Course Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-700 rounded-lg p-4 text-white mb-4 shadow-lg">
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
                                        <h1 className="text-lg font-bold mb-1">UI/UX Design Mastery</h1>
                                        <p className="text-purple-100 text-sm">Master user experience and interface design principles</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                                        <BookOpen className="w-3 h-3 mr-1" />
                                        <span className="font-medium text-xs">50+ Topics</span>
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
                                        <span className="font-medium text-xs">40+ Q&As</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 rounded-lg p-2 mb-2">
                                    <div className="text-lg font-bold">{getProgressPercentage()}%</div>
                                    <div className="text-xs text-purple-100">Complete</div>
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
                    <div className="mb-12 bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Your Progress</h3>
                            <span className="text-2xl font-bold text-purple-600">{getProgressPercentage()}%</span>
                        </div>
                        <div className="w-full bg-purple-100 rounded-full h-4">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
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
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                : 'bg-white text-purple-600 hover:bg-purple-50 border border-purple-200'
                                }`}
                        >
                            Course Content
                        </button>
                        <button
                            onClick={() => setShowQA(true)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${showQA
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                : 'bg-white text-purple-600 hover:bg-purple-50 border border-purple-200'
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
                                    className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
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
                                        <p className="text-purple-100 font-medium mb-2">{module.title}</p>
                                        <p className="text-purple-200 text-sm mb-3">{module.description}</p>
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
                                                            : 'bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-200'
                                                            }`}
                                                        onClick={() => toggleTopic(topicId)}
                                                    >
                                                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${isCompleted
                                                            ? 'bg-green-500 border-green-500'
                                                            : 'border-gray-300 hover:border-purple-400'
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
                        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-center">
                                <h2 className="text-3xl font-bold text-white mb-2">UI/UX Design Q&A</h2>
                                <p className="text-purple-100">Comprehensive questions and answers to master UI/UX design concepts</p>
                            </div>
                            <div className="p-8">
                                <div className="mb-8 flex flex-wrap gap-4 justify-center">
                                    {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                        <button
                                            key={level}
                                            className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors duration-200"
                                        >
                                            {level} {level !== 'All' && `(${courseQAs.filter(qa => qa.level === level).length})`}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    {courseQAs.map((qa, index) => (
                                        <div key={index} className="border border-purple-100 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                                            <div className="flex items-start justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                                                    Q{index + 1}: {qa.question}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${qa.level === 'Beginner' ? 'bg-green-100 text-green-600' :
                                                    qa.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                                                        'bg-red-100 text-red-600'
                                                    }`}>
                                                    {qa.level}
                                                </span>
                                            </div>
                                            <div className="text-gray-700 leading-relaxed">
                                                <strong className="text-purple-600">Answer:</strong> {qa.answer}
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

export default UIUXCourse;