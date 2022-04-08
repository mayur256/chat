// Root Router 
import { HashRouter as Router } from "react-router-dom";

// Router Component
import AppRouter from './router/AppRouter';

// Styles
import './App.css';

function App() {
  return (
		<div>
			<div className="container-fluid h-100">
				<div className="row justify-content-center">
					<Router>
						<AppRouter />
					</Router>
				</div>
			</div>
		</div>
  );
}

export default App;
