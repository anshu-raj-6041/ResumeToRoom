import { FaArrowLeft, FaAward, FaCheckCircle, FaExclamationTriangle, FaDownload, FaLightbulb, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from "motion/react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"


function Step3Report({ report }) {
  const navigate = useNavigate();

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 text-lg font-medium">Generating your detailed report...</p>
        </div>
      </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = report.questionWiseScores || [],
  } = report;

  const questionScoreData = (questionWiseScore || []).map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score ?? score.rating ?? 0
  }))

  const skills = [
    { label: "Confidence", value: confidence, color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-700" },
    { label: "Communication", value: communication, color: "#3b82f6", bg: "bg-blue-50", text: "text-blue-700" },
    { label: "Correctness", value: correctness, color: "#f59e0b", bg: "bg-amber-50", text: "text-amber-700" },
  ];

  let performanceConfig = {
    text: "Significant improvement required.",
    tagline: "Work on clarity and technical depth.",
    color: "text-red-600",
    bg: "bg-red-50",
    icon: <FaExclamationTriangle className="text-red-500" />
  };

  if (finalScore >= 8) {
    performanceConfig = {
      text: "Ready for job opportunities!",
      tagline: "Excellent clarity and structured responses.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      icon: <FaAward className="text-emerald-500" />
    };
  } else if (finalScore >= 5) {
    performanceConfig = {
      text: "Good foundation, keep practicing.",
      tagline: "Refine your articulation and confidence.",
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: <FaCheckCircle className="text-blue-500" />
    };
  }

  const percentage = finalScore > 1 ? (finalScore / 10) * 100 : finalScore * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129);
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, { align: "center" });

    currentY += 15;
    doc.setDrawColor(229, 231, 235);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 15;

    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, currentY, contentWidth, 25, 4, 4, "F");
    doc.setFontSize(16);
    doc.setTextColor(17, 24, 39);
    doc.text(`Final Performance Score: ${finalScore}/10`, pageWidth / 2, currentY + 16, { align: "center" });
    currentY += 40;

    doc.setFontSize(14);
    doc.text("Skill Evaluation Metrics", margin, currentY);
    currentY += 10;

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["Skill Category", "Rating", "Status"]],
      body: [
        ["Confidence", `${confidence}/10`, confidence >= 8 ? "Excellent" : confidence >= 5 ? "Good" : "Needs Work"],
        ["Communication", `${communication}/10`, communication >= 8 ? "Excellent" : communication >= 5 ? "Good" : "Needs Work"],
        ["Correctness", `${correctness}/10`, correctness >= 8 ? "Excellent" : correctness >= 5 ? "Good" : "Needs Work"],
      ],
      headStyles: { fillColor: [16, 185, 129] },
    });

    currentY = doc.lastAutoTable.finalY + 20;

    doc.setFontSize(14);
    doc.text("Question-wise Detailed Feedback", margin, currentY);
    currentY += 10;

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "AI Feedback"]],
      body: questionWiseScore.map((q, i) => [
        i + 1,
        q.question,
        `${q.score}/10`,
        q.feedback || "No specific feedback provided."
      ]),
      headStyles: { fillColor: [16, 185, 129] },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 60 },
        2: { cellWidth: 20 },
        3: { cellWidth: "auto" }
      }
    });

    doc.save(`Interview_Report_${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/history")}
              className="p-3 rounded-2xl bg-white shadow-sm border border-gray-100 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <FaArrowLeft size={20} />
            </motion.button>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Interview Analytics
              </h1>
              <p className="text-gray-500 font-medium">
                Detailed performance insights powered by AI
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadPDF}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl shadow-lg shadow-emerald-200 transition-all font-bold"
          >
            <FaDownload /> Download PDF Report
          </motion.button>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Summary Cards */}
          <div className="lg:col-span-4 space-y-8">
            {/* Overall Score Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-50 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-8">
                Overall Score
              </h3>
              <div className="w-48 h-48 mx-auto mb-8 relative">
                <CircularProgressbar
                  value={percentage}
                  text={`${finalScore}/10`}
                  styles={buildStyles({
                    textSize: "18px",
                    pathColor: "#10b981",
                    textColor: "#111827",
                    trailColor: "#f3f4f6",
                    strokeLinecap: "round",
                  })}
                />
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${performanceConfig.bg} ${performanceConfig.color} font-bold text-sm mb-4`}>
                {performanceConfig.icon}
                {performanceConfig.text}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed px-4">
                {performanceConfig.tagline}
              </p>
            </div>

            {/* Skill Metrics */}
            <div className="grid grid-cols-1 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.label}
                  className={`${skill.bg} rounded-2xl p-5 border border-white shadow-sm flex items-center justify-between`}
                >
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${skill.text} opacity-70 mb-1`}>
                      {skill.label}
                    </p>
                    <p className={`text-2xl font-black ${skill.text}`}>
                      {skill.value}<span className="text-sm opacity-60">/10</span>
                    </p>
                  </div>
                  <div className="w-16 h-16 relative">
                    <CircularProgressbar
                      value={skill.value > 1 ? skill.value * 10 : skill.value * 100}
                      styles={buildStyles({
                        pathColor: skill.color,
                        trailColor: "rgba(255,255,255,0.5)",
                      })}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-[10px] font-bold ${skill.text}`}>
                        {skill.value}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Trend & Detailed Question Report */}
          <div className="lg:col-span-8 space-y-8">

            {/* Trend Chart Card */}
            <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 p-6 sm:p-8 border border-gray-50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaChartLine className="text-emerald-500" />
                  Performance Trend
                </h3>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Score per Question</span>
              </div>
              <div className="w-full relative min-h-[300px]">
                <ResponsiveContainer width="100%" aspect={window.innerWidth < 640 ? 1 : 2} debounce={100}>
                  <AreaChart data={questionScoreData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis
                      domain={[0, 10]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#10b981"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorScore)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Questions Analysis */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaLightbulb className="text-amber-500" />
                  Question-wise Analysis
                </h3>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {questionWiseScore.length} Questions
                </span>
              </div>

              <div className="space-y-4">
                {questionWiseScore && questionWiseScore.length > 0 ? (
                  questionWiseScore.map((q, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group min-h-[100px]"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-start gap-4">
                          <span className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                            {index + 1}
                          </span>
                          <p className="text-gray-800 font-bold leading-relaxed">
                            {q.question || q.questionText || "Question text not found"}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-2xl font-black text-emerald-600">
                            {q.score ?? 0}<span className="text-xs text-gray-400 font-bold">/10</span>
                          </p>
                        </div>
                      </div>

                      {(q.feedback || q.aiFeedback) && (
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 group-hover:bg-emerald-50/30 group-hover:border-emerald-100 transition-colors">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                            <FaCheckCircle className="text-emerald-500/50" /> AI Feedback
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed italic">
                            "{q.feedback || q.aiFeedback}"
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-gray-200">
                    <p className="text-gray-500">No question analysis available for this interview.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Step3Report;
