import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import GlobalStyle from './GLobalStyle';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalStyle />
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
