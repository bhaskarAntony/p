import React, { useState } from 'react';
import './ConsentOverlay.css';
import WithdrawlForm from './WithdrawlForm';

const ConsentOverlay = () => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [loading, setLoading] = useState(false); // State to handle loading
  const [errorMessage, setErrorMessage] = useState(''); // Error message handling

  // Handle consent action
  const handleConsent = async () => {
    setLoading(true);
    setErrorMessage(''); 
    const consentData = {
      event: 'SET_CONSENTIUM_DATA',
      user_identifier: "Kathirvel",
      user_email: "kathirvel@privasapien.com",
    };

    try {
      const response = await fetch('https://api.dev-v2.privasapien.com/api/v1/e55e748c-4f11-11ef-b302-f2d91815c660/consent-manager/consents/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consentData),
      });

      const result = await response.json();

      if (response.ok) {
        setConsentGiven(true);
        console.log('Consent granted:', result);
        alert('Consent given successfully');
      } else {
        throw new Error(result.message || 'Failed to give consent');
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error giving consent:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle withdraw action
  const handleWithdraw = () => {
    setShowWithdrawForm(true); // Show the withdrawal form
    setConsentGiven(false); // Reset consent status
    alert('Consent withdrawn');
  };

  return (
    <div id="consent-overlay">
      <div id="consent-form">
        <h2>Privacy Notice</h2>
        <p>We value your privacy. Please provide your consent for data collection.</p>

        {/* Conditionally show buttons based on consent status */}
        {!consentGiven ? (
          <button className="consent-give-btn consent-btn" onClick={handleConsent} disabled={loading}>
            {loading ? 'Processing...' : 'Give Consent'}
          </button>
        ) : (
          <button className="consent-give-btn withdraw-btn" onClick={handleWithdraw}>
            Withdraw Consent
          </button>
        )}

        {/* Error message display */}
        {errorMessage && <p className="error">{errorMessage}</p>}

        <p className="status">
          {consentGiven ? 'You have given consent.' : 'Consent not given.'}
        </p>
      </div>

      {/* Conditionally render the WithdrawlForm if showWithdrawForm is true */}
      {showWithdrawForm && <WithdrawlForm />}
      {/* {
        showWithdrawForm?(
          <WithdrawlForm/>
        ):(null)
      } */}
    </div>
  );
};

export default ConsentOverlay;