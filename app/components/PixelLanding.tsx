"use client";

import { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
}

export default function PixelLanding() {
  const [walletAddress, setwalletAddress] = useState<string>("");
  const [userName, setuserName] = useState<string>("");
  const [userDets, setuserDets] = useState<{
    discription: string;
    profileImg: string;
  }>();

  const [repos, setRepos] = useState(Number);
  const [loading, setLoading] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getXProfile() {
    console.log("clicked");
    setConnectLoading(true);

    try {
      console.log("inside try block");
      const response = await fetch(
        "https://twitter241.p.rapidapi.com/user?" +
          new URLSearchParams({
            username: userName,
          }),
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "a14f36effdmsh8858c00337aaaa1p147670jsnbe5b5ada1624",
            "x-rapidapi-host": "twitter241.p.rapidapi.com",
          },
        }
      );

      const responseData = await response.json();

      const data = {
        userName: userName,
        discription: responseData.result.data.user.result.legacy.description,
        profileImg:
          responseData.result.data.user.result.legacy.profile_image_url_https,
        repos: repos,
      };

      // ✅ Send to your Next.js API route
      await fetch("/api/updatehtml", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Redirect to dashboard after successful completion
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      setConnectLoading(false);
    }
  }

  async function connectWallet() {
    try {
      //@ts-ignore
      if (!window.arweaveWallet) {
        alert("No Arconnect detected");
        return;
      }
      //@ts-ignore
      await window.arweaveWallet.connect(
        ["ACCESS_ADDRESS", "SIGN_TRANSACTION", "ACCESS_TOKENS"],
        {
          name: "Anon",
          logo: "https://arweave.net/jAvd7Z1CBd8gVF2D6ESj7SMCCUYxDX_z3vpp5aHdaYk",
        },
        {
          host: "g8way.io",
          port: 443,
          protocol: "https",
        }
      );
      //@ts-ignore
      const walletAddress = await window.arweaveWallet.getActiveAddress();
      setwalletAddress(walletAddress);
    } catch (error) {
      console.error(error);
    }
  }

  const login = () => {
    console.log("clicked");
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/github/callback`;
    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;

    window.location.href = githubAuthURL;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      setError("No access token found.");
      setLoading(false);
      return;
    }

    fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch repos");
        }
        return res.json();
      })
      .then((data) => {
        setRepos(data.length);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono overflow-hidden relative">
      {/* Pixel grid background */}

      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border border-green-400/20"></div>
          ))}
        </div>
      </div>
      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-green-400/5 to-transparent bg-[length:100%_4px] animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-green-400 tracking-wider">
            {">AO_PAGES"}
          </h1>
          <div className="text-xl md:text-2xl text-green-300 mb-2">
            {"[CONNECTING_DIGITAL_WORLDS]"}
          </div>
          <div className="text-sm text-green-500 animate-pulse">
            {"█ SYSTEM_READY █"}
          </div>
        </div>

        {/* Main container */}
        <div className="bg-black/80 border-4 border-green-400 p-8 md:p-12 max-w-md w-full shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          {/* Terminal-style header */}
          <div className="flex items-center mb-6 pb-4 border-b-2 border-green-400">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 border border-red-400"></div>
              <div className="w-3 h-3 bg-yellow-500 border border-yellow-400"></div>
              <div className="w-3 h-3 bg-green-500 border border-green-400"></div>
            </div>
            <div className="ml-4 text-green-400 text-sm">{"CONNECT.EXE"}</div>
          </div>

          <div className="space-y-6">
            {/* GitHub Connect Button */}
            <div>
              <label className="block text-green-400 text-sm mb-2 uppercase tracking-wide">
                {"> GIT_REPOSITORY"}
              </label>
              <button
                onClick={login}
                className="w-full bg-gray-800 hover:bg-gray-700 border-2 border-green-400 text-green-400 font-bold py-4 px-6 transition-all duration-200 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-[1.02] active:scale-[0.98] group"
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="text-xl">{"⚡"}</div>
                  <span className="text-lg tracking-wider">
                    {repos > 2 ? "CONNECTED" : "CONNECT_GITHUB"}
                  </span>
                  <div className="text-xl group-hover:animate-bounce">
                    {">"}
                  </div>
                </div>
              </button>
            </div>

            {/* Wallet Connect Button */}
            <div>
              <label className="block text-green-400 text-sm mb-2 uppercase tracking-wide">
                {"> CRYPTO_WALLET"}
              </label>
              <button
                onClick={connectWallet}
                className="w-full bg-gray-800 hover:bg-gray-700 border-2 border-green-400 text-green-400 font-bold py-4 px-6 transition-all duration-200 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:scale-[1.02] active:scale-[0.98] group"
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="text-xl">{"💎"}</div>
                  <span className="text-lg tracking-wider">
                    {walletAddress
                      ? walletAddress.slice(0, 20)
                      : "CONNECT_WALLET"}
                  </span>
                  <div className="text-xl group-hover:animate-bounce">
                    {">"}
                  </div>
                </div>
              </button>
            </div>

            {/* X Username Input */}
            <div>
              <label className="block text-green-400 text-sm mb-2 uppercase tracking-wide">
                {"> X_USERNAME"}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 text-lg">
                  {"@"}
                </span>
                <input
                  type="text"
                  placeholder="enter_username"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                  className="w-full bg-gray-800 border-2 border-green-400 text-green-400 placeholder-green-600 py-4 pl-10 pr-4 focus:outline-none focus:shadow-[0_0_15px_rgba(34,197,94,0.5)] focus:scale-[1.02] transition-all duration-200 font-mono text-lg tracking-wider"
                />
              </div>
            </div>

            {/* Status indicator */}
            <div className="pt-4 border-t-2 border-green-400">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-500">{"STATUS:"}</span>
                <button
                  onClick={getXProfile}
                  disabled={connectLoading}
                  className={`text-green-400 transition-all duration-200 ${
                    connectLoading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:text-green-300 cursor-pointer"
                  }`}
                >
                  {connectLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-400 animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-green-400 animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-green-400 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="animate-pulse">{"CONNECTING..."}</span>
                    </div>
                  ) : (
                    <span className="animate-pulse">{"READY_TO_CONNECT"}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="text-green-500 text-sm mb-2">
            {"[POWERED_BY_BLOCKCHAIN_TECHNOLOGY]"}
          </div>
          <div className="text-green-600 text-xs animate-pulse">
            {"█ █ █ SECURE_CONNECTION █ █ █"}
          </div>
        </div>
      </div>

      {/* Floating pixels */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-green-400 animate-ping"></div>
      <div className="absolute top-30 left-30 w-2 h-2 bg-green-400 animate-ping"></div>
      <div className="absolute top-56 right-56 w-2 h-2 bg-green-400 animate-ping"></div>
      <div className="absolute bottm-30 left-30 w-2 h-2 bg-green-400 animate-ping"></div>
      <div className="absolute top-42 left-12 w-2 h-2 bg-green-400 animate-ping"></div>
      <div className="absolute top-10 left-10 w-2 h-2 bg-green-400 animate-ping"></div>
      <div className="absolute top-20 right-20 w-2 h-2 bg-green-400 animate-ping delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-green-400 animate-ping delay-2000"></div>
      <div className="absolute bottom-10 right-10 w-2 h-2 bg-green-400 animate-ping delay-500"></div>
    </div>
  );
}
