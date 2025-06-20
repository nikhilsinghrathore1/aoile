"use client";
import React, { useEffect, useState } from "react";
import {
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  Code,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  X,
  User,
} from "lucide-react";

const LandingPagePreview = () => {
  const [viewMode, setViewMode] = useState("desktop");
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [inputUsername, setInputUsername] = useState("");

  useEffect(() => {
    fetch("/api/gethtml") 
      .then((res) => res.text())
      .then((data) => (setHtmlContent(data), console.log(data)))
      .catch((error) => {
        console.error("Error:", error);
        setHtmlContent("<p>No HTML content available yet.</p>");
      });
  }, []);

  const handleOpenClick = () => {
    setShowModal(true);
  };

  const handleDeploy = async () => {
    if (!inputUsername.trim()) {
      return;
    }

    setUsername(inputUsername);
    setShowModal(false);
    console.log("doing second edit")

    const res = await fetch("https://aoile-backend.onrender.com/deploy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        html: htmlContent,
        undername: inputUsername 
      }),
    });

    const data = await res.json();
    alert("done");
    console.log(data.message || data);
    setInputUsername("");
  };

  const handleModalClose = () => {
    setShowModal(false);
    setInputUsername("");
    console.log("edited for testing")
  };

  const getPreviewStyles = () => {
    switch (viewMode) {
      case "mobile":
        return "w-[375px] h-[667px]";
      case "tablet":
        return "w-[768px] h-[600px]";
      default:
        return "w-full h-[600px]";
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl mb-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ao Profile Preview
                </h1>
                <p className="text-sm text-gray-400">
                Start with arweave
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 rounded-full text-sm font-medium">
                Live Preview
              </span>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center space-x-3">
            {/* View Mode Selector */}
            <div className="flex bg-gray-700/50 backdrop-blur-sm rounded-xl p-1 border border-gray-600/30">
              <button
                onClick={() => setViewMode("desktop")}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === "desktop"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-600/50"
                }`}
              >
                <Monitor size={18} />
              </button>
              <button
                onClick={() => setViewMode("tablet")}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === "tablet"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-600/50"
                }`}
              >
                <Tablet size={18} />
              </button>
              <button
                onClick={() => setViewMode("mobile")}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  viewMode === "mobile"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-600/50"
                }`}
              >
                <Smartphone size={18} />
              </button>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => setShowCode(!showCode)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 border ${
                showCode
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300"
                  : "bg-gray-700/50 border-gray-600/30 text-gray-300 hover:bg-gray-600/50 hover:text-white"
              }`}
            >
              <Code size={16} />
              <span className="text-sm font-medium">Code</span>
            </button>

            <button
              onClick={handleOpenClick}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <ExternalLink size={16} />
              <span className="text-sm font-medium">deploy</span>
            </button>

            <button className="p-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30 text-gray-300 hover:text-white rounded-xl transition-all duration-200">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100vh-160px)]">
        {/* Preview Panel */}
        <div
          className={`bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ${
            showCode ? "w-1/2" : "w-full"
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Preview Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                  <Eye size={16} className="text-blue-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-200">
                    Live Preview
                  </span>
                  <span className="text-xs text-gray-400 ml-2 capitalize">
                    ({viewMode} view)
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 overflow-auto">
              <div
                className={`mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-600/20 ${getPreviewStyles()}`}
              >
                <iframe
                  srcDoc={htmlContent}
                  className="w-full h-full border-0"
                  title="Ao Profile"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Code Panel */}
        {showCode && (
          <div className="w-1/2 bg-gray-900/50 border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
                  <Code size={16} className="text-green-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-200">
                    Source Code
                  </span>
                  <span className="text-xs text-gray-400 ml-2">HTML</span>
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 text-xs bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200 px-3 py-2 rounded-lg transition-all duration-200 border border-gray-600/30"
              >
                {copied ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy size={14} />
                )}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <div className="p-4 overflow-auto h-full bg-gray-900/30">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                <code className="language-html">{htmlContent}</code>
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Username Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Enter Undername
                  </h3>
                  <p className="text-sm text-gray-400">
                    Choose a undername to deploy your site
                  </p>
                </div>
              </div>
              <button
                onClick={handleModalClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                  <User size={16} className="text-blue-400" />
                  <span>UnderName</span>
                </label>
                <input
                  type="text"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  placeholder="Enter your Undername..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && handleDeploy()}
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={handleModalClose}
                  className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30 text-gray-300 hover:text-white rounded-xl transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeploy}
                  disabled={!inputUsername.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:shadow-none"
                >
                  Deploy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPagePreview;