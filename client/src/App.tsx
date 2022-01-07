// Layouts
import ContactsList from './components/layouts/ContactsList';
import MessageArea from './components/layouts/MessageArea';

// Styles
import './App.css';

function App() {
  return (
		<div>
			<div className="container-fluid h-100">
				<div className="row justify-content-center">
					{/** Contacts List */}
					<ContactsList />

					{/** Chat Message Area */}
					<MessageArea />
				</div>
			</div>
		</div>
  );
}

export default App;
