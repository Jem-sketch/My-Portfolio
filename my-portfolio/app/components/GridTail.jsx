"use client";

import { useEffect, useRef } from "react";

import styles from "./GridEffect.module.css";
import { useTheme } from "../context/ThemeContext";


const CELL_SIZE = 40;
const STARTING_ALPHA = 255;
const PROB_OF_NEIGHBOR = 0.5;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1;


export default function GridTail() {
  const canvasRef = useRef(null);

  // Get the shared theme
  const { darkmode } = useTheme();


  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let animationFrameId;


    /* ========================= */
    /* THEME COLOR */
    /* ========================= */

    // Dark mode = white GridTail
    // Light mode = black GridTail
    const COLOR = darkmode ? 255 : 0;


    /* ========================= */
    /* CANVAS SIZE */
    /* ========================= */

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();


    let width = canvas.width;
    let height = canvas.height;

    let numRows = Math.ceil(height / CELL_SIZE);
    let numCols = Math.ceil(width / CELL_SIZE);


    /* ========================= */
    /* MOUSE */
    /* ========================= */

    let mouseX = -1;
    let mouseY = -1;

    let currentRow = -1;
    let currentCol = -1;


    let activeBox = {
      row: -1,
      col: -1,
      opacity: 0,
    };

    let allNeighbors = [];


    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();

      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };


    window.addEventListener(
      "mousemove",
      handleMouseMove
    );


    /* ========================= */
    /* RANDOM NEIGHBORS */
    /* ========================= */

    const getRandomNeighbors = (row, col) => {
      const neighbors = [];


      for (let dRow = -1; dRow <= 1; dRow++) {
        for (let dCol = -1; dCol <= 1; dCol++) {

          if (dRow === 0 && dCol === 0) {
            continue;
          }


          const nRow = row + dRow;
          const nCol = col + dCol;


          const isInBounds =
            nRow >= 0 &&
            nRow < numRows &&
            nCol >= 0 &&
            nCol < numCols;


          if (
            isInBounds &&
            Math.random() < PROB_OF_NEIGHBOR
          ) {
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


    /* ========================= */
    /* RENDER */
    /* ========================= */

    const render = () => {

      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = STROKE_WEIGHT;


      /* ACTIVE MOUSE CELL */

      if (mouseX >= 0 && mouseY >= 0) {

        const row = Math.floor(
          mouseY / CELL_SIZE
        );

        const col = Math.floor(
          mouseX / CELL_SIZE
        );


        if (
          row !== currentRow ||
          col !== currentCol
        ) {

          currentRow = row;
          currentCol = col;


          activeBox = {
            row,
            col,
            opacity: STARTING_ALPHA,
          };


          allNeighbors.push(
            ...getRandomNeighbors(row, col)
          );

        } else {

          activeBox.opacity = Math.max(
            0,
            activeBox.opacity - AMT_FADE_PER_FRAME
          );
        }


        /* DRAW ACTIVE BOX */

        if (activeBox.opacity > 0) {

          const x =
            activeBox.col * CELL_SIZE;

          const y =
            activeBox.row * CELL_SIZE;


          ctx.strokeStyle = `rgba(
            ${COLOR},
            ${COLOR},
            ${COLOR},
            ${activeBox.opacity / 255}
          )`;


          ctx.strokeRect(
            x,
            y,
            CELL_SIZE,
            CELL_SIZE
          );
        }
      }


      /* DRAW NEIGHBORS */

      allNeighbors.forEach((neighbor) => {

        neighbor.opacity = Math.max(
          0,
          neighbor.opacity - AMT_FADE_PER_FRAME
        );


        const x =
          neighbor.col * CELL_SIZE;

        const y =
          neighbor.row * CELL_SIZE;


        ctx.strokeStyle = `rgba(
          ${COLOR},
          ${COLOR},
          ${COLOR},
          ${neighbor.opacity / 255}
        )`;


        ctx.strokeRect(
          x,
          y,
          CELL_SIZE,
          CELL_SIZE
        );
      });


      /* REMOVE EXPIRED */

      allNeighbors = allNeighbors.filter(
        (neighbor) => neighbor.opacity > 0
      );


      animationFrameId =
        requestAnimationFrame(render);
    };


    render();


    /* ========================= */
    /* RESIZE */
    /* ========================= */

    const handleResize = () => {

      resizeCanvas();

      width = canvas.width;
      height = canvas.height;

      numRows = Math.ceil(
        height / CELL_SIZE
      );

      numCols = Math.ceil(
        width / CELL_SIZE
      );
    };


    window.addEventListener(
      "resize",
      handleResize
    );


    /* ========================= */
    /* CLEANUP */
    /* ========================= */

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      cancelAnimationFrame(
        animationFrameId
      );
    };

  }, [darkmode]);


  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
      />
    </div>
  );
}