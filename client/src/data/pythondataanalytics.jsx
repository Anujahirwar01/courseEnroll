import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Clock, TrendingUp, Trophy, UserCheck } from 'lucide-react';
import { useAuth } from '../context/authcontext';

const PythonDataAnalyticsCourse = () => {
    const { user } = useAuth();
    const [completedTopics, setCompletedTopics] = useState(new Set());
    const [activeModule, setActiveModule] = useState(0);
    const [showQA, setShowQA] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('python-data-analytics-progress');
        if (saved) {
            setCompletedTopics(new Set(JSON.parse(saved)));
        }
    }, []);

    const saveProgress = (newCompleted) => {
        localStorage.setItem('python-data-analytics-progress', JSON.stringify([...newCompleted]));
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
            title: "Python Programming Fundamentals",
            description: "Master Python basics essential for data analytics and scientific computing",
            duration: "2 weeks",
            difficulty: "Beginner",
            topics: [
                "Python Installation and Environment Setup - Anaconda, Jupyter, VS Code",
                "Python Syntax and Basic Data Types - Strings, numbers, booleans",
                "Variables and Operators - Assignment, arithmetic, comparison, logical",
                "Control Structures - If statements, loops, and conditional logic",
                "Functions and Modules - Creating reusable code and importing libraries",
                "Data Structures - Lists, tuples, dictionaries, and sets",
                "File I/O Operations - Reading and writing files for data processing",
                "Error Handling - Try-except blocks and debugging techniques",
                "Python Best Practices - PEP 8, code organization, and documentation"
            ]
        },
        {
            title: "NumPy for Numerical Computing",
            description: "Fundamental library for scientific computing and array operations",
            duration: "2 weeks",
            difficulty: "Beginner",
            topics: [
                "NumPy Arrays and Array Creation - ndarray fundamentals and initialization",
                "Array Indexing and Slicing - Accessing and modifying array elements",
                "Array Operations and Broadcasting - Element-wise operations and shape manipulation",
                "Mathematical Functions - Trigonometric, exponential, and statistical functions",
                "Array Reshaping and Manipulation - Changing array dimensions and structure",
                "Linear Algebra Operations - Matrix multiplication, eigenvalues, decomposition",
                "Random Number Generation - Sampling, distributions, and reproducibility",
                "Performance Optimization - Vectorization and memory-efficient operations",
                "Integration with Other Libraries - NumPy as foundation for data science stack"
            ]
        },
        {
            title: "Pandas for Data Manipulation",
            description: "Comprehensive data manipulation and analysis with pandas DataFrames",
            duration: "4 weeks",
            difficulty: "Intermediate",
            topics: [
                "Pandas Data Structures - Series and DataFrame fundamentals",
                "Data Loading and I/O - CSV, Excel, JSON, SQL, and web data sources",
                "Data Inspection and Exploration - Info, describe, head, tail methods",
                "Data Selection and Filtering - Boolean indexing, query, and loc/iloc",
                "Data Cleaning and Preprocessing - Handling missing values and duplicates",
                "Data Transformation - Apply, map, and lambda functions",
                "Grouping and Aggregation - GroupBy operations and pivot tables",
                "Merging and Joining - Combining datasets with merge, join, and concat",
                "Time Series Analysis - DateTime indexing and time-based operations",
                "Data Export and Saving - Writing processed data to various formats"
            ]
        },
        {
            title: "Data Visualization with Matplotlib",
            description: "Creating compelling visualizations to communicate data insights",
            duration: "3 weeks",
            difficulty: "Intermediate",
            topics: [
                "Matplotlib Fundamentals - Figure, axes, and plotting basics",
                "Line Plots and Scatter Plots - Visualizing relationships and trends",
                "Bar Charts and Histograms - Categorical data and distributions",
                "Subplots and Multiple Plots - Creating complex visualization layouts",
                "Customization and Styling - Colors, markers, labels, and themes",
                "Statistical Plots - Box plots, violin plots, and error bars",
                "3D Plotting - Surface plots and 3D scatter plots",
                "Animation and Interactive Plots - Dynamic visualizations",
                "Saving and Exporting Plots - High-quality outputs for presentations"
            ]
        },
        {
            title: "Advanced Visualization with Seaborn",
            description: "Statistical data visualization and advanced plotting techniques",
            duration: "2 weeks",
            difficulty: "Intermediate",
            topics: [
                "Seaborn Introduction - Statistical visualization philosophy and setup",
                "Distribution Plots - Histograms, KDE, and distribution visualization",
                "Relationship Plots - Scatter plots, line plots, and correlation visualization",
                "Categorical Plots - Box plots, violin plots, and categorical comparisons",
                "Matrix Plots - Heatmaps and correlation matrices",
                "Multi-plot Grids - FacetGrid and PairGrid for complex visualizations",
                "Statistical Estimation - Regression plots and confidence intervals",
                "Color Palettes and Themes - Professional styling and branding",
                "Integration with Pandas - Direct plotting from DataFrames"
            ]
        },
        {
            title: "Statistical Analysis and Hypothesis Testing",
            description: "Statistical methods for data analysis and scientific decision making",
            duration: "3 weeks",
            difficulty: "Advanced",
            topics: [
                "Descriptive Statistics - Mean, median, variance, and distribution measures",
                "Probability Distributions - Normal, binomial, Poisson, and other distributions",
                "Confidence Intervals - Parameter estimation and uncertainty quantification",
                "Hypothesis Testing Fundamentals - Null/alternative hypotheses and p-values",
                "T-tests and Z-tests - Comparing means and testing significance",
                "Chi-square Tests - Testing independence and goodness of fit",
                "ANOVA - Analysis of variance for multiple group comparisons",
                "Correlation and Regression - Relationship analysis and prediction",
                "Non-parametric Tests - Mann-Whitney, Wilcoxon, and rank-based tests",
                "Multiple Testing Correction - Bonferroni and FDR adjustments"
            ]
        },
        {
            title: "Machine Learning Fundamentals",
            description: "Introduction to machine learning concepts and scikit-learn",
            duration: "4 weeks",
            difficulty: "Advanced",
            topics: [
                "Machine Learning Overview - Supervised, unsupervised, and reinforcement learning",
                "Scikit-learn Introduction - API design and workflow patterns",
                "Data Preprocessing - Scaling, encoding, and feature preparation",
                "Linear Regression - Simple and multiple linear regression models",
                "Logistic Regression - Classification and probability estimation",
                "Decision Trees - Tree-based models and feature importance",
                "Random Forest - Ensemble methods and bagging",
                "K-Means Clustering - Unsupervised learning and cluster analysis",
                "Model Evaluation - Cross-validation, metrics, and performance assessment",
                "Feature Selection - Identifying relevant features for modeling"
            ]
        },
        {
            title: "Data Mining and Pattern Recognition",
            description: "Advanced techniques for discovering patterns and insights in data",
            duration: "3 weeks",
            difficulty: "Advanced",
            topics: [
                "Data Mining Process - CRISP-DM methodology and project lifecycle",
                "Association Rules - Market basket analysis and frequent itemsets",
                "Classification Techniques - SVM, KNN, and Naive Bayes",
                "Clustering Algorithms - Hierarchical clustering and DBSCAN",
                "Dimensionality Reduction - PCA and feature extraction",
                "Anomaly Detection - Outlier identification and fraud detection",
                "Text Mining - Natural language processing and sentiment analysis",
                "Time Series Mining - Pattern recognition in temporal data",
                "Recommendation Systems - Collaborative and content-based filtering"
            ]
        },
        {
            title: "Big Data Analytics with Python",
            description: "Handling large datasets and distributed computing frameworks",
            duration: "3 weeks",
            difficulty: "Advanced",
            topics: [
                "Big Data Fundamentals - Volume, velocity, variety, and veracity",
                "Dask for Parallel Computing - Scaling pandas and NumPy operations",
                "Apache Spark with PySpark - Distributed data processing",
                "Data Streaming - Real-time analytics and stream processing",
                "Cloud Analytics Platforms - AWS, GCP, and Azure data services",
                "Database Integration - SQL databases and NoSQL systems",
                "Performance Optimization - Memory management and computational efficiency",
                "Distributed Machine Learning - Scaling ML models across clusters",
                "ETL Pipelines - Extract, transform, and load workflows"
            ]
        },
        {
            title: "Professional Data Analytics Projects",
            description: "Real-world projects and industry best practices for data analytics",
            duration: "4 weeks",
            difficulty: "Advanced",
            topics: [
                "Project Planning and Scoping - Defining objectives and success metrics",
                "Data Collection Strategies - APIs, web scraping, and data sources",
                "Exploratory Data Analysis - Comprehensive data investigation techniques",
                "Business Intelligence Dashboards - Interactive reporting and visualization",
                "A/B Testing and Experimentation - Statistical testing for business decisions",
                "Predictive Analytics - Forecasting and trend analysis",
                "Customer Analytics - Segmentation, lifetime value, and churn analysis",
                "Financial Analytics - Risk assessment and portfolio optimization",
                "Healthcare Analytics - Medical data analysis and population health",
                "Deployment and Production - Putting models into production environments"
            ]
        }
    ];

    const courseQAs = [
        // Beginner Level
        {
            question: "What makes Python particularly suitable for data analytics?",
            answer: "Python excels in data analytics due to its rich ecosystem of libraries (NumPy, pandas, scikit-learn), readable syntax, strong community support, versatility across the data science pipeline, excellent visualization capabilities, and seamless integration with databases and APIs. Its interpreted nature allows for interactive analysis, making it ideal for exploratory data analysis.",
            level: "Beginner"
        },
        {
            question: "What's the difference between NumPy arrays and Python lists for data analysis?",
            answer: "NumPy arrays are more efficient for numerical computations: they use less memory, support vectorized operations (faster than loops), have homogeneous data types, enable broadcasting, and provide mathematical functions. Python lists are more flexible but slower for large-scale numerical operations. NumPy arrays are essential for data analytics performance.",
            level: "Beginner"
        },
        {
            question: "How do you handle missing data in pandas?",
            answer: "Pandas provides several methods: `isnull()` and `notnull()` for detection, `dropna()` for removal, `fillna()` for imputation with values/methods (forward fill, backward fill, mean), `interpolate()` for sophisticated filling, and `isna()` for checking. Choose based on data type, missing pattern, and business requirements.",
            level: "Beginner"
        },
        {
            question: "What are the key components of a pandas DataFrame?",
            answer: "A DataFrame consists of: Index (row labels), Columns (column labels), Values (actual data in 2D array), dtypes (data types for each column), and Shape (dimensions). It's like a spreadsheet or SQL table with powerful indexing, selection, and manipulation capabilities for structured data analysis.",
            level: "Beginner"
        },
        {
            question: "How do you read different file formats into pandas?",
            answer: "Pandas provides specialized functions: `read_csv()` for CSV files, `read_excel()` for Excel files, `read_json()` for JSON, `read_sql()` for databases, `read_html()` for HTML tables, `read_parquet()` for Parquet files. Each function has parameters for handling headers, data types, missing values, and formatting options.",
            level: "Beginner"
        },
        {
            question: "What's the purpose of data visualization in analytics?",
            answer: "Data visualization helps communicate insights, identify patterns and outliers, explore relationships between variables, validate assumptions, support decision-making, and present findings to stakeholders. It transforms complex data into understandable visual stories, making analysis more accessible and actionable.",
            level: "Beginner"
        },
        {
            question: "How do you create basic plots with matplotlib?",
            answer: "Use `plt.plot()` for line plots, `plt.scatter()` for scatter plots, `plt.bar()` for bar charts, `plt.hist()` for histograms. Add labels with `plt.xlabel()`, `plt.ylabel()`, `plt.title()`. Customize with colors, markers, and styles. Use `plt.show()` to display and `plt.savefig()` to save plots.",
            level: "Beginner"
        },
        {
            question: "What are the basic data types in pandas?",
            answer: "Pandas main data types include: object (strings/mixed), int64 (integers), float64 (decimals), bool (boolean), datetime64 (dates/times), category (categorical data), and timedelta (time differences). Use `df.dtypes` to check types and `astype()` to convert between types for proper analysis.",
            level: "Beginner"
        },

        // Intermediate Level
        {
            question: "How do you perform group-by operations effectively in pandas?",
            answer: "Use `df.groupby()` with column names or functions, then apply aggregation methods like `sum()`, `mean()`, `count()`, or `agg()` for multiple functions. Use `transform()` for element-wise operations, `apply()` for custom functions, and `filter()` for conditional grouping. Reset index if needed for further analysis.",
            level: "Intermediate"
        },
        {
            question: "What are pivot tables and how do you create them in pandas?",
            answer: "Pivot tables reshape data by grouping and aggregating. Use `pd.pivot_table()` with parameters: data (DataFrame), values (columns to aggregate), index (row grouping), columns (column grouping), aggfunc (aggregation function), and fill_value (for missing data). They're excellent for cross-tabulation and summary analysis.",
            level: "Intermediate"
        },
        {
            question: "How do you merge and join DataFrames in pandas?",
            answer: "Use `pd.merge()` for SQL-style joins with 'left', 'right', 'outer', 'inner' options. Use `df.join()` for index-based joining. `pd.concat()` for concatenating along axes. Specify keys with 'on', 'left_on', 'right_on' parameters. Handle overlapping columns with suffixes. Choose method based on relationship between datasets.",
            level: "Intermediate"
        },
        {
            question: "What's the difference between apply(), map(), and applymap() in pandas?",
            answer: "`apply()` works on Series/DataFrame rows or columns, `map()` works element-wise on Series for value mapping/transformation, `applymap()` works element-wise on entire DataFrame. Use `map()` for simple transformations, `apply()` for complex operations, and `applymap()` for element-wise DataFrame operations.",
            level: "Intermediate"
        },
        {
            question: "How do you handle time series data in pandas?",
            answer: "Convert to datetime with `pd.to_datetime()`, set as index with `set_index()`, use datetime indexing for slicing, resample with `resample()` for aggregation, handle time zones with `tz_localize()` and `tz_convert()`, and use time-based operations like `shift()`, `rolling()`, and `expanding()` for analysis.",
            level: "Intermediate"
        },
        {
            question: "What are the key principles of effective data visualization?",
            answer: "Key principles include: choose appropriate chart types for data, maintain clarity and simplicity, use consistent color schemes, provide clear labels and titles, avoid misleading scales, consider your audience, highlight key insights, use white space effectively, and ensure accessibility. Follow the principle of maximizing data-ink ratio.",
            level: "Intermediate"
        },
        {
            question: "How do you perform statistical analysis in Python?",
            answer: "Use scipy.stats for statistical tests, numpy for basic statistics, pandas for descriptive statistics, and statsmodels for advanced modeling. Common operations: `describe()` for summary statistics, `corr()` for correlations, `scipy.stats.ttest_1samp()` for t-tests, and `scipy.stats.chi2_contingency()` for chi-square tests.",
            level: "Intermediate"
        },
        {
            question: "What's feature engineering and why is it important?",
            answer: "Feature engineering creates new variables from existing data to improve model performance. Techniques include: scaling/normalization, encoding categorical variables, creating interaction terms, polynomial features, binning continuous variables, and extracting date components. It often has more impact on model performance than algorithm choice.",
            level: "Intermediate"
        },
        {
            question: "How do you handle categorical data in machine learning?",
            answer: "Methods include: Label Encoding for ordinal data, One-Hot Encoding for nominal data with few categories, Target Encoding for high cardinality, Binary Encoding for memory efficiency, and Frequency Encoding based on category occurrence. Use pandas `get_dummies()` or sklearn's `LabelEncoder` and `OneHotEncoder`.",
            level: "Intermediate"
        },
        {
            question: "What are common data quality issues and how do you address them?",
            answer: "Common issues: missing values (imputation/removal), duplicates (drop_duplicates), outliers (statistical methods/domain knowledge), inconsistent formats (standardization), incorrect data types (conversion), and invalid values (validation rules). Always profile data first and document cleaning decisions.",
            level: "Intermediate"
        },

        // Advanced Level
        {
            question: "How do you optimize pandas operations for large datasets?",
            answer: "Optimization strategies include: use appropriate data types (category, int32 vs int64), chunk processing with `chunksize`, vectorized operations instead of loops, query() for efficient filtering, eval() for complex expressions, avoid repeated DataFrame creation, use inplace operations when possible, and consider alternatives like Dask for truly large datasets.",
            level: "Advanced"
        },
        {
            question: "What are advanced machine learning evaluation techniques?",
            answer: "Advanced techniques include: cross-validation strategies (k-fold, stratified, time series), learning curves for bias-variance analysis, ROC curves and AUC for classification, precision-recall curves for imbalanced data, feature importance analysis, model interpretation with SHAP/LIME, A/B testing for model comparison, and statistical significance testing.",
            level: "Advanced"
        },
        {
            question: "How do you handle imbalanced datasets in machine learning?",
            answer: "Techniques include: resampling methods (SMOTE, undersampling, oversampling), cost-sensitive learning, ensemble methods, anomaly detection approaches, different evaluation metrics (precision, recall, F1-score, AUC-ROC), threshold tuning, and stratified sampling. Choose based on problem type and available data.",
            level: "Advanced"
        },
        {
            question: "What's the difference between supervised and unsupervised learning?",
            answer: "Supervised learning uses labeled data for prediction tasks (classification/regression) with algorithms like linear regression, decision trees. Unsupervised learning finds patterns in unlabeled data through clustering, dimensionality reduction, association rules. Semi-supervised combines both. Choose based on available labels and problem objectives.",
            level: "Advanced"
        },
        {
            question: "How do you implement dimensionality reduction techniques?",
            answer: "Common techniques: PCA for linear reduction, t-SNE for visualization, UMAP for non-linear reduction, LDA for supervised reduction, feature selection methods (univariate, recursive elimination), and manifold learning. Use sklearn implementations with proper scaling and evaluation of explained variance or reconstruction error.",
            level: "Advanced"
        },
        {
            question: "What are ensemble methods and when should you use them?",
            answer: "Ensemble methods combine multiple models: Bagging (Random Forest) reduces variance, Boosting (XGBoost, AdaBoost) reduces bias, Voting combines different algorithms, Stacking uses meta-learner. Use when single models underperform, you have diverse algorithms, need robust predictions, or want to reduce overfitting.",
            level: "Advanced"
        },
        {
            question: "How do you design and implement ETL pipelines in Python?",
            answer: "ETL design involves: Extract (APIs, databases, files), Transform (cleaning, aggregation, validation), Load (databases, data warehouses). Use tools like Apache Airflow for orchestration, pandas for processing, sqlalchemy for database connections, and implement error handling, logging, monitoring, and data quality checks throughout.",
            level: "Advanced"
        },
        {
            question: "What are the best practices for reproducible data analysis?",
            answer: "Best practices include: version control with Git, virtual environments, requirements.txt for dependencies, seed setting for random operations, documentation and comments, modular code structure, data versioning, automated testing, clear project structure, and notebook guidelines. Use tools like DVC for data versioning.",
            level: "Advanced"
        },
        {
            question: "How do you scale Python analytics to big data?",
            answer: "Scaling strategies: Dask for parallel computing, PySpark for distributed processing, chunking large files, optimized data formats (Parquet, HDF5), cloud services (AWS EMR, Google Dataflow), database push-down operations, streaming analytics, and efficient algorithms. Choose based on data size and computational requirements.",
            level: "Advanced"
        },
        {
            question: "What are key considerations for deploying ML models in production?",
            answer: "Production considerations include: model versioning and governance, API development (Flask/FastAPI), containerization (Docker), monitoring and alerting, A/B testing frameworks, data drift detection, model retraining pipelines, scalability and performance optimization, security and compliance, and rollback strategies. Use MLOps tools for orchestration.",
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
                    <p className="text-gray-600">Please log in to access the Python Data Analytics course.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/courses"
                                className="flex items-center text-gray-700 hover:text-green-600 transition-all duration-300 group"
                            >
                                <div className="p-2 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors duration-300">
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
                                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-3">
                {/* Course Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-lg p-4 text-white mb-4 shadow-lg">
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
                                        <h1 className="text-lg font-bold mb-1">Python for Data Analytics</h1>
                                        <p className="text-green-100 text-sm">Master data science with Python's powerful ecosystem</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                                        <BookOpen className="w-3 h-3 mr-1" />
                                        <span className="font-medium text-xs">85+ Topics</span>
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
                                    <div className="text-xs text-green-100">Complete</div>
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
                    <div className="mb-12 bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Your Progress</h3>
                            <span className="text-2xl font-bold text-green-600">{getProgressPercentage()}%</span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-4">
                            <div
                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500"
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
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                                    : 'bg-white text-green-600 hover:bg-green-50 border border-green-200'
                                }`}
                        >
                            Course Content
                        </button>
                        <button
                            onClick={() => setShowQA(true)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${showQA
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                                    : 'bg-white text-green-600 hover:bg-green-50 border border-green-200'
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
                                    className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
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
                                        <p className="text-green-100 font-medium mb-2">{module.title}</p>
                                        <p className="text-green-200 text-sm mb-3">{module.description}</p>
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
                                                                : 'bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-200'
                                                            }`}
                                                        onClick={() => toggleTopic(topicId)}
                                                    >
                                                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${isCompleted
                                                                ? 'bg-green-500 border-green-500'
                                                                : 'border-gray-300 hover:border-green-400'
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
                        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-center">
                                <h2 className="text-3xl font-bold text-white mb-2">Python Data Analytics Q&A</h2>
                                <p className="text-green-100">Comprehensive questions and answers for mastering data analytics</p>
                            </div>
                            <div className="p-8">
                                <div className="mb-8 flex flex-wrap gap-4 justify-center">
                                    {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                        <button
                                            key={level}
                                            className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-200"
                                        >
                                            {level} {level !== 'All' && `(${courseQAs.filter(qa => qa.level === level).length})`}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    {courseQAs.map((qa, index) => (
                                        <div key={index} className="border border-green-100 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
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
                                                <strong className="text-green-600">Answer:</strong> {qa.answer}
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

export default PythonDataAnalyticsCourse;