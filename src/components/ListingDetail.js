import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample listing data (in a real app, this would come from an API)
  const listing = {
    id: parseInt(id),
    title: 'Calculus Textbook',
    price: 45,
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: '1', // Textbooks
    description: 'Like new condition, used for one semester',
    seller: {
      name: 'John Doe',
      university: 'University of Technology',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
    },
    condition: 'Like New',
    postedDate: '2024-03-15',
    location: 'Main Campus'
  };

  const handleBack = () => {
    // Get the previous filters from sessionStorage
    const previousFilters = sessionStorage.getItem('previousFilters');
    if (previousFilters) {
      // If we have previous filters, navigate back to the filtered view
      navigate('/', { state: { filters: JSON.parse(previousFilters) } });
    } else {
      // If no previous filters, just go back
      navigate(-1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={handleBack}
        className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Listings
      </button>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div>
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Details Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{listing.title}</h1>
            <div className="flex items-center mb-6">
              <img
                src={listing.seller.avatar}
                alt={listing.seller.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-lg font-medium text-gray-900">{listing.seller.name}</p>
                <p className="text-sm text-gray-500">{listing.seller.university}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-indigo-600">${listing.price}</h2>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{listing.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Condition</h3>
                  <p className="text-gray-900">{listing.condition}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-gray-900">{listing.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Posted</h3>
                  <p className="text-gray-900">{new Date(listing.postedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="pt-6">
                <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail; 