import { useState } from "react";
import Container from "../../components/ui/Container";
import EmptyStateMain from "../../components/EmptyState/EmptyStateMain";
import RoomCard from "../../components/Card/RoomCard/RoomCard";

const Apartment = () => {
  const [rooms, setRooms] = useState([]);

  fetch("rooms.json")
    .then((res) => res.json())
    .then((data) => {
      setRooms(data);
    });

  return (
    <div>
      <EmptyStateMain title="Apartments" pathname="Home" />
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
          {rooms.map((room, idx) => (
            <RoomCard key={idx} room={room} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Apartment;

// https://themecraze.net/html/alexis/assets/images/background/breadcrumb-bg.png
