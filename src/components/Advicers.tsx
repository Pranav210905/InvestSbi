import { useState } from 'react';
import { Professional, BookedMeeting } from '../types/advice';
import ProfessionalCard from './ProfessionalCard';
import BookedMeetings from './BookedMeetings';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme hook

export function Advice() {
  const [activeTab, setActiveTab] = useState<'professionals' | 'booked'>('professionals');
  const [bookedMeetings, setBookedMeetings] = useState<BookedMeeting[]>([]);
  const { theme } = useTheme(); // Use the useTheme hook to get the current theme

  const professionals: Professional[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
      title: "Investment Strategist",
      experience: "15+ years",
      expertise: ["Portfolio Management", "Risk Assessment", "Retirement Planning"],
      availability: ["Mon-Fri, 9AM-5PM EST"],
      rating: 4.9
    },
    {
      id: 2,
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      title: "Wealth Management Advisor",
      experience: "12+ years",
      expertise: ["Estate Planning", "Tax Strategy", "International Markets"],
      availability: ["Mon-Thu, 10AM-6PM PST"],
      rating: 4.8
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      title: "Financial Planning Specialist",
      experience: "10+ years",
      expertise: ["Personal Finance", "Investment Planning", "Debt Management"],
      availability: ["Tue-Sat, 8AM-4PM CST"],
      rating: 4.7
    }
  ];

  const handleBookMeeting = (professional: Professional, datetime: string) => {
    const newMeeting: BookedMeeting = {
      id: Date.now(),
      professional,
      datetime,
      status: 'confirmed'
    };
    setBookedMeetings([...bookedMeetings, newMeeting]);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}> {/* Apply conditional styling based on theme */}
      <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} shadow-sm`}> {/* Apply conditional styling based on theme */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Professional Connect</h1> {/* Apply conditional styling based on theme */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('professionals')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'professionals'
                ? 'bg-blue-600 text-white'
                : `${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}` /* Apply conditional styling based on theme */
            }`}
          >
            Available Professionals
          </button>
          <button
            onClick={() => setActiveTab('booked')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'booked'
                ? 'bg-blue-600 text-white'
                : `${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}` /* Apply conditional styling based on theme */
            }`}
          >
            Booked Meetings
          </button>
        </div>

        {activeTab === 'professionals' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
                onBookMeeting={handleBookMeeting}
              />
            ))}
          </div>
        ) : (
          <BookedMeetings meetings={bookedMeetings} />
        )}
      </main>
    </div>
  );
}