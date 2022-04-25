import './App.css';
import { Greetings } from './components/Greetings';
import { Configuration } from './components/Configuration';
import { QueryClient, QueryClientProvider } from 'react-query'
 
const queryClient = new QueryClient()

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <QueryClientProvider client={queryClient}>
          <Greetings date={new Date()}/>
          <Configuration />
        </QueryClientProvider>
      </header>
    </div>
  );
}

export default App;
