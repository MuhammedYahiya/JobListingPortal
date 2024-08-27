import React from 'react';
import { useLocation } from 'react-router-dom';
import './Register.css';

function Register() {
  const search = useLocation().search;
  const role = new URLSearchParams(search).get('role');

  return (
    <div className="register-container">
      <h2>{role === 'employer' ? 'Employer' : 'Job Seeker'} Registration</h2>
      <h2>Create an employer account</h2>
      <p>You haven't posted a job before, so you'll need to create an employer account.</p>

      <form>
        <label>
          Your company's name*
          <input type="text" name="companyName" required placeholder="eg: Amazon" />
        </label>

        <label>
          Your company's number of employees
          <select name="employees">
            <option value="1-10">1 to 10</option>
            <option value="11-50">11 to 50</option>
            <option value="51-149">50 to 149</option>
            <option value="150+">150+</option>
          </select>
        </label>

        <label>
          Your first and last name*
          <input type="text" name="name" required placeholder="eg:Fiza Khan" />
        </label>

        <label>
          Email Address*
          <input type="email" name="email" required placeholder="eg: fizasoorajkhan@gmail.com" />
        </label>

        <label>
          Company Address*
          <input type="text" name="address" required placeholder="eg: 1234 Elm St" />
        </label>

        <label>
          City*
          <input type="text" name="city" required placeholder="eg: Springfield" />
        </label>

        <label>
          State*
          <input type="text" name="state" required placeholder="eg: IL" />
        </label>

        <label>
          Country*
          <input type="text" name="country" required placeholder="eg: USA" />
        </label>

        <label>
          Pin Code*
          <input type="text" name="pinCode" required placeholder="eg: 12345" />
        </label>

        <label>
          Types of Position*
          <select name="positionType" required>
            <option value="fullTime">Full Time</option>
            <option value="partTime">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </label>

        <label>
          Social Media Link
          <input type="url" name="socialMediaLink" placeholder="https://www.linkedin.com/company/amazon/jobs/" />
        </label>

        <label>
          Are you a hiring manager?
          <select name="hiringManager">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          How you heard about us
          <select name="referral">
            <option value="mail">Mail</option>
            <option value="web">Web</option>
            <option value="friend">Friend</option>
          </select>
        </label>

        <label>
          Your phone number
          <div className="phone-input">
            <select name="countryCode">
              <option value="+91">+91</option>
            </select>
            <input type="tel" name="phone" required placeholder="eg: 09306695193" />
          </div>
        </label>

        <button type="submit" className="continue-button">Continue</button>
      </form>
    </div>
  );
}

export default Register;
