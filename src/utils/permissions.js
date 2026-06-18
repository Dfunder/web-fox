/**
 * Permission utility functions for RBAC and ownership checks
 */

/**
 * Checks if a user can edit or delete a campaign
 * Requirements: 
 * - Only owner sees Edit/Delete
 * - Handle null user, null campaign, missing ownerId
 * 
 * @param {Object|null} user - The current user object
 * @param {Object|null} campaign - The campaign object
 * @returns {boolean} True if user is the owner
 */
export const canEditCampaign = (user, campaign) => {
  if (!user || !campaign || !campaign.ownerId) {
    return false;
  }

  // Use optional chaining and strict comparison
  // Convert IDs to strings if necessary to ensure safe comparison
  return String(user?.id) === String(campaign?.ownerId);
};

/**
 * Checks if a user is an admin
 * 
 * @param {Object|null} user - The current user object
 * @returns {boolean} True if user is admin
 */
export const isAdmin = (user) => {
  return user?.role?.toLowerCase() === 'admin';
};
