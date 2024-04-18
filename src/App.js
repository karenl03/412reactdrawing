import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import './App.css';

const ColorPicker = ({ value, onChange }) => {
  return (
    <input
      type="color"
      value={value}
      onChange={onChange}
    />
  );
};

const Slider = ({ value, onChange }) => {
  return (
    <input
      type="range"
      min="1"
      max="15"
      value={value}
      onChange={onChange}
    />
  );
};

const Clear = ({ onClick }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      Clear
    </Button>
  );
};


const Canvas = ({ drawing, color, lineWidth, onMouseDown, onMouseUp }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setCtx(context);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
  }, [color, lineWidth]);

  const handleMouseDown = (event) => {
    onMouseDown(event);
    const { offsetX, offsetY } = event.nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const handleMouseUp = (event) => {
    onMouseUp(event);
    ctx.closePath();
  };

  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="600"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ border: '1px solid black' }}
    />
  );
};


function App() {
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);

  const handleMouseDown = () => {
    setDrawing(true);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleClear = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleLineWidthChange = (e) => {
    setLineWidth(e.target.value);
  };

  return (
    <div className="App" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <Canvas
        drawing={drawing}
        color={color}
        lineWidth={lineWidth}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', paddingTop: '10px' }}>
        <ColorPicker value={color} onChange={handleColorChange} />
        <Slider value={lineWidth} onChange={handleLineWidthChange} />
        <Clear onClick={handleClear} />
      </div>
    </div>
  );
}

export default App;
