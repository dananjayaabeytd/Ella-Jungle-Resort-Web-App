import BackgroundText from "./residence-home-component/BackgroundText";
import RoomCard from "./residence-home-component/RoomCard";

function ResidenceHome() {
    return (
      <div>
        <BackgroundText/>
        <div class="my-4 flex justify-between mx-40">
        <RoomCard
          imageUrl="https://wallup.net/wp-content/uploads/2016/05/24/306644-nature.jpg"
          Title="Room 1"
          Description="This is a room"
        />
        <RoomCard
          imageUrl="https://wallup.net/wp-content/uploads/2016/05/24/306644-nature.jpg"
          Title="Room 1"
          Description="This is a room"
        />
        <RoomCard
          imageUrl="https://wallup.net/wp-content/uploads/2016/05/24/306644-nature.jpg"
          Title="Room 1"
          Description="This is a room"
        />
        </div>
      </div>
    );
  }
  
  export default ResidenceHome;
  