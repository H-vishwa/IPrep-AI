import React, { useEffect, useState } from "react";
import { data, useParams } from "react-router";
import moment from "moment";
import { AnimatePresence, motion, number } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import QuestionCard from "../../components/Card/QuestionCard";
import AIRespnsivePreviw from "./components/AIRespnsivePreviw";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  //fetch session data by session id
  const fetchSessionDetailsbyId = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  //genrate explanation for a question
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question,
        }
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation. Please try again later.");
      console.error("Error generating explanation: ", error);
    } finally {
      setLoading(false);
    }
  };

  //pin a question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );

      console.log(response);

      if (response.data && response.data.question) {
        fetchSessionDetailsbyId();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Upload more questionsin session
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generateQuestions = aiResponse.data;
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        { sessionId, questions: generateQuestions }
      );
      if (response.data) {
        toast.success("Questions added successfully!");
        fetchSessionDetailsbyId();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to upload more questions. Please try again later.");
      }
    }finally{
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsbyId();
    }

    return () => {};
  }, []);
  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lasUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MM YYYY")
            : ""
        }
      />

      <div className="container mx-auto px-4 md:px-0 pt-4 pb-4">
        <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}>
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.2,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}>
                    <>
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data.question)
                        }
                        isPinned={data?.isPinned}
                        ontogglePin={() => toggleQuestionPinStatus(data._id)}
                      />

                      {!loading &&
                        sessionData?.questions?.length == index + 1 && (
                          <div className="flex items-center justify-center mt-5">
                            <button
                              className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                              disabled={loading || isUpdateLoader}
                              onClick={uploadMoreQuestions}>
                              {isUpdateLoader ? (
                                <SpinnerLoader />
                              ) : (
                                <LuListCollapse className="text-lg" />
                              )}{" "}
                              Load More
                            </button>
                          </div>
                        )}
                    </>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <Drawer
            isOpen={openLeanMoreDrawer}
            isClose={() => setOpenLeanMoreDrawer(false)}
            title={!loading && explanation?.title}>
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" />
                {errorMsg}
              </p>
            )}
            {loading && <SkeletonLoader />}
            {!loading && explanation && (
              <AIRespnsivePreviw content={explanation?.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
