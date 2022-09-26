import ConnectModal from "./components/ConnectModal";
import "./styles/index.scss";

function App() {
  return (
    <div>
      <div className="app-header">
        <ConnectModal />
      </div>
      <div className="posts-container"></div>
    </div>
  );
}

export default App;
