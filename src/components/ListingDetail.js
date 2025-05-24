import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        // Simulate API call - replace with actual API call
        const mockListing = {
          id: Number(id),
          title: 'Calculus Textbook',
          price: 45,
          images: [
            'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          ],
          category: 'Textbooks',
          condition: 'Like New',
          location: 'University Campus',
          description: 'Calculus textbook in excellent condition. Used for one semester only. No highlighting or writing inside. Perfect for students taking calculus courses.',
          seller: {
            name: 'John Doe',
            email: 'john.doe@university.edu',
            rating: 4.8,
            totalSales: 15,
            memberSince: '2023'
          },
          createdAt: '2024-03-15'
        };

        setListing(mockListing);
        setLoading(false);
      } catch (err) {
        setError('Failed to load listing details');
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleContactSeller = (e) => {
    e.preventDefault();
    // Here you would typically handle sending the message to the seller
    console.log('Message to seller:', message);
    setShowContactModal(false);
    setMessage('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">{error}</h3>
          <button
            onClick={() => navigate('/listings')}
            className="mt-4 text-indigo-600 hover:text-indigo-500"
          >
            Return to listings
          </button>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Listing not found</h3>
          <button
            onClick={() => navigate('/listings')}
            className="mt-4 text-indigo-600 hover:text-indigo-500"
          >
            Return to listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image gallery */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {listing.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${listing.title} ${index + 2}`}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Listing details */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {listing.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Listing information</h2>
              <p className="text-3xl text-gray-900">${listing.price}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{listing.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className={`${
                        listing.seller.rating > rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      } h-5 w-5 flex-shrink-0`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">
                  {listing.seller.rating} ({listing.seller.totalSales} sales)
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Seller</h3>
                  <p className="mt-1 text-sm text-gray-500">{listing.seller.name}</p>
                  <p className="text-sm text-gray-500">Member since {listing.seller.memberSince}</p>
                </div>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Contact Seller
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Condition</h3>
                  <p className="mt-1 text-sm text-gray-500">{listing.condition}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Location</h3>
                  <p className="mt-1 text-sm text-gray-500">{listing.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Category</h3>
                  <p className="mt-1 text-sm text-gray-500">{listing.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Listed</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact seller modal */}
      {showContactModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Contact Seller
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Send a message to {listing.seller.name} about this item.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleContactSeller} className="mt-5 sm:mt-6">
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter your message..."
                    required
                  />
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetail; 