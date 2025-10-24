import React, { useState } from 'react';
import { BookOpen, Search, Filter, Clock, Users, Star, ChevronDown, Grid, List, TrendingUp, Award, Video, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Courses', count: 50 },
    { id: 'web', name: 'Web Development', count: 15 },
    { id: 'data', name: 'Data Science', count: 12 },
    { id: 'mobile', name: 'Mobile Development', count: 8 },
    { id: 'design', name: 'UI/UX Design', count: 10 },
    { id: 'ai', name: 'AI & Machine Learning', count: 5 }
  ];

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development Bootcamp",
      instructor: "Dr. Sarah Johnson",
      category: "Web Development",
      duration: "12 weeks",
      enrolled: 1234,
      rating: 4.8,
      reviews: 456,
      price: "Free",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
      description: "Master full stack development with React, Node.js, Express, and MongoDB. Build real-world projects.",
      lessons: 45,

    },
    {
      id: 2,
      title: "Data Science & Machine Learning Masterclass",
      instructor: "Prof. Michael Chen",
      category: "Data Science",
      duration: "16 weeks",
      enrolled: 987,
      rating: 4.9,
      reviews: 321,
      price: "Free",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      description: "Learn Python, pandas, scikit-learn, and TensorFlow. Complete hands-on ML projects.",
      lessons: 60,
      hours: 48
    },
    {
      id: 3,
      title: "React Native Mobile App Development",
      instructor: "Emily Rodriguez",
      category: "Mobile Development",
      duration: "10 weeks",
      enrolled: 756,
      rating: 4.7,
      reviews: 234,
      price: "Free",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      description: "Build cross-platform mobile apps with React Native. Deploy to iOS and Android.",
      lessons: 38,
      hours: 28
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      instructor: "Alex Thompson",
      category: "UI/UX Design",
      duration: "8 weeks",
      enrolled: 654,
      rating: 4.8,
      reviews: 189,
      price: "Free",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      description: "Master design principles, Figma, prototyping, and user research methodologies.",
      lessons: 30,
      hours: 24
    },
    {
      id: 5,
      title: "Python for Data Analysis",
      instructor: "Dr. James Wilson",
      category: "Data Science",
      duration: "6 weeks",
      enrolled: 543,
      rating: 4.6,
      reviews: 167,
      price: "Free",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
      description: "Learn Python programming for data analysis with pandas, NumPy, and matplotlib.",
      lessons: 25,
      hours: 18
    },
    {
      id: 6,
      title: "Advanced JavaScript & TypeScript",
      instructor: "Maria Garcia",
      category: "Web Development",
      duration: "14 weeks",
      enrolled: 892,
      rating: 4.9,
      reviews: 278,
      price: "Free",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      description: "Deep dive into modern JavaScript, TypeScript, design patterns, and best practices.",
      lessons: 52,
      hours: 40
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === categories.find(c => c.id === selectedCategory)?.name;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
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
                    <a href="#about" className="text-sm text-gray-700 hover:text-blue-600 transition">About</a>
                    <Link to="/signup" className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:shadow-md transition">
                        Sign Up
                    </Link>
                </div>

          {/* Mobile Menu Button */}
          {/* <div className="md:hidden">
              <button 
                className="p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
          </div> */}

          {/* Mobile Menu */}
          {/* {mobileMenuOpen && (
            <div className="md:hidden py-3 space-y-3 border-t border-gray-100">
              <a href="#courses" className="block text-sm text-gray-700 hover:text-blue-600">Courses</a>
              <a href="#features" className="block text-sm text-gray-700 hover:text-blue-600">Features</a>
              <a href="#about" className="block text-sm text-gray-700 hover:text-blue-600">About</a>
              <button className="block w-full bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm">
                Sign Up
              </button>
            </div>
          )} */}
            </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid md:grid-cols-12 gap-3">
            {/* Search */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Sort By */}
            <div className="md:col-span-2 relative">
              <select
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="duration">Duration</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="md:col-span-2 flex items-center space-x-2">
              <button
                className={`flex-1 p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4 mx-auto" />
              </button>
              <button
                className={`flex-1 p-2 rounded-md transition ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'all' || searchQuery) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('all')} className="ml-2 hover:text-blue-900">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-2 hover:text-purple-900">×</button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> courses
          </p>
        </div>

        {/* Courses Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="relative">
                  <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-900">
                    {course.price}
                  </div>
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {course.level}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="text-xs text-blue-600 font-semibold mb-1">{course.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      {/* <Video className="w-3 h-3 mr-1" /> */}
                      {course.lessons} Questions
                    </div>
                    {/* <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {course.hours}h
                    </div> */}
                  </div>

                  <div className="flex items-center justify-between mb-3 pb-3 border-b">
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="ml-1 text-gray-900 font-semibold text-sm">{course.rating}</span>
                      <span className="ml-1 text-gray-500 text-xs">({course.reviews})</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      {course.enrolled.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* <div className="text-xs text-gray-600">
                      by <span className="font-semibold text-gray-900">{course.instructor}</span>
                    </div> */}
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:shadow-md transition">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="md:flex">
                  <div className="md:w-48 h-32 md:h-auto">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-blue-600 font-semibold">{course.category}</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{course.level}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <Video className="w-3 h-3 mr-1" />
                            {course.lessons} lessons
                          </div>
                          <div className="flex items-center">
                            <FileText className="w-3 h-3 mr-1" />
                            {course.hours} hours
                          </div>
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {course.enrolled.toLocaleString()} enrolled
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="ml-1 text-gray-900 font-semibold text-sm">{course.rating}</span>
                            <span className="ml-1 text-gray-500 text-xs">({course.reviews} reviews)</span>
                          </div>
                          <div className="text-gray-600 text-xs">
                            by <span className="font-semibold text-gray-900">{course.instructor}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-3 text-right">
                        <div className="text-lg font-bold text-gray-900 mb-2">{course.price}</div>
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:shadow-md transition">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}