import { useState, useEffect } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import UpdateBanner from "./component/UpdateBanner/UpdateBanner";
import "./App.css";
import Calculator from "./component/Calculator/Calculator";

function App() {
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: (registration) => {
        setWaitingWorker(registration.waiting);
        setShowUpdateBanner(true);
      },
    });
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      waitingWorker.addEventListener("statechange", (event) => {
        if (event.target.state === "activated") {
          window.location.reload();
        }
      });
    }
  };

  return (
    <div className="App">
      <Calculator />
      {showUpdateBanner && <UpdateBanner onUpdate={handleUpdate} />}
    </div>
  );
}

export default App;
