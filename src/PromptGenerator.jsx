import React, { useState } from 'react';

export default function PromptGenerator() {
  const [formData, setFormData] = useState({
    render_type: '',
    subject: '',
    environment: '',
    style: '',
    camera: '',
    clothing: '',
    lighting: '',
    effects: '',
    mood: '',
  });

  const [jsonOutput, setJsonOutput] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateJSON = () => {
    const json = {
      render_type: formData.render_type,
      subject: {
        type: formData.subject,
      },
      environment: {
        setting: formData.environment,
      },
      style: {
        genre: formData.style,
        mood: formData.mood,
      },
      camera_settings: {
        lens: formData.camera,
      },
      clothing: formData.clothing,
      lighting: formData.lighting,
      special_effects: formData.effects,
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
    <div style={{ padding: '1.5rem', maxWidth: '600px', margin: 'auto' }}>
      <h1
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginBottom: '1rem',
        }}
      >
        MyScene AI — Prompt Generator
      </h1>

      <div
        style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '1rem',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'grid', gap: '1rem' }}>
          <input
            name="render_type"
            placeholder="🎬 Render Type"
            value={formData.render_type}
            onChange={handleChange}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
            }}
          />
          <input
            name="subject"
            placeholder="🧍 Subject Type"
            value={formData.subject}
            onChange={handleChange}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
            }}
          />
          <input
            name="environment"
            placeholder="🌋 Environment"
            value={formData.environment}
            onChange={handleChange}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
            }}
          />
          <input
            name="style"
            placeholder="🎨 Style Genre"
            value={formData.style}
            onChange={handleChange}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
            }}
          />
          <input
            name="mood"
            placeholder="🔴 Mood (NEW)"
            value={formData.mood}
            onChange={handleChange}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid red',
            }}
          />
          <input
            name="camera"
            placeholder="📸 Camera Lens"
            value={formData.camera}
            onChange={handleChange}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
            }}
          />
          <input
            name="clothing"
            placeholder="🔴 Clothing (NEW)"
            value={formData.clothing}
            onChange={handleChange}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid red',
            }}
          />
          <input
            name="lighting"
            placeholder="🔴 Lighting (NEW)"
            value={formData.lighting}
            onChange={handleChange}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid red',
            }}
          />
          <input
            name="effects"
            placeholder="🔴 Special Effects (NEW)"
            value={formData.effects}
            onChange={handleChange}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid red',
            }}
          />
          <button
            onClick={generateJSON}
            style={{
              padding: '0.75rem',
              borderRadius: '0.5rem',
              backgroundColor: '#22c55e',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            🚀 Generate JSON Prompt
          </button>
        </div>
      </div>

      {jsonOutput && (
        <div
          style={{
            boxShadow: '0 4px 12px rgba(0,128,0,0.25)',
            borderRadius: '1rem',
            padding: '1rem',
            border: '2px solid #16a34a',
          }}
        >
          <h2
            style={{
              fontWeight: 'bold',
              fontSize: '1.25rem',
              marginBottom: '0.5rem',
            }}
          >
            🎯 Generated Prompt
          </h2>
          <textarea
            rows={18}
            readOnly
            value={jsonOutput}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
            }}
          ></textarea>
          <div
            style={{
              marginTop: '0.5rem',
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <button
              onClick={copyToClipboard}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '0.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              📋 Copy
            </button>
            <button
              onClick={downloadTXT}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '0.5rem',
                backgroundColor: '#2563eb',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              ⬇️ Download .txt
            </button>
            <button
              onClick={downloadJSON}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '0.5rem',
                backgroundColor: '#1e40af',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              ⬇️ Download .json
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
