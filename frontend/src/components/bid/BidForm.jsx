import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const BidForm = ({ gigId, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    message: '',
    price: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      gigId,
      message: formData.message,
      price: parseFloat(formData.price),
    });

    setFormData({ message: '', price: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Proposal
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`input-field ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Explain why you're the perfect fit for this gig..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <Input
        label="Your Price (INR)"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        error={errors.price}
        placeholder="450"
        min="0"
        step="1"
      />

      <Button type="submit" disabled={loading} className="w-full cursor-pointer">
        {loading ? 'Submitting...' : 'Submit Bid'}
      </Button>
    </form>
  );
};

export default BidForm;