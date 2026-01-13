import { User, Calendar, IndianRupee } from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/helpers";
import Button from "../common/Button";

const BidCard = ({ bid, onHire, isOwner, loading }) => {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              {bid.freelancerId?.name || "Anonymous"}
            </h4>
            <p className="text-sm text-gray-500">{bid.freelancerId?.email}</p>
          </div>
        </div>

        <span className={`badge badge-${bid.status}`}>{bid.status}</span>
      </div>

      <p className="text-gray-700 mb-4">{bid.message}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            {/* <IndianRupee className="w-4 h-4" /> */}
            <span className="font-medium text-gray-900">
              {formatCurrency(bid.price)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(bid.createdAt)}</span>
          </div>
        </div>
        {isOwner && bid.status === "pending" && (
          <Button
            onClick={() => onHire(bid._id)}
            disabled={loading}
            variant="primary"
            className="text-sm"
          >
            {loading ? "Hiring..." : "Hire"}
          </Button>
        )}
      </div>
    </div>
  );
};
export default BidCard;
