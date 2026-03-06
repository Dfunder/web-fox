import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../features/auth/authSelectors';
import { useState } from 'react';

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  
  // TODO: Replace with actual API call to fetch campaign by id
  // For now, using mock data structure
  const [campaign] = useState({
    id: id,
    title: 'Sample Campaign',
    description: 'This is a sample campaign description',
    ownerId: null, // This should come from the API response
    ownerName: 'Campaign Owner',
    // ... other campaign fields
  });

  // Check if current user is the campaign owner
  const isOwner = user && campaign?.ownerId === user.id;

  const handleEdit = () => {
    navigate(`/campaign/${id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      // TODO: Implement delete campaign API call
      console.log('Deleting campaign:', id);
      // After successful deletion, redirect to explore page
      // navigate('/explore');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {campaign.title}
            </h1>
            <p className="text-gray-600">Campaign ID: {id}</p>
          </div>
          
          {/* Edit and Delete buttons - only visible to campaign owner */}
          {isOwner && (
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Edit Campaign
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Delete Campaign
              </button>
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-gray-700">{campaign.description}</p>
        </div>

        {/* TODO: Add more campaign details here */}
      </div>
    </div>
  );
};

export default CampaignDetails;
