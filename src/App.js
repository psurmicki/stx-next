import './styles/App.css';
import Header from './jsx/Header.jsx';
import DataManageComponent from './jsx/DataManageComponent.jsx';
import Store from './store.jsx';

function App() {
  return (
    <Store>
      <div className="App App-backgroundImage">
        <Header />
        <div className="App-body ">
          <DataManageComponent />
        </div>
      </div>
    </Store>
  );
}

export default App;
