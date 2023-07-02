import React from 'react';

const ShareButton = ({ inviteCode }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Prestige Finance',
        text: `Sign up and join by club!, use invite code ${inviteCode}`,
        url: window.location.href,
      })
        .then(() => console.log('App shared successfully.'))
        .catch((error) => console.log('Error sharing app:', error));
    } else {
      console.log('Web Share API is not supported in this browser.');
    }
  };;

  return (
    <button className='logb' onClick={handleShare}>Share App</button>
  );
};

export default ShareButton;
