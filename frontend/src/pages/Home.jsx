import { useContext, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { GigContext } from '../context/GigContext';
import { useToast } from '../hooks/useToast';
import GigCard from '../components/gig/GigCard';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';
import GigForm from '../components/gig/GigForm';
import { TOAST_TYPES } from '../utils/constants';

const Home = () => {
  const { gigs, loading, fetchGigs, createGig } = useContext(GigContext);
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    fetchGigs();
  }, []);

  const handleSearch = (query) => {
    setSearch(query);
    fetchGigs(query);
  };

  const handleCreateGig = async (gigData) => {
    setCreateLoading(true);
    try {
      await createGig(gigData);
      showToast('Gig created successfully!', TOAST_TYPES.SUCCESS);
      setIsModalOpen(false);
      fetchGigs(search);
    } catch (error) {
      showToast(error.message || 'Failed to create gig', TOAST_TYPES.ERROR);
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Gigs</h1>
            <p className="text-gray-600">Find your next opportunity</p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Post a Gig
          </Button>
        </div>

        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search gigs by title..."
          />
        </div>

        {loading ? (
          <Loader />
        ) : gigs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No gigs found</p>
            <p className="text-gray-400 mt-2">Be the first to post a gig!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Post a New Gig"
      >
        <GigForm onSubmit={handleCreateGig} loading={createLoading} />
      </Modal>
    </div>
  );
};

export default Home;