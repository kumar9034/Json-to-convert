import React, { useState } from "react";
import { ObjectInspector } from "react-inspector";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function App() {
  const [jsonData, setJsonData] = useState({
    userId: 1,
    id: 1,
    title: "Hello World",
    body: "This is body",
  });

  const [inputText, setInputText] = useState(JSON.stringify(jsonData, null, 2));
  const [error, setError] = useState("");

  // Handle textarea input
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setJsonData(parsed);
      setError("");
    } catch {
      setError("Invalid JSON");
    }
  };

  // Beautify JSON
  const handleBeautify = () => {
    try {
      const parsed = JSON.parse(inputText);
      const pretty = JSON.stringify(parsed, null, 4);
      setJsonData(parsed);
      setInputText(pretty);
      setError("");
    } catch {
      setError("Invalid JSON");
    }
  };

  // Add new key/value
  const handleAdd = () => {
    const newData = { ...jsonData, newKey: "New Value" };
    setJsonData(newData);
    setInputText(JSON.stringify(newData, null, 2));
  };

  // Download JSON
  const handleDownloadTreeJSON = () => {
  const blob = new Blob([JSON.stringify(jsonData, null, 4)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "treeData.json";
  link.click();
};

  // Download Word
const handleDownloadWord = () => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun(JSON.stringify(jsonData, null, 4))],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "treeData.docx");
  });
};


  return (
    <div className="p-6 w-full h-screen flex gap-4">
      {/* JSON Input */}
      <div className="w-1/3 h-full flex flex-col">
        <h1 className="text-2xl font-bold mb-4">JSON Input</h1>
        <textarea
          className="w-full h-full p-2 border outline-none rounded shadow resize-none font-mono flex-1"
          value={inputText}
          onChange={handleInputChange}
        />
        {error && <p className="text-red-600 mt-2">{error}</p>}

        <div className="flex gap-2 mt-2">
          <button
            onClick={handleBeautify}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Beautify
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Key
          </button>
          <button
            onClick={handleDownloadTreeJSON}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Download JSON
          </button>
          <button
            onClick={handleDownloadWord}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Download Word
          </button>
        </div>
      </div>

      {/* Tree View */}
      <div className="w-2/3 h-full p-4 border rounded shadow overflow-auto bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">JSON Tree View</h1>
        <ObjectInspector data={jsonData} expandLevel={2} />
      </div>
    </div>
  );
}
