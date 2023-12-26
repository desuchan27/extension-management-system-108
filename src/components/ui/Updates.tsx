// File: Updates.tsx

import { Update } from '@prisma/client';
import { FC } from 'react';

interface UpdatesProps {
  updates: Update[] | undefined; // Make updates optional
}

const Updates: FC<UpdatesProps> = ({ updates }) => {

    console.log(updates)
  return (
    <div className='bg-white w-full mx-5'>
      {updates && updates.length > 0 ? (
        updates.map((update) => (
          <div key={update?.id}>
            <h3>{update?.title}</h3>
            <p>{update?.description}</p>
          </div>
        ))
      ) : (
        <p>No updates available</p>
      )}
    </div>
  );
};

export default Updates;
