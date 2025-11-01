import React, { useState, useEffect } from 'react';
import {
    BookOpen,
    CheckCircle,
    Circle,
    ExternalLink,
    Search,
    Filter,
    Clock,
    TrendingUp,
    Star,
    ArrowLeft,
    PlayCircle,
    Trophy,
    Target,
    BarChart,
    Lock,
    UserCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const DSACourse = () => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedTopic, setSelectedTopic] = useState('all');
    const [completedProblems, setCompletedProblems] = useState(new Set());

    // Authentication check
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            // Redirect to login page if not authenticated
            navigate('/login', {
                state: {
                    message: 'Please login to access DSA Course',
                    returnTo: '/course/dsa'
                }
            });
        }
    }, [isAuthenticated, isLoading, navigate]);

    const topics = [
        'Arrays', 'Strings', 'Linked Lists', 'Stacks & Queues', 'Trees',
        'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Greedy',
        'Backtracking', 'Bit Manipulation', 'Math', 'Hash Table', 'Two Pointers'
    ];

    const dsaProblems = [
        // Arrays (15 problems)
        { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/two-sum/", description: "Find two numbers that add up to target" },
        { id: 2, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", description: "Maximum profit from stock prices" },
        { id: 3, title: "Contains Duplicate", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/", description: "Check if array contains duplicates" },
        { id: 4, title: "Product of Array Except Self", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/", description: "Product of all elements except current" },
        { id: 5, title: "Maximum Subarray", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/", description: "Find contiguous subarray with largest sum" },
        { id: 6, title: "Maximum Product Subarray", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/", description: "Find contiguous subarray with largest product" },
        { id: 7, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", description: "Find minimum in rotated array" },
        { id: 8, title: "Search in Rotated Sorted Array", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/", description: "Search target in rotated array" },
        { id: 9, title: "3Sum", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/3sum/", description: "Find all unique triplets that sum to zero" },
        { id: 10, title: "Container With Most Water", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/", description: "Find container that holds most water" },
        { id: 11, title: "Merge Intervals", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/merge-intervals/", description: "Merge overlapping intervals" },
        { id: 12, title: "Rotate Array", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/rotate-array/", description: "Rotate array k steps to the right" },
        { id: 13, title: "Sliding Window Maximum", difficulty: "Hard", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/", description: "Maximum in each sliding window" },
        { id: 14, title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/", description: "Find median of two sorted arrays" },
        { id: 15, title: "Trapping Rain Water", difficulty: "Hard", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/", description: "Calculate trapped rainwater" },

        // Strings (10 problems)
        { id: 16, title: "Valid Anagram", difficulty: "Easy", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/valid-anagram/", description: "Check if two strings are anagrams" },
        { id: 17, title: "Valid Parentheses", difficulty: "Easy", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/", description: "Check if parentheses are balanced" },
        { id: 18, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", description: "Find longest substring without repeating chars" },
        { id: 19, title: "Longest Repeating Character Replacement", difficulty: "Medium", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/", description: "Longest substring with k character replacements" },
        { id: 20, title: "Group Anagrams", difficulty: "Medium", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/group-anagrams/", description: "Group strings that are anagrams" },
        { id: 21, title: "Valid Palindrome", difficulty: "Easy", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/", description: "Check if string is palindrome" },
        { id: 22, title: "Longest Palindromic Substring", difficulty: "Medium", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/", description: "Find longest palindromic substring" },
        { id: 23, title: "Palindromic Substrings", difficulty: "Medium", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/palindromic-substrings/", description: "Count palindromic substrings" },
        { id: 24, title: "Minimum Window Substring", difficulty: "Hard", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/", description: "Minimum window containing all characters" },
        { id: 25, title: "Edit Distance", difficulty: "Hard", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/edit-distance/", description: "Minimum edits to convert strings" },

        // Linked Lists (8 problems)
        { id: 26, title: "Reverse Linked List", difficulty: "Easy", topic: "Linked Lists", leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/", description: "Reverse a singly linked list" },
        { id: 27, title: "Detect Cycle in Linked List", difficulty: "Easy", topic: "Linked Lists", leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/", description: "Detect if linked list has cycle" },
        { id: 28, title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Linked Lists", leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/", description: "Merge two sorted linked lists" },
        { id: 29, title: "Remove Nth Node From End", difficulty: "Medium", topic: "Linked Lists", leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", description: "Remove nth node from end" },
        { id: 30, title: "Reorder List", difficulty: "Medium", topic: "Linked Lists", leetcodeUrl: "https://leetcode.com/problems/reorder-list/", description: "Reorder linked list in specific pattern" },
        { id: 31, title: "Add Two Numbers", difficulty: "Medium", topic: "Linked Lists", leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/", description: "Add numbers represented as linked lists" },
        { id: 32, title: "Copy List with Random Pointer", difficulty: "Medium", topic: "Linked Lists", leetcodeUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/", description: "Deep copy list with random pointers" },
        { id: 33, title: "Merge k Sorted Lists", difficulty: "Hard", topic: "Linked Lists", leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/", description: "Merge k sorted linked lists" },

        // Trees (12 problems)
        { id: 34, title: "Maximum Depth of Binary Tree", difficulty: "Easy", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", description: "Find maximum depth of tree" },
        { id: 35, title: "Same Tree", difficulty: "Easy", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/same-tree/", description: "Check if two trees are same" },
        { id: 36, title: "Invert Binary Tree", difficulty: "Easy", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/", description: "Invert a binary tree" },
        { id: 37, title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/", description: "Level order traversal of tree" },
        { id: 38, title: "Validate Binary Search Tree", difficulty: "Medium", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/", description: "Check if tree is valid BST" },
        { id: 39, title: "Lowest Common Ancestor of BST", difficulty: "Easy", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", description: "Find LCA in BST" },
        { id: 40, title: "Binary Tree Right Side View", difficulty: "Medium", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/binary-tree-right-side-view/", description: "Right side view of tree" },
        { id: 41, title: "Construct Binary Tree from Preorder and Inorder", difficulty: "Medium", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", description: "Build tree from traversals" },
        { id: 42, title: "Kth Smallest Element in BST", difficulty: "Medium", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", description: "Find kth smallest in BST" },
        { id: 43, title: "Subtree of Another Tree", difficulty: "Easy", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/subtree-of-another-tree/", description: "Check if tree is subtree" },
        { id: 44, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", description: "Serialize/deserialize tree" },
        { id: 45, title: "Binary Tree Maximum Path Sum", difficulty: "Hard", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", description: "Maximum path sum in tree" },

        // Dynamic Programming (12 problems)
        { id: 46, title: "Climbing Stairs", difficulty: "Easy", topic: "Dynamic Programming", leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/", description: "Number of ways to climb stairs" },
        { id: 47, title: "House Robber", difficulty: "Medium", topic: "Dynamic Programming", leetcodeUrl: "https://leetcode.com/problems/house-robber/", description: "Maximum money robber can steal" },
        { id: 48, title: "House Robber II", difficulty: "Medium", topic: "Dynamic Programming", leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/", description: "House robber in circular arrangement" },
        { id: 49, title: "Longest Increasing Subsequence", difficulty: "Medium", topic: "Dynamic Programming", leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/", description: "Length of longest increasing subsequence" },
        { id: 50, title: "Coin Change", difficulty: "Medium", topic: "Dynamic Programming", leetcodeUrl: "https://leetcode.com/problems/coin-change/", description: "Minimum coins for amount" },
        { id: 51, title: "Unique Paths", difficulty: "Medium", topic: "Dynamic Programming", leetcodeUrl: "https://leetcode.com/problems/unique-paths/", description: "Unique paths in grid" },
        { id: 52, title: "Jump Game", difficulty: "Medium", topic: "Dynamic Programming", leetcodeUrl: "https://leetcode.com/problems/jump-game/", description: "Can reach end of array" },
        { id: 53, title: "Word Break", difficulty: "Medium", topic: "Dynamic Programming", leetcodeUrl: "https://leetcode.com/problems/word-break/", description: "Can string be segmented" },
        { id: 54, title: "Combination Sum IV", difficulty: "Medium", topic: "Dynamic Programming", leetcodeUrl: "https://leetcode.com/problems/combination-sum-iv/", description: "Number of combinations for target" },
        { id: 55, title: "Decode Ways", difficulty: "Medium", topic: "Dynamic Programming", leetcodeUrl: "https://leetcode.com/problems/decode-ways/", description: "Number of ways to decode string" },
        { id: 56, title: "Longest Common Subsequence", difficulty: "Medium", topic: "Dynamic Programming", leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/", description: "Length of LCS" },
        { id: 57, title: "Regular Expression Matching", difficulty: "Hard", topic: "Dynamic Programming", leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching/", description: "Pattern matching with . and *" },

        // Graphs (10 problems)
        { id: 58, title: "Number of Islands", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/number-of-islands/", description: "Count connected components" },
        { id: 59, title: "Clone Graph", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/clone-graph/", description: "Deep clone undirected graph" },
        { id: 60, title: "Course Schedule", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/course-schedule/", description: "Detect cycle in directed graph" },
        { id: 61, title: "Pacific Atlantic Water Flow", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/pacific-atlantic-water-flow/", description: "Water flow to both oceans" },
        { id: 62, title: "Longest Consecutive Sequence", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/", description: "Longest consecutive elements" },
        { id: 63, title: "Graph Valid Tree", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/graph-valid-tree/", description: "Check if graph is valid tree" },
        { id: 64, title: "Number of Connected Components", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", description: "Count connected components" },
        { id: 65, title: "Surrounded Regions", difficulty: "Medium", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/surrounded-regions/", description: "Flip surrounded regions" },
        { id: 66, title: "Word Ladder", difficulty: "Hard", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/word-ladder/", description: "Shortest transformation sequence" },
        { id: 67, title: "Alien Dictionary", difficulty: "Hard", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/", description: "Find alien language order" },

        // Stacks & Queues (8 problems)
        { id: 68, title: "Valid Parentheses", difficulty: "Easy", topic: "Stacks & Queues", leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/", description: "Check balanced parentheses" },
        { id: 69, title: "Min Stack", difficulty: "Easy", topic: "Stacks & Queues", leetcodeUrl: "https://leetcode.com/problems/min-stack/", description: "Stack with min operation" },
        { id: 70, title: "Evaluate Reverse Polish Notation", difficulty: "Medium", topic: "Stacks & Queues", leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", description: "Evaluate RPN expression" },
        { id: 71, title: "Daily Temperatures", difficulty: "Medium", topic: "Stacks & Queues", leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/", description: "Next warmer temperature" },
        { id: 72, title: "Largest Rectangle in Histogram", difficulty: "Hard", topic: "Stacks & Queues", leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/", description: "Largest rectangle area" },
        { id: 73, title: "Implement Queue using Stacks", difficulty: "Easy", topic: "Stacks & Queues", leetcodeUrl: "https://leetcode.com/problems/implement-queue-using-stacks/", description: "Queue implementation using stacks" },
        { id: 74, title: "Sliding Window Maximum", difficulty: "Hard", topic: "Stacks & Queues", leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/", description: "Maximum in sliding window" },
        { id: 75, title: "Basic Calculator", difficulty: "Hard", topic: "Stacks & Queues", leetcodeUrl: "https://leetcode.com/problems/basic-calculator/", description: "Evaluate math expression" },

        // Additional problems to reach 100
        { id: 76, title: "Binary Search", difficulty: "Easy", topic: "Searching", leetcodeUrl: "https://leetcode.com/problems/binary-search/", description: "Standard binary search" },
        { id: 77, title: "Search a 2D Matrix", difficulty: "Medium", topic: "Searching", leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/", description: "Search in sorted 2D matrix" },
        { id: 78, title: "Kth Largest Element in Array", difficulty: "Medium", topic: "Sorting", leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/", description: "Find kth largest element" },
        { id: 79, title: "Meeting Rooms", difficulty: "Easy", topic: "Greedy", leetcodeUrl: "https://leetcode.com/problems/meeting-rooms/", description: "Can attend all meetings" },
        { id: 80, title: "Meeting Rooms II", difficulty: "Medium", topic: "Greedy", leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/", description: "Minimum meeting rooms needed" },
        { id: 81, title: "Non-overlapping Intervals", difficulty: "Medium", topic: "Greedy", leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/", description: "Remove minimum intervals" },
        { id: 82, title: "Combination Sum", difficulty: "Medium", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/combination-sum/", description: "Find combinations that sum to target" },
        { id: 83, title: "Generate Parentheses", difficulty: "Medium", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/generate-parentheses/", description: "Generate valid parentheses" },
        { id: 84, title: "Word Search", difficulty: "Medium", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/word-search/", description: "Find word in 2D board" },
        { id: 85, title: "Palindrome Partitioning", difficulty: "Medium", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning/", description: "Partition string into palindromes" },
        { id: 86, title: "Single Number", difficulty: "Easy", topic: "Bit Manipulation", leetcodeUrl: "https://leetcode.com/problems/single-number/", description: "Find single number in array" },
        { id: 87, title: "Number of 1 Bits", difficulty: "Easy", topic: "Bit Manipulation", leetcodeUrl: "https://leetcode.com/problems/number-of-1-bits/", description: "Count set bits" },
        { id: 88, title: "Counting Bits", difficulty: "Easy", topic: "Bit Manipulation", leetcodeUrl: "https://leetcode.com/problems/counting-bits/", description: "Count bits for 0 to n" },
        { id: 89, title: "Missing Number", difficulty: "Easy", topic: "Bit Manipulation", leetcodeUrl: "https://leetcode.com/problems/missing-number/", description: "Find missing number" },
        { id: 90, title: "Reverse Bits", difficulty: "Easy", topic: "Bit Manipulation", leetcodeUrl: "https://leetcode.com/problems/reverse-bits/", description: "Reverse bits of integer" },
        { id: 91, title: "Sum of Two Integers", difficulty: "Medium", topic: "Bit Manipulation", leetcodeUrl: "https://leetcode.com/problems/sum-of-two-integers/", description: "Add without + operator" },
        { id: 92, title: "Happy Number", difficulty: "Easy", topic: "Math", leetcodeUrl: "https://leetcode.com/problems/happy-number/", description: "Determine if number is happy" },
        { id: 93, title: "Pow(x, n)", difficulty: "Medium", topic: "Math", leetcodeUrl: "https://leetcode.com/problems/powx-n/", description: "Implement power function" },
        { id: 94, title: "Sqrt(x)", difficulty: "Easy", topic: "Math", leetcodeUrl: "https://leetcode.com/problems/sqrtx/", description: "Integer square root" },
        { id: 95, title: "Integer to Roman", difficulty: "Medium", topic: "Math", leetcodeUrl: "https://leetcode.com/problems/integer-to-roman/", description: "Convert integer to roman" },
        { id: 96, title: "Roman to Integer", difficulty: "Easy", topic: "Math", leetcodeUrl: "https://leetcode.com/problems/roman-to-integer/", description: "Convert roman to integer" },
        { id: 97, title: "Valid Sudoku", difficulty: "Medium", topic: "Hash Table", leetcodeUrl: "https://leetcode.com/problems/valid-sudoku/", description: "Check if sudoku is valid" },
        { id: 98, title: "Top K Frequent Elements", difficulty: "Medium", topic: "Hash Table", leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/", description: "Find k most frequent elements" },
        { id: 99, title: "Intersection of Two Arrays II", difficulty: "Easy", topic: "Two Pointers", leetcodeUrl: "https://leetcode.com/problems/intersection-of-two-arrays-ii/", description: "Find intersection with duplicates" },
        { id: 100, title: "Remove Duplicates from Sorted Array", difficulty: "Easy", topic: "Two Pointers", leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", description: "Remove duplicates in-place" },
    ];

    const filteredProblems = dsaProblems.filter(problem => {
        const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            problem.topic.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
        const matchesTopic = selectedTopic === 'all' || problem.topic === selectedTopic;

        return matchesSearch && matchesDifficulty && matchesTopic;
    });

    const toggleProblemCompletion = (problemId) => {
        const newCompleted = new Set(completedProblems);
        if (newCompleted.has(problemId)) {
            newCompleted.delete(problemId);
        } else {
            newCompleted.add(problemId);
        }
        setCompletedProblems(newCompleted);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'text-green-600 bg-green-100';
            case 'Medium': return 'text-yellow-600 bg-yellow-100';
            case 'Hard': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const stats = {
        total: dsaProblems.length,
        completed: completedProblems.size,
        easy: dsaProblems.filter(p => p.difficulty === 'Easy').length,
        medium: dsaProblems.filter(p => p.difficulty === 'Medium').length,
        hard: dsaProblems.filter(p => p.difficulty === 'Hard').length
    };

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-blue-600 animate-pulse" />
                    </div>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Loading DSA Course...</h3>
                    <p className="text-gray-600 text-sm">Please wait while we verify your access</p>
                </div>
            </div>
        );
    }

    // Show access denied if not authenticated (fallback)
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 text-center max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Lock className="w-10 h-10 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Access Restricted</h3>
                    <p className="text-gray-600 mb-6">
                        You need to be logged in to access the DSA Course. Please create an account or login to continue learning.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Link
                            to="/login"
                            state={{ returnTo: '/course/dsa', message: 'Login to access DSA Course' }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            state={{ returnTo: '/course/dsa' }}
                            className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 hover:shadow-md transition-all duration-300"
                        >
                            Sign Up
                        </Link>
                    </div>
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
                                <UserCheck className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium text-gray-700">
                                    Welcome, {user?.name || 'User'}!
                                </span>
                            </div>
                            <Link
                                to="/profileinside"
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
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-lg p-4 text-white mb-4 shadow-lg">
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
                                        <h1 className="text-lg font-bold mb-1">Data Structures & Algorithms</h1>
                                        <p className="text-blue-100 text-sm">Master DSA with 100 curated LeetCode problems</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                                        <BookOpen className="w-3 h-3 mr-1" />
                                        <span className="font-medium text-xs">100 Problems</span>
                                    </div>
                                    <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                                        <Clock className="w-3 h-3 mr-1" />
                                        <span className="font-medium text-xs">Self-paced</span>
                                    </div>
                                    <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        <span className="font-medium text-xs">Beginner to Advanced</span>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="hidden md:block text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                                    <div className="text-xl font-bold mb-1">{stats.completed}<span className="text-sm">/{stats.total}</span></div>
                                    <div className="text-blue-100 font-medium text-xs">Problems Solved</div>
                                    <div className="w-16 bg-white/30 rounded-full h-1 mt-2">
                                        <div
                                            className="bg-white rounded-full h-1 transition-all duration-500"
                                            style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {/* <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-white/50">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-xl font-bold text-gray-900 mb-0.5">{stats.completed}</div>
                        <div className="text-xs font-medium text-gray-600">Solved</div>
                    </div> */}

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-white/50">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white/90 rounded flex items-center justify-center">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            </div>
                        </div>
                        <div className="text-xl font-bold text-gray-900 mb-0.5">{stats.easy}</div>
                        <div className="text-xs font-medium text-gray-600">Easy</div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-white/50">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white/90 rounded flex items-center justify-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            </div>
                        </div>
                        <div className="text-xl font-bold text-gray-900 mb-0.5">{stats.medium}</div>
                        <div className="text-xs font-medium text-gray-600">Medium</div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-white/50">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white/90 rounded flex items-center justify-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            </div>
                        </div>
                        <div className="text-xl font-bold text-gray-900 mb-0.5">{stats.hard}</div>
                        <div className="text-xs font-medium text-gray-600">Hard</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-3 mb-4 border border-white/50">
                    <div className="flex items-center mb-2">
                        <Filter className="w-3 h-3 text-gray-600 mr-1" />
                        <h3 className="text-sm font-semibold text-gray-800">Filter Problems</h3>
                    </div>

                    <div className="grid md:grid-cols-4 gap-2">
                        {/* Search */}
                        <div className="relative group">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search problems..."
                                className="w-full pl-7 pr-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Difficulty Filter */}
                        <select
                            className="px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 cursor-pointer"
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                        >
                            <option value="all">All Difficulties</option>
                            <option value="Easy">🟢 Easy</option>
                            <option value="Medium">🟡 Medium</option>
                            <option value="Hard">🔴 Hard</option>
                        </select>

                        {/* Topic Filter */}
                        <select
                            className="px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 cursor-pointer"
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                        >
                            <option value="all">All Topics</option>
                            {topics.map(topic => (
                                <option key={topic} value={topic}>{topic}</option>
                            ))}
                        </select>

                        {/* Progress Display */}
                        {/* <div className="flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-2 py-2 border border-blue-100">
                            <BarChart className="w-3 h-3 text-blue-600 mr-1" />
                            <span className="text-xs font-semibold text-blue-800">
                                {Math.round((stats.completed / stats.total) * 100)}% Complete
                            </span>
                        </div> */}
                    </div>
                </div>

                {/* Problems List */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-white/50">
                    <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-800 flex items-center">
                                <BookOpen className="w-3 h-3 mr-1 text-blue-600" />
                                Problems ({filteredProblems.length})
                            </h2>
                            <div className="text-xs text-gray-600">
                                Click ✓ to mark as solved
                            </div>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {filteredProblems.map((problem, index) => (
                            <div key={problem.id} className="px-3 py-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 flex-1">
                                        <button
                                            onClick={() => toggleProblemCompletion(problem.id)}
                                            className="shrink-0 transition-all duration-300 hover:scale-110"
                                        >
                                            {completedProblems.has(problem.id) ? (
                                                <div className="relative">
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                    <div className="absolute inset-0 rounded-full bg-green-100 opacity-20 animate-ping"></div>
                                                </div>
                                            ) : (
                                                <Circle className="w-4 h-4 text-gray-400 hover:text-blue-500 transition-colors" />
                                            )}
                                        </button>

                                        <div className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-0.5">
                                            <span className="text-xs font-bold text-gray-700">#{problem.id}</span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                                                {problem.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                                                {problem.description}
                                            </p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getDifficultyColor(problem.difficulty)} shadow-sm`}>
                                                    {problem.difficulty === 'Easy' && '🟢'}
                                                    {problem.difficulty === 'Medium' && '🟡'}
                                                    {problem.difficulty === 'Hard' && '🔴'}
                                                    {problem.difficulty}
                                                </span>
                                                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                                                    {problem.topic}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        href={problem.leetcodeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 flex items-center space-x-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-lg font-medium hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 group-hover:shadow-lg text-xs"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        <span>LeetCode</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {filteredProblems.length === 0 && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No problems found</h3>
                        <p className="text-gray-600 mb-4 text-sm max-w-sm mx-auto">
                            We couldn't find any problems matching your current filters. Try adjusting your search criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedDifficulty('all');
                                setSelectedTopic('all');
                            }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 text-sm"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DSACourse;