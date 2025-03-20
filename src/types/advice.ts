export interface Professional {
  id: number;
  name: string;
  image: string;
  title: string;
  experience: string;
  expertise: string[];
  availability: string[];
  rating: number;
}

export interface BookedMeeting {
  id: number;
  professional: Professional;
  datetime: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}