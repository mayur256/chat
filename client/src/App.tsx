// Layouts
import Login from './components/layouts/Login';
import Home from './components/layouts/Home';

// React-router library
import {
	HashRouter as Router,
	Routes,
	Route
} from "react-router-dom"

// Styles
import './App.css';

function App() {
  return (
		<div>
			<div className="container-fluid h-100">
				<div className="row justify-content-center">
					<Router>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="login" element={<Login />} />
						</Routes>
					</Router>
				</div>
			</div>
		</div>
  );
}

export default App;
