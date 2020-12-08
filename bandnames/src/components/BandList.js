import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
  const [bands, setBands] = useState([]);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });

    return () => socket.off("current-bands");
  }, [socket]);

  const handleNameChange = (e, id) => {
    const newName = e.target.value;
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const onLostFocus = (id, name) =>
    socket.emit("change-band-name", { id, name });

  const vote = (id) => {
    socket.emit("vote-band", id);
  };

  const deleteBand = (id) => {
    socket.emit("delete-band", id);
  };

  const createRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="ml-4">
              <button
                onClick={() => vote(band.id)}
                className="text-sm font-medium text-gray-900"
              >
                +1
              </button>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="text"
            value={band.name}
            onChange={(e) => handleNameChange(e, band.id)}
            onBlur={() => onLostFocus(band.id, band.name)}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {band.votes}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <button className="btn-danger" onClick={() => deleteBand(band.id)}>
            Delete
          </button>
        </td>
        {/* <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
        </td> */}
      </tr>
    ));
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    ></th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Votos
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {createRows()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
