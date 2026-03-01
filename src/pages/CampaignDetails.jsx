import { useParams } from 'react-router-dom';

const CampaignDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Campaign Details</h1>
      <p>Viewing details for campaign ID: {id}</p>
    </div>
  );
};

export default CampaignDetails;
