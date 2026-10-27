import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, AlertCircle } from 'lucide-react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

const ProductsPage = ({ defaultOffersOnly = false }) => {
  const { category: paramCategory } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(paramCategory || 'All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState(4000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Sync category param with state if URL changes
  useEffect(() => {
    if (paramCategory) {
      setSelectedCategory(paramCategory);
    } else {
      setSelectedCategory('All');
    }
  }, [paramCategory]);

  // Load filter options (categories & brands)
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await productService.getProductFilters();
        if (data.categories) setCategories(data.categories);
        if (data.brands) setBrands(data.brands);
      } catch (err) {
        console.error('Failed to load filter metadata:', err);
      }
    };
    fetchFilters();
  }, []);

  // Fetch products matching filters
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          page: currentPage,
          limit: 12,
          sortBy,
          maxPrice: priceRange < 4000 ? priceRange : undefined,
          minRating: minRating > 0 ? minRating : undefined,
        };

        if (selectedCategory && selectedCategory !== 'All') {
          params.category = selectedCategory;
        }

        if (selectedBrand && selectedBrand !== 'All') {
          params.brand = selectedBrand;
        }

        if (searchQuery) {
          params.keyword = searchQuery;
        }

        if (defaultOffersOnly) {
          params.offers = true;
        }

        const data = await productService.getProducts(params);
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.total || 0);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [
    selectedCategory,
    selectedBrand,
    priceRange,
    minRating,
    sortBy,
    currentPage,
    searchQuery,
    defaultOffersOnly,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setPriceRange(4000);
    setMinRating(0);
    setSortBy('newest');
    if (paramCategory) {
      navigate('/products');
    }
  };

  const pageTitle = defaultOffersOnly
    ? 'Special Offers & Hot Deals'
    : paramCategory
    ? `${paramCategory} Collection`
    : searchQuery
    ? `Search Results for "${searchQuery}"`
    : 'All Electronic Products';

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Header Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h1 className="heading-xl font-display">{pageTitle}</h1>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Showing {products.length} of {totalCount} verified electronics
            </p>
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#475569' }}>
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{ width: '180px', padding: '0.45rem 0.75rem', fontSize: '0.88rem' }}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {/* Catalog 2-Column Grid */}
        <div className="catalog-layout">
          {/* Sidebar */}
          <FilterSidebar
            categories={categories}
            brands={brands}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            selectedBrand={selectedBrand}
            onSelectBrand={(b) => {
              setSelectedBrand(b);
              setCurrentPage(1);
            }}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            minRating={minRating}
            onRatingChange={setMinRating}
            onResetFilters={handleResetFilters}
          />

          {/* Product Grid Area */}
          <div>
            {loading ? (
              <div style={{ padding: '5rem 0', textAlign: 'center', color: '#64748B' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>⚡ Loading electronics catalog...</div>
                <p style={{ fontSize: '0.85rem' }}>Fetching specs, prices, and stock levels from TechCart database.</p>
              </div>
            ) : error ? (
              <div className="alert alert-error">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            ) : products.length === 0 ? (
              <div
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  border: '1px solid #E2E8F0',
                }}
              >
                <Search size={48} color="#94A3B8" style={{ marginBottom: '1rem' }} />
                <h3 className="heading-md" style={{ marginBottom: '0.5rem' }}>No products found</h3>
                <p style={{ color: '#64748B', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                  We couldn't find any items matching your selected filters or search terms. Try widening your price range or resetting filters.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      marginTop: '3rem',
                    }}
                  >
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                        style={{ minWidth: '40px', padding: '0.45rem 0.85rem' }}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
