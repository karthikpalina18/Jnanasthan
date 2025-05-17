import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { languageOptions } from './Judge0Config';
// import './Compiler.css';

const Compiler = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [languageId, setLanguageId] = useState(71); // Default Python
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lineCount, setLineCount] = useState(20);
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [favorites, setFavorites] = useState([]);
  
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  
  // Update line numbers when code changes
  useEffect(() => {
    const lines = code.split('\n').length;
    const count = Math.max(20, lines + 5); // Always show at least 20 lines
    setLineCount(count);
  }, [code]);

  // Auto-pair brackets, braces, and parentheses
  const handleKeyDown = (e) => {
    const pairings = {
      '{': '}',
      '[': ']',
      '(': ')',
      '"': '"',
      "'": "'"
    }
    
    ;


        // Check if `Enter` key is pressed
        if (e.key === 'Enter') {
          const lastChar = input[input.length - 1];
    
          // If the last character is ":" or "{", add a tab space (4 spaces as a tab)
          if (lastChar === ':' || lastChar === '{') {
            e.preventDefault(); // Prevent default Enter behavior (new line)
            setInput(input + '    '); // Add 4 spaces as a tab
          }
        }

    
    // Insert paired brackets/quotes
    if (pairings[e.key]) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      
      const newText = code.substring(0, start) + e.key + pairings[e.key] + code.substring(end);
      setCode(newText);
      
      // Place cursor between the brackets
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1;
      }, 0);
      return;
    }
    
    // Handle tab key to insert spaces instead of changing focus
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      
      // Insert 2 spaces for tab
      const newText = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newText);
      
      // Move cursor after inserted tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };
  

  const handleCompile = async () => {
    setIsLoading(true);
    try {
      const { data: submitRes } = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
        {
          source_code: code,
          stdin: input,
          language_id: languageId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'x-rapidapi-key': 'fcbe5e3a4emsh64fe7c9718ffe46p1e35cejsn8d4add47464e', // Replace this
          },
        }
      );

      setOutput(
        submitRes.stdout
          || submitRes.compile_output
          || submitRes.stderr
          || 'No output.'
      );
      
    } catch (err) {
      setOutput('Error: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const addToFavorites = () => {
    const currentLanguage = languageOptions.find(lang => lang.id === languageId);
    if (currentLanguage && code.trim()) {
      const newFavorite = {
        id: Date.now(),
        language: currentLanguage.name,
        languageId: languageId,
        code: code,
        title: `${currentLanguage.name} snippet ${favorites.length + 1}`
      };
      setFavorites([...favorites, newFavorite]);
    }
  };

  const loadFavorite = (favorite) => {
    setCode(favorite.code);
    setLanguageId(favorite.languageId);
  };

  // Theme-dependent styling
// Background of main content area
const themeBg = theme === 'dark' ? 'bg-gray-900' : 'bg-white'; // dark: almost black, light: pure white

// Primary text color
const themeText = theme === 'dark' ? 'text-gray-100' : 'text-gray-800'; // dark: very light text, light: dark text

// Header background
const themeHeaderBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'; // dark: deep gray, light: light gray

// Header text color
const themeHeader = theme === 'dark' ? 'text-gray-200' : 'text-gray-700'; // dark: light gray, light: mid-dark gray

// Border color (e.g., around cards or sections)
const themeBorderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300'; // dark: soft border, light: subtle gray

// Background of line numbers (e.g., code editors)
const themeLineNumbersBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'; // dark: deep gray, light: very light gray

// Text color for line numbers
const themeLineNumbersText = theme === 'dark' ? 'text-gray-500' : 'text-gray-400'; // both: muted grays

// Input field background
const themeInputBg = theme === 'dark' ? 'bg-gray-50' : 'bg-gray-800'; // dark: deep gray, light: slightly off-white

// Background for panels or side sections
const themePanelBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'; // dark: deep gray, light: light gray

  
  return (
    <div className={`min-h-screen ${themeBg} ${themeText} transition-colors duration-200`}>
      <div className="max-w-full mx-auto overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${theme === 'dark' ? 'from-blue-900 to-indigo-900' : 'from-blue-500 to-indigo-600'} px-6 py-4 flex justify-between items-center`}>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Pro Code Compiler
          </h2>
          <div className="flex space-x-4">
            <button 
              onClick={toggleTheme}
              className="flex items-center bg-opacity-20 bg-white rounded-md px-3 py-1 text-sm text-white"
            >
              {theme === 'dark' ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Light Mode
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  Dark Mode
                </>
              )}
            </button>
            {/* <button 
                onClick={() => setIsDark(!isDark)} 
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-lg hover:shadow-md transition-all duration-300"
                aria-label="Toggle dark mode"
              >
                {isDark ? "🌞" : "🌙"}
              </button> */}
            <button 
              onClick={addToFavorites}
              className="flex items-center bg-opacity-20 bg-white rounded-md px-3 py-1 text-sm text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save Snippet
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row h-screen">
          {/* Left Side - Code Editor (2/3 width) */}
          <div className="lg:w-2/3 flex flex-col">
            <div className="p-4 flex items-center justify-between">
              <div className="relative inline-block w-64">
                <select
                  onChange={(e) => setLanguageId(Number(e.target.value))}
                  className={`block appearance-none w-full ${themeBg} border ${themeBorderColor} px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  {languageOptions.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              
              <button
                onClick={handleCompile}
                disabled={isLoading}
                className={`flex items-center px-4 py-2 rounded-lg shadow-md text-white ${
                  isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors duration-200`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Compiling...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Run Code
                  </>
                )}
              </button>
            </div>

            <div className={`flex-grow mx-4 mb-4 border ${themeBorderColor} rounded-lg overflow-hidden`} style={{ minHeight: "calc(100vh - 180px)" }}>
              <div className={`flex items-center justify-between px-4 py-2 ${themeHeaderBg}`}>
                <span className={`text-xs ${themeHeader} font-medium`}>Code Editor</span>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="flex w-full h-full overflow-hidden" style={{ minHeight: "calc(100vh - 230px)" }}>
                <div 
                  ref={lineNumbersRef}
                  className={`${themeLineNumbersBg} text-right p-2 pt-4 ${themeLineNumbersText} font-mono text-sm select-none overflow-hidden`}
                  style={{ width: '50px' }}
                >
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i} className="pr-2 leading-relaxed">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <textarea
                  ref={textareaRef}
                  className={`w-full h-full p-4 pt-4 ${themeBg} ${themeText} font-mono text-sm resize-none focus:outline-none border-l ${themeBorderColor}`}
                  placeholder="Write your code here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onScroll={(e) => {
                    // Keep line numbers in sync with textarea scroll
                    if (lineNumbersRef.current) {
                      lineNumbersRef.current.scrollTop = e.target.scrollTop;
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  style={{ minHeight: "calc(100vh - 230px)" }}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Side - Inputs, Output & Favorites (1/3 width) */}
          <div className={`lg:w-1/3 border-l ${themeBorderColor} flex flex-col`}>
            {/* Tabs for Input/Output/Favorites */}
            <div className={`border-b ${themeBorderColor}`}>
              <nav className="flex">
                <button className={`px-4 py-2 font-medium text-sm ${themeHeader} border-b-2 border-blue-600`}>
                  I/O Console
                </button>
                <button className={`px-4 py-2 font-medium text-sm ${themeHeader === 'text-gray-200' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Favorites
                </button>
              </nav>
            </div>
            
            {/* Input Console */}
            <div className={`flex-1 flex flex-col p-4 ${themePanelBg} overflow-hidden`}>
              <div className="mb-4">
                <h3 className={`text-sm font-medium mb-2 ${themeHeader}`}>Input (stdin)</h3>
                <textarea
                  className={`w-full p-3 ${themeInputBg} ${themeText} font-mono text-sm rounded-md border ${themeBorderColor} resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter input values here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{ height: "30vh" }}
                ></textarea>
              </div>

              {/* Output Console */}
              <div className="flex-1 overflow-hidden">
                <h3 className={`text-sm font-medium mb-2 ${themeHeader} flex items-center justify-between`}>
                  <span>Output</span>
                  {isLoading && (
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                      <span className="text-xs text-gray-500">Processing...</span>
                    </div>
                  )}
                </h3>
                <div 
                  className={`h-full ${themeInputBg} ${themeText} font-mono text-sm p-3 rounded-md border ${themeBorderColor} overflow-y-auto whitespace-pre-wrap`}
                  style={{ height: "40vh" }}
                >
                  {output || 'Output will appear here...'}
                </div>
              </div>
            </div>

            {/* Favorites (hidden by default) */}
            <div className="hidden">
              <div className="p-4">
                <h3 className={`text-sm font-medium mb-2 ${themeHeader}`}>Saved Code Snippets</h3>
                {favorites.length === 0 ? (
                  <p className="text-gray-500 text-sm">No saved snippets yet. Save your code to access it quickly later.</p>
                ) : (
                  <ul className="space-y-2">
                    {favorites.map(favorite => (
                      <li 
                        key={favorite.id} 
                        className={`p-2 rounded-md border ${themeBorderColor} cursor-pointer hover:bg-opacity-50 hover:bg-blue-100`}
                        onClick={() => loadFavorite(favorite)}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">{favorite.title}</span>
                          <span className="text-xs text-gray-500">{favorite.language}</span>
                        </div>
                        <p className="text-xs truncate">{favorite.code.substring(0, 50)}...</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;