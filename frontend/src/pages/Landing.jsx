import { ArrowRight, Briefcase, Shield, TrendingUp, Users } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const Landing = () => {
  const { openAuthModal, user } = useAuth();

   if (user) {
    return <Navigate to="/home" replace />;
  }

  const features = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Post & Browse Gigs',
      description: 'Easily create job postings or browse through available opportunities',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Connect with Talent',
      description: 'Find the perfect freelancer or client for your project needs',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Grow Your Business',
      description: 'Scale your freelance career or business with quality projects',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Transactions',
      description: 'Safe and secure platform for all your freelance transactions',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="bg-linear-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              GigFlow
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your trusted freelance marketplace. Post gigs, submit bids, and connect with the right talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={openAuthModal}
              className="text-lg px-8 py-3 cursor-pointer"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
            <Button
              variant="secondary"
              className="text-lg px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-6 text-center hover:scale-105 transition-transform animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-linear-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 card p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary-600 mb-2">10K+</p>
              <p className="text-gray-600">Active Freelancers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-600 mb-2">5K+</p>
              <p className="text-gray-600">Completed Projects</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-600 mb-2">98%</p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of freelancers and clients already using GigFlow
          </p>
          <Button
            onClick={openAuthModal}
            className="text-lg px-10 py-3"
          >
            Join Now for Free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;