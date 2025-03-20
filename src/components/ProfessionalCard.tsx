import React, { useState } from 'react';
import { Clock, Award, Briefcase, Star } from 'lucide-react';
import { Professional } from '../types/advice';

interface ProfessionalCardProps {
  professional: Professional;
  onBookMeeting: (professional: Professional, datetime: string) => void;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional, onBookMeeting }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      onBookMeeting(professional, `${selectedDate}T${selectedTime}`);
      setIsBooking(false);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img
            src={professional.image}
            alt={professional.name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl text-white font-semibold text-gray-900">{professional.name}</h3>
            <p className="text-white">{professional.title}</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-white">
            <Briefcase className="h-5 w-5 mr-2" />
            <span>{professional.experience}</span>
          </div>
          <div className="flex items-center text-white">
            <Award className="h-5 w-5 mr-2" />
            <span>{professional.expertise.join(', ')}</span>
          </div>
          <div className="flex items-center text-white">
            <Clock className="h-5 w-5 mr-2" />
            <span>{professional.availability[0]}</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <Star className="h-5 w-5 mr-2 fill-current" />
            <span>{professional.rating} / 5.0</span>
          </div>
        </div>

        {!isBooking ? (
          <button
            onClick={() => setIsBooking(true)}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Schedule Meeting
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleBook}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsBooking(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalCard;