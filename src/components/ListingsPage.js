import React, { useState, useEffect } from 'react';
import ListingGrid from './ListingGrid';

const categories = [
  { id: '', name: 'All Categories', icon: '📦' },
  { id: '1', name: 'Textbooks', icon: '📚' },
  { id: '2', name: 'Electronics', icon: '💻' },
  { id: '3', name: 'Furniture', icon: '🪑' },
  { id: '4', name: 'Sports', icon: '⚽' },
  { id: '5', name: 'Musical Instruments', icon: '🎸' },
  { id: '6', name: 'Art Supplies', icon: '🎨' },
  { id: '7', name: 'Lab Equipment', icon: '🧪' },
  { id: '8', name: 'Stationery', icon: '✏️' },
];

const listingTypes = [
  { id: 'tangible', label: 'Tangible Items' },
  { id: 'tutoring', label: 'Tutoring' },
  { id: 'skill', label: 'Skill Exchange' },
];

const pricingOptions = [
  { id: 'flat', label: 'Flat Rate' },
  { id: 'hourly', label: 'Hourly Rate' },
  { id: 'bidding', label: 'Bidding System' },
];

const visibilityOptions = [
  { id: 'university', label: 'Own University' },
  { id: 'all', label: 'All Registered Students' },
];

const conditionOptions = [
  '', 'New', 'Like New', 'Good', 'Used', 'N/A'
];

const postedWithinOptions = [
  { value: '', label: 'Any time' },
  { value: '1', label: 'Last 24 hours' },
  { value: '3', label: 'Last 3 days' },
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
];

const ListingsPage = ({ initialFilters = {}, onLoginModal }) => {
  // Placeholder for login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: initialFilters.searchQuery || '',
    category: initialFilters.category || '',
    priceRange: initialFilters.priceRange || '',
    listingType: '',
    pricing: '',
    visibility: '',
    condition: '',
    location: '',
    postedWithinDays: '',
    minPrice: '',
    maxPrice: '',
    urgent: false,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Update filters if initialFilters change (e.g., on navigation)
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      ...initialFilters
    }));
  }, [initialFilters]);

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: '',
      priceRange: '',
      listingType: '',
      pricing: '',
      visibility: '',
      condition: '',
      location: '',
      postedWithinDays: '',
      minPrice: '',
      maxPrice: '',
      urgent: false,
    });
  };

  const handleCategorySelect = (catId) => {
    setFilters((prev) => ({ ...prev, category: catId }));
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  // Advanced filter handlers
  const handleListingTypeChange = (e) => {
    setFilters((prev) => ({ ...prev, listingType: e.target.value }));
  };
  const handlePricingChange = (e) => {
    setFilters((prev) => ({ ...prev, pricing: e.target.value }));
  };
  const handleVisibilityChange = (e) => {
    // If selecting 'Own University' and not logged in, prompt login modal
    if (e.target.value === 'university' && !isLoggedIn) {
      if (typeof onLoginModal === 'function') onLoginModal();
      // Optionally, do not set the filter until login is complete
      return;
    }
    setFilters((prev) => ({ ...prev, visibility: e.target.value }));
  };
  const handleConditionChange = (e) => {
    setFilters((prev) => ({ ...prev, condition: e.target.value }));
  };
  const handleLocationChange = (e) => {
    setFilters((prev) => ({ ...prev, location: e.target.value }));
  };
  const handlePostedWithinChange = (e) => {
    setFilters((prev) => ({ ...prev, postedWithinDays: e.target.value }));
  };
  const handleMinPriceChange = (e) => {
    setFilters((prev) => ({ ...prev, minPrice: e.target.value }));
  };
  const handleMaxPriceChange = (e) => {
    setFilters((prev) => ({ ...prev, maxPrice: e.target.value }));
  };
  const handleUrgentChange = (e) => {
    setFilters((prev) => ({ ...prev, urgent: e.target.checked }));
  };

  // Real-time search
  const handleSearch = (e) => {
    e && e.preventDefault();
    setFilters((prev) => ({ ...prev })); // Triggers re-render
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-8">
      <div className="max-w-7xl mx-auto flex gap-8 px-4 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <aside className="w-80 bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24 self-start">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            <button
              onClick={handleResetFilters}
              className="text-sm text-indigo-600 hover:underline font-medium"
            >
              Reset Filters
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search listings..."
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Category</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`flex items-center w-full px-2 py-1 rounded-lg text-left transition-colors text-xs ${
                    filters.category === cat.id ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  <span className="mr-1 text-lg">{cat.icon}</span> {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Listing Type */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Listing Type</h3>
            <div className="flex flex-wrap gap-2">
              {listingTypes.map((type) => (
                <label key={type.id} className="flex items-center cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="listingType"
                    value={type.id}
                    checked={filters.listingType === type.id}
                    onChange={handleListingTypeChange}
                    className="mr-1"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Pricing</h3>
            <div className="flex flex-wrap gap-2">
              {pricingOptions.map((option) => (
                <label key={option.id} className="flex items-center cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="pricing"
                    value={option.id}
                    checked={filters.pricing === option.id}
                    onChange={handlePricingChange}
                    className="mr-1"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Visibility */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Visibility</h3>
            <div className="flex flex-wrap gap-2">
              {visibilityOptions.map((option) => (
                <label key={option.id} className="flex items-center cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="visibility"
                    value={option.id}
                    checked={filters.visibility === option.id}
                    onChange={handleVisibilityChange}
                    className="mr-1"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Urgent Only */}
          <div className="mb-4">
            <label className="flex items-center cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={filters.urgent}
                onChange={handleUrgentChange}
                className="mr-1"
              />
              Urgent Only
            </label>
          </div>

          {/* Min/Max Price */}
          <div className="mb-4 flex gap-2">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Min Price</h3>
              <input
                type="number"
                value={filters.minPrice}
                onChange={handleMinPriceChange}
                placeholder="0"
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Max Price</h3>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={handleMaxPriceChange}
                placeholder="Any"
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs"
              />
            </div>
          </div>

          {/* More Filters */}
          <button
            className="w-full text-left text-indigo-600 font-medium mb-2 focus:outline-none"
            onClick={() => setShowAdvanced((prev) => !prev)}
          >
            {showAdvanced ? 'Hide More Filters' : 'Show More Filters'}
          </button>
          {showAdvanced && (
            <div className="space-y-4">
              {/* Condition */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Condition</h3>
                <select
                  value={filters.condition}
                  onChange={handleConditionChange}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs"
                >
                  {conditionOptions.map((cond) => (
                    <option key={cond} value={cond}>{cond || 'Any'}</option>
                  ))}
                </select>
              </div>
              {/* Location */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Location</h3>
                <input
                  type="text"
                  value={filters.location}
                  onChange={handleLocationChange}
                  placeholder="Enter location..."
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs"
                />
              </div>
              {/* Posted Within */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Posted Within</h3>
                <select
                  value={filters.postedWithinDays}
                  onChange={handlePostedWithinChange}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs"
                >
                  {postedWithinOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <ListingGrid filters={filters} />
        </main>
      </div>
    </div>
  );
};

export default ListingsPage; 