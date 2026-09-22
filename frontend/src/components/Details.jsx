import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Details() {
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;

  // NEW: consent state
  const [consent, setConsent] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consent) {
      alert("Please provide consent before submitting.");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/user`,
        {
          ...formData,
          consent: true,
        },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[100vw] h-[90vh] flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-[700px]"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Participant Details
        </h2>

        {/* Name and Age in One Row */}

        <div className="flex gap-4 mb-6">
          {/* Full Name */}

          <div className="flex-1">
            <label className="block text-gray-700 mb-2">Full Name</label>

            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Age */}

          <div className="w-32">
            <label className="block text-gray-700 mb-2">Age</label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              max="120"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Age"
            />
          </div>
        </div>

        {/* CONSENT TEXT */}

        <legend className=" text-[16px] font-semibold">
          *Terms and Conditions
        </legend>
        <div className="mb-6  rounded-lg p-4 bg-gray-200 max-h-[250px] ">
          <p className="text-[15px] leading-relaxed">
            I hereby consent to the recording of my EEG data for the purposes of
            this project. I understand that my participation is voluntary and
            that I can withdraw at any time. I consent to the use of my data in
            this research, with the assurance that my identity will remain
            confidential. I have no objections to the recording of my data in
            this manner.
            <br />
            <br />I understand that the data collected will be used solely for
            research purposes, and my personal information will not be
            disclosed. I acknowledge that I have been informed about the nature
            of the study and agree to participate without any reservations.
          </p>
        </div>

        {/* CONSENT CHECKBOX */}

        <div className="flex items-center mb-6 gap-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="w-5 h-5"
          />

          <label className="text-[15px] font-medium">
            I agree to the terms and give my consent
          </label>
        </div>

        {/* SUBMIT BUTTON */}

        <button
          type="submit"
          disabled={!consent}
          className={`w-full text-white py-2 rounded-lg transition ${
            consent
              ? "bg-[#152D4E] hover:bg-[#051326]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Details;
