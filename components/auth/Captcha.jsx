'use client';
import ReCAPTCHA from 'react-google-recaptcha';
import { verifyCaptcha } from 'functions/serverActions';
import { useRef, useState } from 'react';
import React from 'react';
const CaptchaWrapper = ({ children }) => {
  const recaptchaRef = useRef(null);
  const [isVerified, setIsverified] = useState(false);

  async function handleCaptchaSubmission(token) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }
  return (
    <>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        ref={recaptchaRef}
        onChange={handleCaptchaSubmission}
      />
      {React.cloneElement(children, { captchaverified: isVerified })}
    </>
  );
};
export default CaptchaWrapper;
