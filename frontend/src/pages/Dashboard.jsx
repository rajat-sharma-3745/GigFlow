import { useEffect, useState, useContext } from 'react';
import { Briefcase, Send, CheckCircle } from 'lucide-react';
import { GigContext } from '../context/GigContext';
import { bidAPI } from '../api/bid.api';
import { useToast } from '../hooks/useToast';
import GigCard from '../components/gig/GigCard';
import BidCard from '../components/bid/BidCard';
import Loader from '../components/common/Loader';
import { TOAST_TYPES } from '../utils/constants';

const Dashboard = () => {
  const { userGigs, fetchUserGigs } = useContext(GigContext);
  const { showToast } = useToast();
  const [myBids, setMyBids] = useState([]);
  const [activeTab, setActiveTab] = useState('my-gigs');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await fetchUserGigs();
      const bidsData = await bidAPI.getUserBids();
      setMyBids(bidsData.data.bids);
    } catch (error) {
      showToast(error.message || 'Failed to fetch data', TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'my-gigs', label: 'My Gigs', icon: Briefcase, count: userGigs.length },
    { id: 'my-bids', label: 'My Bids', icon: Send, count: myBids.length },
  ];

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (activeTab === 'my-gigs') {
      return userGigs.length === 0 ? (
        <div className="text-center py-16">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">You haven't posted any gigs yet</p>
          <p className="text-gray-400 mt-2">Start by posting your first gig!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userGigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      );
    }

    if (activeTab === 'my-bids') {
      return myBids.length === 0 ? (
        <div className="text-center py-16">
          <Send className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">You haven't submitted any bids yet</p>
          <p className="text-gray-400 mt-2">Browse gigs and start bidding!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myBids.map((bid) => (
            <div key={bid._id} className="card p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {bid.gigId?.title || 'Gig Unavailable'}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`badge badge-${bid.status}`}>{bid.status}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{bid.message}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Bid Amount: ${bid.price}</span>
                <span>{new Date(bid.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your gigs and bids</p>
        </div>

        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex cursor-pointer items-center gap-2 px-6 py-3 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                {tab.count > 0 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;