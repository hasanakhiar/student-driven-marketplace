import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const defaultCenter = {
  lat: 23.8103, // Default to a central location
  lng: 90.4125
};

const MeetupMap = ({ onLocationSelect }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchNearbyLocations(longitude, latitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          fetchAllLocations();
        }
      );
    } else {
      fetchAllLocations();
    }
  }, []);

  const fetchNearbyLocations = async (longitude, latitude) => {
    try {
      const response = await axios.get(`/api/meetup-locations/nearby`, {
        params: { longitude, latitude }
      });
      setLocations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching nearby locations:', error);
      fetchAllLocations();
    }
  };

  const fetchAllLocations = async () => {
    try {
      const response = await axios.get('/api/meetup-locations');
      setLocations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLoading(false);
    }
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading map...</div>;
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || defaultCenter}
        zoom={15}
      >
        {/* User's location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }}
          />
        )}

        {/* Meetup location markers */}
        {locations.map((location) => (
          <Marker
            key={location._id}
            position={{
              lat: location.location.coordinates[1],
              lng: location.location.coordinates[0]
            }}
            onClick={() => handleMarkerClick(location)}
          />
        ))}

        {/* Info window for selected location */}
        {selectedLocation && (
          <InfoWindow
            position={{
              lat: selectedLocation.location.coordinates[1],
              lng: selectedLocation.location.coordinates[0]
            }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div className="p-2">
              <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
              <p className="text-sm text-gray-600">{selectedLocation.description}</p>
              <div className="mt-2">
                <h4 className="font-semibold">Safety Features:</h4>
                <ul className="list-disc list-inside">
                  {selectedLocation.safetyFeatures.map((feature, index) => (
                    <li key={index} className="text-sm">
                      {feature.replace('_', ' ')}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <p className="text-sm">
                  Hours: {selectedLocation.operatingHours.open} - {selectedLocation.operatingHours.close}
                </p>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MeetupMap; 