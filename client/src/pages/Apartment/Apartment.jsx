import { useState } from "react";
import RoomCard from "../../components/Card/RoomCard";
import Container from "../../components/ui/Container";

const Apartment = () => {
  const [rooms, setRooms] = useState([]);

  fetch("rooms.json")
    .then((res) => res.json())
    .then((data) => {
      setRooms(data);
    });

  return (
    <div className="mt-20">
      <Container>
        <div className="grid grid-cols-3 gap-5">
          {rooms.map((room, idx) => (
            <RoomCard key={idx} room={room} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Apartment;
