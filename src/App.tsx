import {Provider} from "./core/Provider";
import Form from "./features/form/Form";
import Table from "./features/table/Table";
import './App.scss';

function App() {
  return (
      <Provider>
        <div className="container">
          <Form/>
          <Table/>
        </div>
      </Provider>
  );
}

export default App;
