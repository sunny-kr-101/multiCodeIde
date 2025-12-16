import React, { useEffect, useState } from "react";
import Editor2 from "@monaco-editor/react";
import Navbar from "../components/Navbar";
import { api_base_url } from "../helper";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const languageMap = {
  javascript: 63,
  python: 71,
  java: 62,
  c: 50,
  "c++": 54,
  php: 68,
  csharp: 51,
  ruby: 72,
  go: 60,
  rust: 73,
  typescript: 63,
};

export default function Editor() {
  const { id } = useParams();

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  // Fetch project code on load
  useEffect(() => {
    fetchProject();
  }, []);

  async function fetchProject() {
    try {
      const res = await fetch(api_base_url + "/getProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          projectId: id,
        }),
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);

      setCode(data.project.code);

      const lang = data.project.projectLanguage.toLowerCase();
      const map = {
        javascript: "javascript",
        python: "python",
        java: "java",
        c: "c",
        "c++": "cpp",
        cpp: "cpp",
        php: "php",
        typescript: "typescript",
      };
      setLanguage(map[lang] || "javascript");
    } catch {
      toast.error("Error loading project");
    }
  }

  // Save code to backend
  async function saveCode() {
    try {
      const res = await fetch(api_base_url + "/saveProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          code,
          projectId: id,
        }),
      });

      const data = await res.json();
      if (data.success) toast.success("Code saved");
      else toast.error(data.message);
    } catch {
      toast.error("Error saving code");
    }
  }

  // Run code
  async function runCode() {
    setIsRunning(true);
    setOutput("Running...");

    try {
      const res = await fetch(api_base_url + "/runCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: languageMap[language],
          stdin: "",
        }),
      });

      const data = await res.json();
      setOutput(data.output);
    } catch {
      setOutput("Runtime Error");
    }

    setIsRunning(false);
  }

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col md:flex-row bg-[#111] p-2 gap-3"
        style={{ height: "calc(100vh - 90px)" }}
      >
        {/* Code Editor */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full border border-[#333] rounded-md">
          <Editor2
            theme="vs-dark"
            language={language}
            height="100%"
            value={code}
            onChange={setCode}
            options={{
              fontSize: 15,
              minimap: { enabled: false },
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-[#1e1e1e] rounded-md shadow-lg flex flex-col border border-[#333]">
          <div className="flex items-center justify-between px-3 py-2 bg-[#252526] border-b border-[#333] text-gray-200">
            <span className="font-semibold">Output</span>
            <div className="flex gap-2">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >
                {isRunning ? "Running..." : "Run Code"}
              </button>
              <button
                onClick={saveCode}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-white"
              >
                Save
              </button>
            </div>
          </div>
          <div className="flex-1 font-mono text-sm text-green-400 p-3 overflow-auto whitespace-pre-wrap">
            {output}
          </div>
        </div>
      </div>
    </>
  );
}
