// Root Router 
import { HashRouter as Router } from "react-router-dom";

// Router Component
import AppRouter from './router/AppRouter';

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

// Styles
import './App.css';

function App() {
	return (
		<Provider store={store}>
			<div className="container-fluid h-100">
				<div className="row justify-content-center">
					<Router>
						<AppRouter />
					</Router>
				</div>
			</div>
		</Provider>
	);
}

export default App;
