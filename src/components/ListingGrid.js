import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ListingCard from './ListingCard';

const ListingGrid = ({ filters }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredListings, setFilteredListings] = useState([]);

  // Sample listings data with advanced fields
  const listings = [
    {
      id: 1,
      title: 'Calculus Textbook',
      price: 45,
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: '1', // Textbooks
      description: 'Like new condition, used for one semester',
      listingType: 'tangible',
      pricing: 'flat',
      visibility: 'university',
      condition: 'Like New',
      location: 'Main Campus',
      postedDate: '2024-03-15',
      urgent: false
    },
    {
      id: 2,
      title: 'MacBook Pro 2019',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: '2', // Electronics
      description: 'Excellent condition, comes with original box',
      listingType: 'tangible',
      pricing: 'bidding',
      visibility: 'all',
      condition: 'Used',
      location: 'City Center',
      postedDate: '2024-03-10',
      urgent: true
    },
    {
      id: 3,
      title: 'Office Chair',
      price: 80,
      image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: '3', // Furniture
      description: 'Ergonomic office chair, barely used',
      listingType: 'tangible',
      pricing: 'flat',
      visibility: 'university',
      condition: 'Good',
      location: 'North Campus',
      postedDate: '2024-03-12',
      urgent: false
    },
    {
      id: 4,
      title: 'Math Tutoring',
      price: 20,
      image: 'https://images.unsplash.com/photo-1546519638-68e109acd27b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: '1', // Textbooks (for demo)
      description: 'Tutoring for calculus and algebra',
      listingType: 'tutoring',
      pricing: 'hourly',
      visibility: 'all',
      condition: 'N/A',
      location: 'Online',
      postedDate: '2024-03-18',
      urgent: false
    },
    {
      id: 5,
      title: 'Guitar Lessons',
      price: 30,
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: '5', // Musical Instruments
      description: 'Skill exchange: guitar lessons for language practice',
      listingType: 'skill',
      pricing: 'hourly',
      visibility: 'university',
      condition: 'N/A',
      location: 'Music Room',
      postedDate: '2024-03-17',
      urgent: false
    },
    {
      id: 6,
      title: 'Art Supplies Set',
      price: 75,
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      category: '6', // Art Supplies
      description: 'Complete set of professional art supplies',
      listingType: 'tangible',
      pricing: 'flat',
      visibility: 'all',
      condition: 'New',
      location: 'Art Studio',
      postedDate: '2024-03-14',
      urgent: true
    }
  ];

  useEffect(() => {
    const filterListings = () => {
      return listings.filter(listing => {
        // Search query
        if (filters.searchQuery && !listing.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) && !listing.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
          return false;
        }
        // Category
        if (filters.category && listing.category !== filters.category) {
          return false;
        }
        // Price range
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split('-').map(Number);
          if (max) {
            if (listing.price < min || listing.price > max) {
              return false;
            }
          } else {
            if (listing.price < min) {
              return false;
            }
          }
        }
        // Listing Type
        if (filters.listingType && listing.listingType !== filters.listingType) {
          return false;
        }
        // Pricing
        if (filters.pricing && listing.pricing !== filters.pricing) {
          return false;
        }
        // Visibility
        if (filters.visibility && listing.visibility !== filters.visibility) {
          return false;
        }
        // Condition
        if (filters.condition && listing.condition !== filters.condition) {
          return false;
        }
        // Location
        if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
        // Posted Date (filter by recent days)
        if (filters.postedWithinDays) {
          const daysAgo = parseInt(filters.postedWithinDays, 10);
          const postedDate = new Date(listing.postedDate);
          const now = new Date();
          const diffDays = (now - postedDate) / (1000 * 60 * 60 * 24);
          if (diffDays > daysAgo) {
            return false;
          }
        }
        // Urgent
        if (filters.urgent && !listing.urgent) {
          return false;
        }
        // Min/Max Price
        if (filters.minPrice && listing.price < Number(filters.minPrice)) {
          return false;
        }
        if (filters.maxPrice && listing.price > Number(filters.maxPrice)) {
          return false;
        }
        return true;
      });
    };
    setFilteredListings(filterListings());
  }, [filters]);

  const handleListingClick = (listingId) => {
    sessionStorage.setItem('previousFilters', JSON.stringify(filters));
    navigate(`/listing/${listingId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map(listing => (
          <div key={listing.id} onClick={() => handleListingClick(listing.id)} className="cursor-pointer">
            <ListingCard
              title={listing.title}
              price={listing.price}
              image={listing.image}
              description={listing.description}
            />
          </div>
        ))}
      </div>
      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No listings found</h3>
          <p className="mt-2 text-sm text-gray-500">Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
};

export default ListingGrid; 