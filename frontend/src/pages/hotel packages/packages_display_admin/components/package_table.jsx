import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UpdatePackage } from '../../update packages/components/updatePackage';
import { Card, CardBody, Button, Dialog, Input } from '@material-tailwind/react'; // Import Dialog and Input components from Material Tailwind

export function BookingCardsContainer() {
  const [allPackages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const fetchPackages = async () => {
    try {
      const packagesResponse = await axios.get("http://localhost:8081/hotel_packages/");
      const roomsResponse = await axios.get("http://localhost:8081/Rooms/rooms");
      const activitiesResponse = await axios.get("http://localhost:8081/SpecialActivity");
      const spasResponse = await axios.get("http://localhost:8081/spapackages");

      const packages = packagesResponse.data;
      const rooms = roomsResponse.data.reduce((acc, room) => ({ ...acc, [room._id]: room.roomName }), {});
      const activities = activitiesResponse.data.reduce((acc, activity) => ({ ...acc, [activity._id]: activity.name }), {});
      const spas = spasResponse.data.reduce((acc, spa) => ({ ...acc, [spa._id]: spa.spaPackageName }), {});

      const updatedPackages = packages.map(pack => ({
        ...pack,
        room_name: rooms[pack.room_id],
        SActivity_name: activities[pack.SActivity_id],
        spa_name: spas[pack.spa_id],
      }));

      setPackages(updatedPackages);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleUpdatePackages = () => {
    fetchPackages(); // Updated to fetch packages after update
  };

  const handleDeleteClick = (pack) => {
    setSelectedPackage(pack);
    setShowDeleteForm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8081/hotel_packages/delete/${selectedPackage._id}`);
      fetchPackages(); // Refresh packages after delete
      setSelectedPackage(null);
      setShowDeleteForm(false);
      alert("Package deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allPackages.map((pack) => (
          <Card key={pack._id} className="flex flex-col h-full">
            <CardBody>
              <h2 className="text-lg font-semibold mb-2">{pack.package_name}</h2>
              <p className="text-sm text-gray-500 mb-4">{pack.package_des}</p>
              <p className="text-sm text-gray-500 mb-2">Room: {pack.room_name}</p>
              <p className="text-sm text-gray-500 mb-2">Activity: {pack.SActivity_name}</p>
              <p className="text-sm text-gray-500 mb-2">Spa: {pack.spa_name}</p>
              <p className="text-sm text-gray-500">Price: {pack.price}</p>
            </CardBody>
            <div className="mt-auto flex justify-between px-4 py-2">
              <Button onClick={() => handleDeleteClick(pack)} color="lightGreen" size="sm">Delete</Button>
              <UpdatePackage
                packageId={pack._id}
                package_name={pack.package_name}
                room_name={pack.room_name}
                SActivity_name={pack.SActivity_name}
                spa_name={pack.spa_name}
                package_des={pack.package_des}
                price={pack.price}
                onUpdatePackages={handleUpdatePackages}
              />
            </div>
          </Card>
        ))}
      </div>
      <Dialog size="xs" open={showDeleteForm} onClose={() => setShowDeleteForm(false)}>
        <div className="p-8">
          <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
          {selectedPackage && (
            <div className="mb-4">
              <p>Package Name: {selectedPackage.package_name}</p>
              <p>Room: {selectedPackage.room_name}</p>
              <p>Activity: {selectedPackage.SActivity_name}</p>
              <p>Spa: {selectedPackage.spa_name}</p>
              <p>Description: {selectedPackage.package_des}</p>
              <p>Price: {selectedPackage.price}</p>
            </div>
          )}
          <div className="flex justify-between">
            <Button onClick={handleDeleteConfirm} color="lightGreen">Confirm Delete</Button>
            <Button onClick={() => setShowDeleteForm(false)} color="lightGreen">Cancel</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
