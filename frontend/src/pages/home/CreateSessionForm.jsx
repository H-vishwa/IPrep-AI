import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../../components/Inputs/input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setErrors("Please fill all the required fields.");
      return;
    }

    setErrors("");

    setIsLoading(true);
    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generateQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generateQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrors(error.response.data.message);
      } else {
        setErrors(
          "An error occurred while creating the session. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-bold text-black">
        Start a New Interview Journey
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </p>
      <form onSubmit={handleCreateSession} className="flex flex-col gap-0.5">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="e.g. Software Engineer"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="e.g.,1 year, 2 years"
          type="number"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus on"
          placeholder="e.g., Java, Python"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description"
          placeholder="Briefly describe your background and goals"
          type="text"
        />

        {errors && <p className="text-red-500 text-xs pb-2.5">{errors}</p>}

        <button
          className="btn-primary w-full mt-2"
          type="submit"
          disabled={isLoading}>
          {isLoading && <SpinnerLoader />} Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
