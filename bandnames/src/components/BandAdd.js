import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const [value, setValue] = useState("");

  const { socket } = useContext(SocketContext);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    console.log(value);

    if (value.trim().length > 0) {
      socket.emit("new-band", { name: value });
      setValue("");
    }
  };

  return (
    <>
      <h3>Add Band</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="Add a new band name"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
        />
      </form>
    </>
  );
};
