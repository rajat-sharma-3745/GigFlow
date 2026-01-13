import BidCard from './BidCard';
import Loader from '../common/Loader';

const BidList = ({ bids, onHire, isOwner, loading, hireLoading }) => {
  if (loading) {
    return <Loader />;
  }

  if (bids.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No bids yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bids.map((bid) => (
        <BidCard
          key={bid._id}
          bid={bid}
          onHire={onHire}
          isOwner={isOwner}
          loading={hireLoading}
        />
      ))}
    </div>
  );
};

export default BidList;