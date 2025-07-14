// PromptGenerator.jsx — Versión Avanzada
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";

export default function PromptGenerator() {
  const [formData, setFormData] = useState({
    render_type: '',
    subject: '',
    environment: '',
    style: '',
    camera: '',
    clothing: '', // 🔴 NUEVO CAMPO
    lighting: '', // 🔴 NUEVO CAMPO
    effects: '',  // 🔴 NUEVO CAMPO
    mood: '',     // 🔴 NUEVO CAMPO
  });

  const [jsonOutput, setJsonOutput] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateJSON = () => {
    const json = {
      render_type: formData.render_type,
      subject: {
        type: formData.subject
      },
      environment: {
        setting: formData.environment
      },
      style: {
        genre: formData.style,
        mood: formData.mood // 🔴 NUEVO CAMPO
      },
      camera_settings: {
        lens: formData.camera
      },
      clothing: formData.clothing, // 🔴 NUEVO CAMPO
      lighting: formData.lighting, // 🔴 NUEVO CAMPO
      special_effects: formData.effects // 🔴 NUEVO CAMPO
    };
    setJsonOutput(JSON.stringify(json, null, 2));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
  };

  const downloadJSON = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prompt.json';
    link.click();
  };

  const downloadTXT = () => {
    const blob = new Blob([jsonOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prompt.txt';
    link.click();
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center">MyScene AI — Prompt Generator</h1>

      <Card className="shadow-xl rounded-2xl">
        <CardContent className="grid gap-4 p-6">
          <input name="render_type" placeholder="🎬 Render Type" className="border rounded p-2" value={formData.render_type} onChange={handleChange} />
          <input name="subject" placeholder="🧍 Subject Type" className="border rounded p-2" value={formData.subject} onChange={handleChange} />
          <input name="environment" placeholder="🌋 Environment" className="border rounded p-2" value={formData.environment} onChange={handleChange} />
          <input name="style" placeholder="🎨 Style Genre" className="border rounded p-2" value={formData.style} onChange={handleChange} />
          <input name="mood" placeholder="🔴 Mood (NEW)" className="border border-red-500 rounded p-2" value={formData.mood} onChange={handleChange} />
          <input name="camera" placeholder="📸 Camera Lens" className="border rounded p-2" value={formData.camera} onChange={handleChange} />
          <input name="clothing" placeholder="🔴 Clothing (NEW)" className="border border-red-500 rounded p-2" value={formData.clothing} onChange={handleChange} />
          <input name="lighting" placeholder="🔴 Lighting (NEW)" className="border border-red-500 rounded p-2" value={formData.lighting} onChange={handleChange} />
          <input name="effects" placeholder="🔴 Special Effects (NEW)" className="border border-red-500 rounded p-2" value={formData.effects} onChange={handleChange} />
          <Button className="w-full" onClick={generateJSON}>🚀 Generate JSON Prompt</Button>
        </CardContent>
      </Card>

      {jsonOutput && (
        <Card className="shadow-lg border-2 border-emerald-600">
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">🎯 Generated Prompt</h2>
            <Textarea rows={18} value={jsonOutput} readOnly className="text-sm font-mono" />
            <div className="flex gap-2">
              <Button onClick={copyToClipboard}><Copy className="w-4 h-4 mr-1" /> Copy</Button>
              <Button onClick={downloadTXT}>⬇️ Download .txt</Button>
              <Button onClick={downloadJSON}>⬇️ Download .json</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}