import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import TodoApp from './components/TodoApp';
import DataFetcher from './components/DataFetcher';
import { formatData, doStuff, incrementCounter, logAndReturn } from './utils/helpers';
import './App.css';

// Bad: No proper interface, using any
interface AppProps {
  data?: any;
}

// Bad: Not using React.FC properly
const App = (props: any) => {
  // Bad: Too many state variables, poor naming
  const [currentTab, setCurrentTab] = useState('users');
  const [appData, setAppData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [userCount, setUserCount] = useState(0);

  // Bad: useEffect without proper dependencies
  useEffect(() => {
    console.log('App mounted'); // Bad: Console.log in production
    
    // Bad: Side effect without cleanup
    document.title = 'Review Tutorial App';
    
    // Bad: Setting state immediately after mount without considering race conditions
    setAppData({
      version: '1.0.0',
      initialized: true,
      timestamp: new Date()
    });
    
    // Bad: Global variable mutation
    incrementCounter();
  }, []); // Bad: Missing dependencies

  // Bad: Another useEffect that could be combined
  useEffect(() => {
    // Bad: No cleanup for interval
    const interval = setInterval(() => {
      setUserCount(prev => prev + 1);
    }, 5000); // Bad: Magic number
  }, []);

  // Bad: Function recreated on every render
  const handleTabChange = (tab: string) => {
    console.log('Changing tab to:', tab); // Bad: Console.log
    setCurrentTab(tab);
    
    // Bad: Direct DOM manipulation in React
    const element = document.getElementById('app-container');
    if (element) {
      element.style.backgroundColor = tab === 'users' ? '#f0f0f0' : '#ffffff';
    }
  };

  // Bad: Complex calculation in render without memoization
  const expensiveCalculation = () => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) { // Bad: Expensive operation on every render
      result += i;
    }
    return result;
  };

  // Bad: Inline object creation
  const tabStyle = {
    padding: '10px 20px',
    margin: '0 5px',
    border: '1px solid #ccc',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    borderRadius: '4px'
  };

  // Bad: Inline conditional logic
  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  // Bad: No error boundary to catch component errors
  const renderCurrentTab = () => {
    // Bad: Switch statement could be cleaner
    switch (currentTab) {
      case 'users':
        return <UserList userData={appData} onUserSelect={(user: any) => {
          console.log('User selected:', user); // Bad: Console.log
          logAndReturn(user); // Bad: Side effect in render
        }} />;
      case 'todos':
        return <TodoApp />;
      case 'data':
        return <DataFetcher />;
      default:
        return <div>Unknown tab</div>; // Bad: No proper error handling
    }
  };

  // Bad: Not handling when isVisible is false properly
  if (!isVisible) {
    return null;
  }

  return (
    <div id="app-container" style={{minHeight: '100vh', fontFamily: 'Arial, sans-serif'}}> {/* Bad: Inline styles */}
      {/* Bad: Missing semantic HTML elements */}
      <div style={{backgroundColor: '#343a40', color: 'white', padding: '20px'}}>
        <h1 style={{margin: 0}}>Code Review Tutorial App</h1>
        <p style={{margin: '10px 0 0 0'}}>
          Version: {appData?.version || 'Unknown'} | 
          Users viewed: {userCount} | 
          Expensive calc: {expensiveCalculation()} {/* Bad: Expensive calculation in render */}
        </p>
      </div>

      {/* Bad: Not using semantic nav element */}
      <div style={{backgroundColor: '#f8f9fa', padding: '20px', borderBottom: '1px solid #dee2e6'}}>
        {/* Bad: Missing key props and not using proper button elements */}
        {['users', 'todos', 'data'].map((tab) => (
          <span
            onClick={() => handleTabChange(tab)}
            style={currentTab === tab ? activeTabStyle : tabStyle}
            // Bad: Missing accessibility attributes
          >
            {/* Bad: Hardcoded text, no internationalization */}
            {tab === 'users' ? 'User Management' : 
             tab === 'todos' ? 'Todo Application' : 
             'Data Fetching'} {/* Bad: Nested ternary operators */}
          </span>
        ))}
        
        {/* Bad: Inline event handler creating new function */}
        <button 
          onClick={() => setIsVisible(!isVisible)}
          style={{
            float: 'right', // Bad: Using float for layout
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Toggle Visibility
        </button>
      </div>

      {/* Bad: Direct style manipulation, no CSS classes */}
      <div style={{padding: '20px'}}>
        {renderCurrentTab()}
      </div>

      {/* Bad: Footer with poor styling and no semantic HTML */}
      <div style={{
        backgroundColor: '#6c757d',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        marginTop: '50px'
      }}>
        <p style={{margin: 0}}>
          © 2024 Review Tutorial App. 
          {/* Bad: Hardcoded year, should be dynamic */}
          Built with {doStuff(1, 2)} components. {/* Bad: Unclear utility function usage */}
        </p>
      </div>
    </div>
  );
};

export default App;
