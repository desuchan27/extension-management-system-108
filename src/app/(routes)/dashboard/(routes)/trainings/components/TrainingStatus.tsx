import { FC } from 'react';
import { ClientColumn } from './Columns';
import { isBefore, isAfter } from 'date-fns';

interface TrainingStatusProps {
  training: ClientColumn;
}

// Custom function to parse date strings with "th" or "st" suffix
const parseDateString = (dateString: string) => {
  const withoutSuffix = dateString.replace(/(st|nd|rd|th)/, '');
  return new Date(withoutSuffix);
};

const TrainingStatus: FC<TrainingStatusProps> = ({ training }) => {
  const currentDate = new Date();
  // Parse date strings using the custom function
  const startDate = parseDateString(training.startDate);
  const endDate = parseDateString(training.endDate);

  if (isBefore(currentDate, startDate)) {
    return <span className='bg-blue-400 text-white text-xs font-semibold rounded-full px-2 py-1.5'>Scheduled</span>;
  } 

  if (isAfter(currentDate, endDate)) {
    return <span className='bg-green-400 text-white text-xs font-semibold rounded-full px-1.5 py-1.5'>Finished</span>;
  }

  if (isAfter(currentDate, startDate) && isBefore(currentDate, endDate)) {
    return <span className='bg-orange-400 text-white text-xs font-semibold rounded-full px-1.5 py-1.5'>Ongoing</span>;
  }

  // Default status if none of the conditions are met
  return <span className='bg-red-400 text-white text-xs font-semibold rounded-full px-1.5 py-1.5'>Cancelled</span>;
};


export default TrainingStatus;
