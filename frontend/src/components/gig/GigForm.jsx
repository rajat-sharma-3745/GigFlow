import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const GigForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    } else if (isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
      newErrors.budget = 'Budget must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...formData,
      budget: parseFloat(formData.budget),
    });

    setFormData({ title: '', description: '', budget: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Gig Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="e.g., Build a responsive landing page"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`input-field ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Describe your project in detail..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <Input
        label="Budget (USD)"
        type="number"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        error={errors.budget}
        placeholder="500"
        min="0"
        step="0.01"
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating...' : 'Post Gig'}
      </Button>
    </form>
  );
};

export default GigForm;