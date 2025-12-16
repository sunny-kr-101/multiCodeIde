import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { api_base_url } from "../helper.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name") || "Coder";

  // Modal States
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [isEditModelShow, setIsEditModelShow] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Options State
  const [options, setOptions] = useState([]);
  const [projects, setProjects] = useState(null);

  // Date Formatter
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Icons
  const languageIcons = {
    python: "https://img.icons8.com/?size=100&id=13441&format=png&color=000000",
    javascript:
      "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
    c: "https://img.icons8.com/?size=100&id=40670&format=png&color=000000",
    "c++": "https://img.icons8.com/?size=100&id=40669&format=png&color=000000",
    java: "https://img.icons8.com/?size=100&id=13679&format=png&color=000000",
    php: "https://img.icons8.com/nolan/64/php--v2.png",
    typescript: "https://img.icons8.com/color/48/typescript.png",
  };

  // CREATE PROJECT
  const createProject = async () => {
    let res = await fetch(api_base_url + "/createProject", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        projectLanguage: selectedLanguage.value,
        token: localStorage.getItem("token"),
      }),
    });

    const data = await res.json();

    if (data.success) {
      navigate("/editor/" + data.projectId);
    } else {
      toast.error("⚠️ Failed to create project. Try again.");
    }
  };

  // UPDATE PROJECT
  const updateProject = async () => {
    if (!name.trim()) return toast.error("Project name is required!");
    if (!selectedLanguage) return toast.error("Please select a language!");

    let res = await fetch(api_base_url + "/editProject", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: editingProjectId,
        name,
        projectLanguage: selectedLanguage.value,
        token: localStorage.getItem("token"),
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Project updated!");
      setIsEditModelShow(false);
      setEditingProjectId(null);
      setName("");
      setSelectedLanguage(null);
      getProjects(); // Refresh list
    } else {
      toast.error("⚠️ Failed to update project. Try again.");
    }
  };

  // DELETE PROJECT
  const deleteProject = async (id) => {
    let confirmDelete = confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    let res = await fetch(api_base_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: id,
        token: localStorage.getItem("token"),
      }),
    });

    const data = await res.json();

    if (data.success) {
      getProjects();
      toast.success("Project deleted.");
    } else {
      toast.error("⚠️ Failed to delete project. Try again.");
    }
  };

  // Fetch selective runtimes
  const getRunTimes = async () => {
    let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
    let data = await res.json();

    const finalOptions = [
      "python",
      "javascript",
      "c",
      "c++",
      "java",
      "php",
      "typescript",
    ]
      .map((lang) => {
        const runtime = data.find((item) => item.language === lang);
        return runtime
          ? {
              label: `${runtime.language.toUpperCase()} (${runtime.version})`,
              value: runtime.language,
            }
          : null;
      })
      .filter(Boolean);

    setOptions(finalOptions);
  };

  // FETCH PROJECTS
  const getProjects = async () => {
    let res = await fetch(api_base_url + "/getProjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    });

    const data = await res.json();

    if (data.success) setProjects(data.projects);
    else toast.error("⚠️ Failed to fetch projects");
  };

  useEffect(() => {
    getRunTimes();
    getProjects();
  }, []);

  // React-Select Styles
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1a1a1a",
      borderColor: "#333",
      padding: "6px",
      borderRadius: "10px",
      boxShadow: "none",
      color: "white",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1a1a1a",
      borderRadius: "10px",
      marginTop: "4px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#333" : "#1a1a1a",
      color: "white",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      <Navbar />

      {/* Top Bar */}
      <div className="flex px-6 md:px-[100px] items-center justify-between mt-5">
        <h3 className="text-lg md:text-xl">Hii 👋, {userName ? userName : "user"}</h3>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsCreateModelShow(true)}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-800 transition"
        >
          Create Project
        </motion.button>
      </div>

    
{/* Projects List */}
<div className="px-6 md:px-[100px] mt-5 space-y-5">
  {projects && projects.length > 0
    ? projects.map((project) => (
        <div
          key={project._id}
          onClick={() => navigate("/editor/" + project._id)}
          className="project w-full p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center md:justify-between bg-[#0F0E0E] rounded-xl border border-white/10 cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-200"
        >
          <div className="flex items-center gap-4 w-full">
            <img
              src={languageIcons[project.projectLanguage]}
              alt={project.projectLanguage}
              className="w-[55px]"
            />
            <div>
              <h3 className="text-lg md:text-xl">{project.name}</h3>
              <p className="text-sm text-gray-500">{formatDate(project.date)}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditModelShow(true);
                setEditingProjectId(project._id);
                setName(project.name);
                setSelectedLanguage({
                  label: project.projectLanguage,
                  value: project.projectLanguage,
                });
              }}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-800 transition"
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteProject(project._id);
              }}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-800 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    : "No projects found. Create a new project to get started."}
</div>



      {/* Create & Edit Modals */}
      <AnimatePresence>
        {/* CREATE MODAL */}
        {isCreateModelShow && (
          <ModalWrapper close={() => setIsCreateModelShow(false)}>
            <h2 className="text-xl font-semibold mb-5">Create New Project</h2>

            <ModalForm
              name={name}
              setName={setName}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              options={options}
              customSelectStyles={customSelectStyles}
              buttonText="Create Project"
              buttonAction={createProject}
              disabled={!name || !selectedLanguage}
            />
          </ModalWrapper>
        )}

        {/* EDIT MODAL */}
        {isEditModelShow && (
          <ModalWrapper
            close={() => {
              setIsEditModelShow(false);
              setEditingProjectId(null);
              setName("");
              setSelectedLanguage(null);
            }}
          >
            <h2 className="text-xl font-semibold mb-5">Edit Project</h2>

            <ModalForm
              name={name}
              setName={setName}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              options={options}
              customSelectStyles={customSelectStyles}
              buttonText="Save Changes"
              buttonAction={updateProject}
              disabled={!name || !selectedLanguage}
            />
          </ModalWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- REUSABLE MODAL COMPONENT ---------- */
const ModalWrapper = ({ children, close }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-[#0F0E0E] p-6 md:p-8 rounded-2xl w-full max-w-[400px] shadow-xl border border-white/10 relative"
    >
      <button
        onClick={close}
        className="absolute top-3 right-3 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      {children}
    </motion.div>
  </motion.div>
);

/* ---------- REUSABLE FORM INSIDE MODAL ---------- */
const ModalForm = ({
  name,
  setName,
  selectedLanguage,
  setSelectedLanguage,
  options,
  customSelectStyles,
  buttonText,
  buttonAction,
  disabled,
}) => (
  <div className="flex flex-col gap-4">
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      type="text"
      className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-800"
      placeholder="Enter project name"
    />

    <Select
      options={options}
      placeholder="Select language"
      styles={customSelectStyles}
      value={selectedLanguage}
      onChange={(val) => setSelectedLanguage(val)}
    />

    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.92 }}
      onClick={buttonAction}
      disabled={disabled}
      className={`w-full py-2 rounded-lg transition ${
        disabled
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-800 cursor-pointer"
      }`}
    >
      {buttonText}
    </motion.button>
  </div>
);

export default Home;
