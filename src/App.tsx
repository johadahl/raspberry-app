import './App.css';
import { Greetings } from './components/Greetings';
import { Configuration } from './components/Configuration';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Greetings date={new Date()}/>
        <Configuration />
      </header>
    </div>
  );
}

export default App;
