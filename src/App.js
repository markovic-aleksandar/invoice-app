import { useAppContext } from './context';

const App = () => {
  console.log(useAppContext());

  return <h1>Invoice App</h1>
}

export default App;