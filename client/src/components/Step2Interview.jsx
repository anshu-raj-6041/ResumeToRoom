// data ko fetch krenge
// final report bnayenge and send kr denge step3 ko
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from "./Timer"
import { motion } from "motion/react"
import { FaMicrophoneAlt, FaMicrophoneSlash } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import axios from "axios"
import { ServerUrl } from "../App.jsx";

function Step2Interview({ interviewData, onFinish }) {
    // const { interviewId, questions, userName } = interviewData
    const { interviewId, questions, userName } = interviewData;

    const [isIntroPhase, setIsIntroPhase] = useState(true);

    const [isMicOn, setIsMicOn] = useState(true);
    const isMicOnRef = useRef(true);
    const recognitionRef = useRef(null);
    const [isAIPlaying, setIsAIPlaying] = useState(false);
    const isAIPlayingRef = useRef(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    const [timeLeft, setTimeLeft] = useState(
        questions[0]?.timeLimit || 60
    );

    const [selectedVoice, setSelectedVoice] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [voiceGender, setVoiceGender] = useState("female");
    const [subtitle, setSubtitle] = useState("");

    const videoRef = useRef(null);

    const currentQuestion = questions[currentIndex];



    // gender ke according voice change ho
    useEffect(() => {

        const loadVoices = () => {

            const voices = window.speechSynthesis.getVoices();
            if (!voices.length) return;

            // Try known female voices first
            const femaleVoice =
                voices.find(v =>
                    v.name.toLowerCase().includes("zira") ||
                    v.name.toLowerCase().includes("samantha") ||
                    v.name.toLowerCase().includes("female")
                );

            if (femaleVoice) {
                setSelectedVoice(femaleVoice);
                setVoiceGender("female");
                return;
            }
            const maleVoice =
                voices.find(v =>
                    v.name.toLowerCase().includes("david") ||
                    v.name.toLowerCase().includes("mark") ||
                    v.name.toLowerCase().includes("male")
                );

            if (maleVoice) {
                setSelectedVoice(maleVoice);
                setVoiceGender("male");
                return;
            }

            // Fallback: first voice (assume female)
            setSelectedVoice(voices[0]);
            setVoiceGender("female");

        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

    /* -------------------- SPEAK FUNCTION -------------------- */

    const speakText = (text) => {
        return new Promise((resolve) => {

            if (!window.speechSynthesis || !selectedVoice) {
                resolve();
                return;
            }

            // Set playing status immediately to block microphone
            setIsAIPlaying(true);
            isAIPlayingRef.current = true;

            window.speechSynthesis.cancel();

            // Add natural pauses after commas and periods
            const humanText = text
                .replace(/,/g, ", ... ")
                .replace(/\./g, ". .... ");

            const utterance = new SpeechSynthesisUtterance(humanText);

            utterance.voice = selectedVoice;

            // Human-like pacing
            utterance.rate = 0.92;   // slightly slower than normal
            utterance.pitch = 1.05;  // small warmth
            utterance.volume = 1;

            utterance.onstart = () => {
                stopMic()
                videoRef.current?.play();
            };

            utterance.onend = () => {
                videoRef.current?.pause();
                videoRef.current.currentTime = 0;
                setIsAIPlaying(false);
                isAIPlayingRef.current = false;

                if (isMicOnRef.current) {
                    startMic();
                }

                setTimeout(() => {
                    setSubtitle("");
                    resolve();
                }, 300);

            };

            utterance.onerror = (event) => {
                console.error("SpeechSynthesisUtterance error", event);
                setIsAIPlaying(false);
                isAIPlayingRef.current = false;
                if (isMicOnRef.current) {
                    startMic();
                }
                resolve();
            };

            setSubtitle(text);

            window.speechSynthesis.speak(utterance);

        });

    };


    useEffect(() => {
        if (!selectedVoice) {
            return;
        }

        const runIntro = async () => {
            // Stop mic at the very beginning of any speech sequence
            stopMic();

            if (isIntroPhase) {
                await speakText(
                    `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
                );

                await speakText(
                    "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
                );
                setIsIntroPhase(false);
            }
            else if (currentQuestion) {
                await new Promise(r => setTimeout(r, 800));

                // If we just moved to a new question (except the first one)
                if (currentIndex > 0) {
                    await speakText("Alright, let's move to the next question.");
                }

                // If last question (hard level)
                if (currentIndex === questions.length - 1) {
                    await speakText(
                        "Alright, this one might be a bit more challenging."
                    );
                }

                await speakText(currentQuestion.question);
                
                // Mic will automatically restart via speakText's onend if isMicOnRef is true
            }
        }
        runIntro();


    }, [isIntroPhase, currentIndex, selectedVoice])



    useEffect(() => {

        if (isIntroPhase) return;
        if (!currentQuestion) return;
        if (isSubmitting) return;

        const timer = setInterval(() => {

            setTimeLeft((prev) => {

                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }

                return prev - 1;
            });

        }, 1000);

        return () => clearInterval(timer);

    }, [isIntroPhase, currentIndex, isSubmitting]);

    useEffect(() => {
        if (!isIntroPhase && currentQuestion) {
            setTimeLeft(currentQuestion.timeLimit || 60);
        }
    }, [currentIndex, isIntroPhase]);



    // voice ko text me

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) return;

        const recognition = new window.webkitSpeechRecognition();

        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            // ONLY process if mic is supposed to be on AND AI is not speaking
            if (!isMicOnRef.current || isAIPlayingRef.current) return;

            const transcript =
                event.results[event.results.length - 1][0].transcript;

            // Filter out the common transition phrase if it somehow gets captured
            if (transcript.toLowerCase().includes("let's move to the next question")) return;

            setAnswer((prev) => prev + " " + transcript);
        };

        recognition.onend = () => {
            // Restart if it should be on and AI is not speaking
            if (isMicOnRef.current && !isAIPlayingRef.current) {
                try {
                    recognition.start();
                } catch (e) {}
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            if (event.error === 'not-allowed') {
                setIsMicOn(false);
                isMicOnRef.current = false;
            }
        };

        recognitionRef.current = recognition;

    }, []);


    const startMic = () => {
        // ONLY start if mic is enabled and AI isn't speaking
        if (recognitionRef.current && isMicOnRef.current && !isAIPlayingRef.current) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                // Ignore "already started" errors
            }
        }
    };

    const stopMic = () => {

        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
                recognitionRef.current.abort();
            } catch (e) {}
        }

    };

    const toggleMic = () => {

        if (isMicOn) {
            stopMic();
        } else {
            startMic();
        }

        setIsMicOn(!isMicOn);
        isMicOnRef.current = !isMicOn;

    };


    const submitAnswer = async () => {

        if (isSubmitting) return;

        stopMic();
        setIsSubmitting(true);

        try {

            const result = await axios.post(
                `${ServerUrl}/api/interview/submit-answer`,
                {
                    interviewId,
                    questionIndex: currentIndex,
                    answer,
                    timeTaken:
                        currentQuestion.timeLimit - timeLeft,
                }, { withCredentials: true }
            );
            setFeedback(result.data.feedback)
            speakText(result.data.feedback)
            setIsSubmitting(false)

        } catch (error) {
            console.log(error);
            setIsSubmitting(false)



        }

    };


    const handleNext = () => {
        console.log("handleNext called, currentIndex:", currentIndex);
        setAnswer("");
        setFeedback("");

        if (currentIndex + 1 >= questions.length) {
            finishInterview();
            return;
        }

        const nextIndex = currentIndex + 1;
        setTimeLeft(questions[nextIndex]?.timeLimit || 60);
        setCurrentIndex(nextIndex);
    }

    const finishInterview = async () => {
        stopMic()
        setIsMicOn(false)
        isMicOnRef.current = false;
        setIsSubmitting(true);

        try {
            const result = await axios.post(ServerUrl + "/api/interview/finish", { interviewId }, { withCredentials: true })
            console.log("Interview finished:", result.data);
            onFinish(result.data)

        } catch (error) {
            console.error("Finish interview error:", error);
        } finally {
            setIsSubmitting(false);
        }
    }


    useEffect(() => {
        if (isIntroPhase) return;
        if (!currentQuestion) return;

        if (timeLeft === 0 && !isSubmitting && !feedback) {
            submitAnswer();
        }
    }, [timeLeft, isIntroPhase, isSubmitting, feedback]);

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
                recognitionRef.current.abort();
            }

            window.speechSynthesis.cancel();
        };
    }, []);









    return (
        <div className="h-screen overflow-hidden bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">

                {/* video section */}
                <div className="w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-4 border-r border-gray-200 overflow-y-auto">
                    <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
                        <video
                            src={videoSource}
                            key={videoSource}
                            ref={videoRef}
                            muted
                            playsInline
                            preload="auto"
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* subtitle area */}
                    {subtitle && (
                        <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm flex-shrink-0">
                            <p className="text-gray-700 text-sm font-medium text-center leading-relaxed">{subtitle}</p>
                        </div>
                    )}

                    {/* timer area */}
                    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-5 space-y-4 flex-shrink-0">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Status</span>
                            {isAIPlaying && (
                                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest animate-pulse">
                                    AI Speaking
                                </span>
                            )}
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        <div className="flex justify-center scale-90">
                            <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <span className="text-xl font-bold text-emerald-600">{currentIndex + 1}</span>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Current</p>
                            </div>
                            <div>
                                <span className="text-xl font-bold text-emerald-600">{questions.length}</span>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Total</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Section */}
                <div className="flex-1 flex flex-col p-6 sm:p-8 md:p-10 bg-white overflow-hidden">
                    <div className="flex-shrink-0 mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                            AI Smart Interview
                        </h2>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0 space-y-6">
                        {!isIntroPhase && currentQuestion && (
                            <div className="flex-shrink-0 relative bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
                                <p className="text-xs text-emerald-600/60 mb-2 font-bold uppercase tracking-wider">
                                    Question {currentIndex + 1} of {questions.length}
                                </p>
                                <div className="text-lg font-bold text-gray-800 leading-relaxed">
                                    {currentQuestion.question}
                                </div>
                            </div>
                        )}

                        <div className="flex-1 flex flex-col min-h-0 space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">
                                Your Response
                            </label>
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Type your answer here..."
                                className="flex-1 bg-gray-50/50 p-6 rounded-3xl resize-none outline-none border border-gray-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all text-gray-700 text-lg shadow-inner leading-relaxed"
                            />
                        </div>

                        {!feedback ? (<div className="flex-shrink-0 flex items-center gap-4 pt-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                // onClick={() => setIsMicOn(!isMicOn)}
                                onClick={toggleMic}
                                className={`w-14 h-14 flex items-center justify-center rounded-2xl shadow-xl transition-all ${isMicOn
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-900 text-white"
                                    }`}
                            >
                                {isMicOn ? <FaMicrophoneAlt size={24} /> : <FaMicrophoneSlash size={24} />}
                            </motion.button>

                            <motion.button
                                onClick={submitAnswer}
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-4 rounded-2xl shadow-xl hover:opacity-90 transition font-bold text-lg disabled:bg-gray-500"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Answer"}
                            </motion.button>
                        </div>) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm">
                                <p className="text-emerald-700 font-medium mb-4">
                                    {feedback}
                                </p>
                                <button
                                    onClick={handleNext}
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-1 disabled:opacity-50">
                                    {isSubmitting ? (
                                        "Finishing..."
                                    ) : currentIndex + 1 >= questions.length ? (
                                        <>View Report <BsArrowRight size={18} /></>
                                    ) : (
                                        <>Next Question <BsArrowRight size={18} /></>
                                    )}
                                </button>

                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Step2Interview
