import { useContext } from "react";
import { BandAdd } from "../components/BandAdd";
import { BandChart } from "../components/BandChart";
import { BandList } from "../components/BandList";
import { SocketContext } from "../context/SocketContext";

function HomePage() {
  const { online } = useContext(SocketContext);

  return (
    <div className="md:container md:mx-auto p-8">
      <div className="alert">
        <p>
          Service Status:
          {online ? (
            <span className="text-green-500">Online</span>
          ) : (
            <span className="text-red-600">Offline</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>


      <hr />

      <div className="flex flex-row">
        <div>
            <BandChart />
        </div>
      </div>

      <div className="flex flex-col md: flex-row">
        <div>
          <BandList />
        </div>

        <div>
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
