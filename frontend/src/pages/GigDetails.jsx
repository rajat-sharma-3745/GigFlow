import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, IndianRupee, User } from 'lucide-react';
import { gigAPI } from '../api/gig.api';
import { bidAPI } from '../api/bid.api';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { formatCurrency, formatDate } from '../utils/helpers';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import BidForm from '../components/bid/BidForm';
import BidList from '../components/bid/BidList';
import { TOAST_TYPES } from '../utils/constants';

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidLoading, setBidLoading] = useState(false);
  const [hireLoading, setHireLoading] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);

  const isOwner = gig && user && gig.ownerId._id === user.id;

  useEffect(() => {
    fetchGigDetails();
  }, [id]);

  const fetchGigDetails = async () => {
    try {
      const gigData = await gigAPI.getGigById(id);
      setGig(gigData.data.gig);

      if (gigData.data.gig.ownerId._id === user?.id) {
        const bidsData = await bidAPI.getBidsByGigId(id);
        setBids(bidsData.data.bids);
      }
    } catch (error) {
      showToast(error.message || 'Failed to fetch gig details', TOAST_TYPES.ERROR);
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBid = async (bidData) => {
    setBidLoading(true);
    try {
      await bidAPI.createBid(bidData);
      showToast('Bid submitted successfully!', TOAST_TYPES.SUCCESS);
      setShowBidForm(false);
    } catch (error) {
      showToast(error.message || 'Failed to submit bid', TOAST_TYPES.ERROR);
    } finally {
      setBidLoading(false);
    }
  };

  const handleHire = async (bidId) => {
    if (!confirm('Are you sure you want to hire this freelancer?')) return;

    setHireLoading(true);
    try {
      await bidAPI.hireBid(bidId);
      showToast('Freelancer hired successfully!', TOAST_TYPES.SUCCESS);
      fetchGigDetails();
    } catch (error) {
      showToast(error.message || 'Failed to hire freelancer', TOAST_TYPES.ERROR);
    } finally {
      setHireLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!gig) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/home')}
          className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Gigs
        </button>

        <div className="card p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{gig.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{gig.ownerId.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(gig.createdAt)}</span>
                </div>
              </div>
            </div>
            <span className={`badge badge-${gig.status} shrink-0`}>
              {gig.status}
            </span>
          </div>

          <div className="prose max-w-none mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{gig.description}</p>
          </div>

          <div className="flex items-center gap-2 pt-6 border-t border-gray-200">
            {/* <IndianRupee className="w-5 h-5 text-primary-600" /> */}
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(gig.budget)}
            </span>
            <span className="text-gray-500">Budget</span>
          </div>

          {!isOwner && gig.status === 'open' && (
            <div className="mt-6">
              {showBidForm ? (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Your Bid</h3>
                  <BidForm
                    gigId={gig._id}
                    onSubmit={handleSubmitBid}
                    loading={bidLoading}
                  />
                  <Button
                    variant="secondary"
                    onClick={() => setShowBidForm(false)}
                    className="mt-4 w-full cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowBidForm(true)}
                  className="w-full"
                >
                  Place Your Bid
                </Button>
              )}
            </div>
          )}
        </div>

        {isOwner && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Received Bids ({bids.length})
            </h2>
            <BidList
              bids={bids}
              onHire={handleHire}
              isOwner={isOwner}
              hireLoading={hireLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetails;