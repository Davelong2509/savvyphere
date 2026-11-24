
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

export default function AnimatedLogo() {
  const reduceMotion = useReducedMotion();
  const id = useId();

  const ease = [0.16, 1, 0.3, 1];

  return (
    <motion.svg
      viewBox="0 0 500 280"
      xmlns="http://www.w3.org/2000/svg"
      className="savvy-animated-logo"
      role="img"
      aria-label="SavvySphere"
    >
      <defs>
        {/* Purple metallic gradient */}
        <linearGradient
          id={`${id}-purple`}
          x1="0%"
          y1="20%"
          x2="100%"
          y2="80%"
        >
          <stop offset="0%" stopColor="#6A1C75" />
          <stop offset="25%" stopColor="#B34AB4" />
          <stop offset="50%" stopColor="#5D165F" />
          <stop offset="80%" stopColor="#350B3D" />
          <stop offset="100%" stopColor="#98488B" />
        </linearGradient>

        {/* Black metallic gradient */}
        <linearGradient
          id={`${id}-metal`}
          x1="0%"
          y1="80%"
          x2="100%"
          y2="10%"
        >
          <stop offset="0%" stopColor="#303030" />
          <stop offset="35%" stopColor="#686868" />
          <stop offset="55%" stopColor="#232323" />
          <stop offset="80%" stopColor="#E4E4E4" />
          <stop offset="100%" stopColor="#3C3C3C" />
        </linearGradient>

        {/* Purple sphere */}
        <radialGradient
          id={`${id}-sphere`}
          cx="30%"
          cy="20%"
          r="80%"
        >
          <stop offset="0%" stopColor="#F1B6E9" />
          <stop offset="35%" stopColor="#A137A8" />
          <stop offset="100%" stopColor="#3C0B43" />
        </radialGradient>

        <filter
          id={`${id}-shadow`}
          x="-30%"
          y="-30%"
          width="160%"
          height="170%"
        >
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="4"
            floodOpacity=".2"
          />
        </filter>
      </defs>

      <g
        transform="translate(104 0) scale(1.32)"
        filter={`url(#${id}-shadow)`}
      >
        {/* Orbital ring */}
        <motion.path
          d="
            M140 57
            C195 39 220 48 213 66
            C209 77 196 88 184 96

            M47 98
            C-5 126 1 147 38 146
          "
          fill="none"
          stroke="#70217D"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{
            pathLength: reduceMotion ? 1 : 0,
            opacity: reduceMotion ? 1 : 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={{
            duration: reduceMotion ? 0 : 1.2,
            delay: reduceMotion ? 0 : 0.65,
            ease,
          }}
        />

        {/* Upper purple ribbon */}
        <motion.g
          initial={
            reduceMotion
              ? false
              : {
                  x: -65,
                  y: -40,
                  rotate: -25,
                  scale: 0.8,
                  opacity: 0,
                }
          }
          animate={{
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: reduceMotion ? 0 : 1.25,
            ease,
          }}
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        >
          <path
            d="
              M164 8
              C100 18 33 38 38 67
              C40 90 79 104 118 113
              L136 94
              C89 76 66 63 94 49
              C111 39 138 34 164 28Z
            "
            fill="#310B39"
            transform="translate(0 5)"
          />

          <path
            d="
              M164 8
              C100 18 33 38 38 67
              C40 90 79 104 118 113
              L136 94
              C89 76 66 63 94 49
              C111 39 138 34 164 28Z
            "
            fill={`url(#${id}-purple)`}
          />
        </motion.g>

        {/* Lower metallic ribbon */}
        <motion.g
          initial={
            reduceMotion
              ? false
              : {
                  x: 65,
                  y: 40,
                  rotate: 25,
                  scale: 0.8,
                  opacity: 0,
                }
          }
          animate={{
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: reduceMotion ? 0 : 1.25,
            delay: reduceMotion ? 0 : 0.15,
            ease,
          }}
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        >
          <path
            d="
              M102 66
              C173 70 196 97 166 121
              C139 143 88 148 44 160
              V139
              C44 127 81 121 115 106
              C151 90 130 76 102 66Z
            "
            fill="#242424"
            transform="translate(0 5)"
          />

          <path
            d="
              M102 66
              C173 70 196 97 166 121
              C139 143 88 148 44 160
              V139
              C44 127 81 121 115 106
              C151 90 130 76 102 66Z
            "
            fill={`url(#${id}-metal)`}
          />
        </motion.g>

        {/* Orbiting purple sphere */}
        <motion.g
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: reduceMotion ? 0 : 0.65,
            duration: reduceMotion ? 0 : 0.4,
          }}
        >
          {reduceMotion ? (
            <circle
              cx="175"
              cy="48"
              r="7"
              fill={`url(#${id}-sphere)`}
            />
          ) : (
            <circle
              r="7"
              fill={`url(#${id}-sphere)`}
            >
              <animateMotion
                begin="0.65s"
                dur="1.6s"
                fill="freeze"
                path="
                  M175 48
                  C235 35 230 84 145 119
                  C62 156 -8 162 12 128
                  C35 91 121 56 175 48
                "
              />
            </circle>
          )}
        </motion.g>
      </g>

      {/* Savvy wordmark */}
      <motion.text
        x="232"
        y="258"
        textAnchor="end"
        fontFamily="Arial, sans-serif"
        fontSize="55"
        fontWeight="600"
        letterSpacing="-3"
        fill="#242424"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 24 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          delay: reduceMotion ? 0 : 1.4,
          ease,
        }}
      >
        Savvy
      </motion.text>

      {/* Sphere wordmark */}
      <motion.text
        x="230"
        y="258"
        fontFamily="Arial, sans-serif"
        fontSize="55"
        fontWeight="600"
        letterSpacing="-3"
        fill="#64206E"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 24 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          delay: reduceMotion ? 0 : 1.55,
          ease,
        }}
      >
        Sphere
      </motion.text>
    </motion.svg>
  );
}
