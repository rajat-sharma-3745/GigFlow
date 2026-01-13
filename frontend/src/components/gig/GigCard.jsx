import { Calendar, IndianRupee, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDate, truncateText } from '../../utils/helpers';

const GigCard = ({ gig }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/gig/${gig._id}`)}
      className="card p-6 cursor-pointer hover:scale-[1.02] transition-transform"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-4">
          {gig.title}
        </h3>
        <span className={`badge badge-${gig.status} shrink-0`}>
          {gig.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {truncateText(gig.description, 120)}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            {/* <IndianRupee className="w-4 h-4" /> */}
            <span className="font-medium text-gray-900">
              {formatCurrency(gig.budget)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(gig.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User className="w-4 h-4" />
          <span>{gig.ownerId?.name || 'Anonymous'}</span>
        </div>
      </div>
    </div>
  );
};

export default GigCard;