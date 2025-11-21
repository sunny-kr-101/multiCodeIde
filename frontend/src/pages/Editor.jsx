import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Editor2 from "@monaco-editor/react";
import { api_base_url } from "../helper";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Editor = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(""); // <-- dynamic language
  const { id } = useParams();
  // const [lastSavedCode, setLastSavedCode] = useState("");(for auto-save feature not implemented yet)

  // ----------------------------------------------------
  // Fetch Project
  // ----------------------------------------------------
  const getCode = async () => {
    try {
      let res = await fetch(api_base_url + "/getProject", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          projectId: id,
        }),
      });

      let data = await res.json();

      if (data.success) {
        setCode(data.project.code);

        // Set Monaco language based on project language
        let lang = data.project.projectLanguage.toLowerCase();

        const langMap = {
          javascript: "javascript",
          python: "python",
          java: "java",
          c: "c",
          "c++": "cpp",
          cpp: "cpp",
          php: "php",
          typescript: "typescript",
        };

        setLanguage(langMap[lang] || "javascript");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching project");
    }
  };

  // ----------------------------------------------------
  // Save Code
  // ----------------------------------------------------
  const saveCode = async () => {
    try {
      let res = await fetch(api_base_url + "/saveProject", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          code: code,
          projectId: id,
        }),
      });

      let data = await res.json();

      if (data.success) {
        toast.success("✅ Code saved successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error saving project");
    }
  };

  {
    /* // Auto Save
  const autoSave = async () => {
    try {
      let res = await fetch(api_base_url + "/saveProject", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          code: code,
          projectId: id,
        }),
      });

      let data = await res.json();
      if (data.success) {
        setLastSavedCode(code);
        toast.info("✨ Auto-saved", { autoClose: 1500 });
      }
    } catch (error) {
      console.log("Auto-save failed:", error);
    }
  };

  // Auto-save interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (code !== lastSavedCode) {
        autoSave();
      }
    }, 10000); // 10s interval

    return () => clearInterval(interval);
  }, [code, lastSavedCode]);
  */
  }

  // ----------------------------------------------------
  // Run Code
  // ----------------------------------------------------
  const runCode = async () => {
    try {
      let res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      });

      let data = await res.json();

      if (data.success) {
        toast.success("💡 Code executed!");
      } else {
        toast.error("Failed to run code");
      }
    } catch (error) {
      toast.error("Error executing code");
    }
  };

  useEffect(() => {
    getCode();
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="flex flex-col md:flex-row gap-3 bg-[#111] p-2"
        style={{ height: "calc(100vh - 90px)" }}
      >
        {/* ---------------- Left Editor ---------------- */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full">
          <Editor2
            value={code}
            onChange={(newCode) => setCode(newCode)}
            theme="vs-dark"
            height="100%"
            language={language} 
            options={{
              minimap: { enabled: false },
              fontSize: 16,
            }}
          />
        </div>

        {/* ---------------- Right Output Panel ---------------- */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-[#191818] text-white rounded-md p-3 overflow-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-b border-[#333] pb-2">
            <h2 className="text-lg font-semibold">Output:</h2>

            <div className="flex gap-3">
              {/* Run Button */}
              <button
                onClick={runCode}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-all"
              >
                Run Code
              </button>

              {/* Save Button */}
              <button
                onClick={saveCode}
                className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition-all"
              >
                Save Code
              </button>
            </div>
          </div>

          {/* (optional output display in future) */}
        </div>
      </div>
    </>
  );
};

export default Editor;
