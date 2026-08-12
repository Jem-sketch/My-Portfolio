"use client";

import React, { useEffect, useRef } from 'react';
import styles from './GridEffect.module.css';

// CONSTANTS
const CELL_SIZE = 40;
const COLOR_R = 255;
const COLOR_G = 255;
const COLOR_B = 255;
const STARTING_ALPHA = 255;
const PROB_OF_NEIGHBOR = 0.5;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1;

export default function GridTail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    let numRows = Math.ceil(height / CELL_SIZE);
    let numCols = Math.ceil(width / CELL_SIZE);
    let currentRow = -1;
    let currentCol = -1;
    let allNeighbors = [];

    // Track active mouse box and its fading opacity
    let activeBox = { row: -1, col: -1, opacity: 0 };

    let mouseX = -1;
    let mouseY = -1;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const getRandomNeighbors = (row, col) => {
      let neighbors = [];
      for (let dRow = -1; dRow <= 1; dRow++) {
        for (let dCol = -1; dCol <= 1; dCol++) {
          if (dRow === 0 && dCol === 0) continue;

          let nRow = row + dRow;
          let nCol = col + dCol;
          let isInBounds = nRow >= 0 && nRow < numRows && nCol >= 0 && nCol < numCols;

          if (isInBounds && Math.random() < PROB_OF_NEIGHBOR) {
            neighbors.push({
              row: nRow,
              col: nCol,
              opacity: STARTING_ALPHA,
            });
          }
        }
      }
      return neighbors;
    };

    const render = () => {
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = STROKE_WEIGHT;

      if (mouseX >= 0 && mouseY >= 0) {
        let row = Math.floor(mouseY / CELL_SIZE);
        let col = Math.floor(mouseX / CELL_SIZE);

        if (row !== currentRow || col !== currentCol) {
          currentRow = row;
          currentCol = col;
          
          // Reset active box to full opacity when moving to a new cell
          activeBox = { row, col, opacity: STARTING_ALPHA };

          let newNeighbors = getRandomNeighbors(row, col);
          allNeighbors.push(...newNeighbors);
        } else {
          // If the mouse is staying still, fade out the active box too
          activeBox.opacity = Math.max(0, activeBox.opacity - AMT_FADE_PER_FRAME);
        }

        // Draw active box using its current fading opacity
        if (activeBox.opacity > 0) {
          let x = activeBox.col * CELL_SIZE;
          let y = activeBox.row * CELL_SIZE;
          ctx.strokeStyle = `rgba(${COLOR_R}, ${COLOR_G}, ${COLOR_B}, ${activeBox.opacity / 255})`;
          ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
        }
      }

      // Draw and update neighbors
      allNeighbors.forEach((neighbor) => {
        neighbor.opacity = Math.max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
        let neighborX = neighbor.col * CELL_SIZE;
        let neighborY = neighbor.row * CELL_SIZE;

        ctx.strokeStyle = `rgba(${COLOR_R}, ${COLOR_G}, ${COLOR_B}, ${neighbor.opacity / 255})`;
        ctx.strokeRect(neighborX, neighborY, CELL_SIZE, CELL_SIZE);
      });

      // Filter out expired neighbors
      allNeighbors = allNeighbors.filter((n) => n.opacity > 0);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      numRows = Math.ceil(height / CELL_SIZE);
      numCols = Math.ceil(width / CELL_SIZE);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}