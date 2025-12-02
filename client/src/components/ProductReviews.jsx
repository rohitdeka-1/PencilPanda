import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: "Priya Sharma",
      rating: 5,
      date: "2024-11-25",
      comment: "Absolutely love this product! My kids are enjoying it so much. Great quality and fast delivery.",
      helpful: 12
    },
    {
      id: 2,
      userName: "Rajesh Kumar",
      rating: 4,
      date: "2024-11-20",
      comment: "Good quality product. Took a bit longer to deliver but worth the wait. Recommended!",
      helpful: 8
    },
    {
      id: 3,
      userName: "Sneha Patel",
      rating: 5,
      date: "2024-11-15",
      comment: "Amazing educational toy! My 5-year-old daughter loves it. Perfect for learning and play.",
      helpful: 15
    }
  ]);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };
    setReviews([review, ...reviews]);
    setNewReview({ userName: '', rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const handleHelpful = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="mt-12 md:mt-16">
      {/* Rating Summary */}
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3e0053] mb-2">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={star <= Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-[#3e0053]">{averageRating}</span>
              <span className="text-gray-600">({reviews.length} reviews)</span>
            </div>
          </div>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Write a Review
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-[#3e0053] mb-4">Share Your Experience</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReview.userName}
                  onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        size={32}
                        className={star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Your Review</label>
                <textarea
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[100px]"
                  placeholder="Tell us what you think about this product..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-[#3e0053]">{review.userName}</h4>
                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-3">{review.comment}</p>
            <button
              onClick={() => handleHelpful(review.id)}
              className="flex items-center gap-2 text-gray-600 hover:text-[#3e0053] transition-colors"
            >
              <ThumbsUp size={16} />
              <span className="text-sm">Helpful ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>

      {/* View All Reviews Button */}
      {reviews.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-[#3e0053] px-8 py-3 rounded-full font-semibold transition-all"
          >
            {showAllReviews ? 'Show Less' : `View All ${reviews.length} Reviews`}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
