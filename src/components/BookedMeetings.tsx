import React from 'react';
import { Calendar } from 'lucide-react';
import { BookedMeeting } from '../types/advice';

interface BookedMeetingsProps {
  meetings: BookedMeeting[];
}

const BookedMeetings: React.FC<BookedMeetingsProps> = ({ meetings }) => {
  const formatDateTime = (datetime: string) => {
    return new Date(datetime).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {meetings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No meetings scheduled yet</p>
        </div>
      ) : (
        meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={meeting.professional.image}
                  alt={meeting.professional.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {meeting.professional.name}
                  </h3>
                  <p className="text-gray-600">{meeting.professional.title}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                meeting.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : meeting.status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDateTime(meeting.datetime)}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookedMeetings;