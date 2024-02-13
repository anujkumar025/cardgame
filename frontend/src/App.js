import Home from "./components/Home";
import Header from "./components/Header";
import {Provider} from 'react-redux';
import store from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header/>
        <Home/>
      </div>
    </Provider>
  );
}

export default App;
