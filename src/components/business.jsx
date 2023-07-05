import React from 'react';

const ShareButton = ({ inviteCode }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Prestige Finance',
        text: `Sign up and join my club!, use invite code ${inviteCode}`,
        url: 'https://prestigefinance.vercel.app',
      })
        .then(() => console.log('App shared successfully.'))
        .catch((error) => console.log('Error sharing app:', error));
    } else {
      console.log('Web Share API is not supported in this browser.');
    }
  };;

  return (
    <button className='logb' onClick={handleShare}>Add Members</button>
  );
};

export default ShareButton;
