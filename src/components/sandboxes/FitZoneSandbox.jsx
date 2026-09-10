import React, { useState, useEffect } from 'react'
import { Play, RotateCcw, CheckCircle2, Dumbbell, Flame, Timer, Volume2 } from 'lucide-react'
import { sound } from '../../utils/sound'
import { triggerConfetti } from '../../utils/confetti'

export default function FitZoneSandbox() {
  const [exercise, setExercise] = useState('Incline Dumbbell Press')
  const [sets, setSets] = useState([
    { id: 1, weight: 28, reps: 10, completed: true },
    { id: 2, weight: 30, reps: 8, completed: true },
    { id: 3, weight: 32, reps: 8, completed: false }
  ])
  const [currentWeight, setCurrentWeight] = useState(32)
  const [currentReps, setCurrentReps] = useState(8)
  const [restSeconds, setRestSeconds] = useState(0)
  const [isResting, setIsResting] = useState(false)

  // Rest Timer countdown
  useEffect(() => {
    let interval = null
    if (isResting && restSeconds > 0) {
      interval = setInterval(() => {
        setRestSeconds((prev) => {
          if (prev <= 1) {
            setIsResting(false)
            sound.playSuccess()
            return 0
          }
          if (prev <= 4) {
            sound.playHover() // Warning ticks for last 3 seconds
          }
          return prev - 1
        })
      }, 1000)
    } else if (restSeconds === 0) {
      setIsResting(false)
    }
    return () => clearInterval(interval)
  }, [isResting, restSeconds])

  const handleCompleteSet = () => {
    const newSet = {
      id: sets.length + 1,
      weight: Number(currentWeight),
      reps: Number(currentReps),
      completed: true
    }
    setSets([...sets, newSet])
    sound.playSuccess()
    triggerConfetti()

    // Start 30s rest countdown
    setRestSeconds(30)
    setIsResting(true)
  }

  const handleReset = () => {
    setSets([
      { id: 1, weight: 28, reps: 10, completed: true },
      { id: 2, weight: 30, reps: 8, completed: false }
    ])
    setRestSeconds(0)
    setIsResting(false)
    sound.playClick()
  }

  return (
    <div className="bg-gray-950/90 border border-cyan-500/30 rounded-2xl p-5 text-gray-100 font-sans shadow-xl">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-mono tracking-wide text-cyan-300">
              LIVE SIMULATION: ACTIVE WORKOUT ENGINE
            </h4>
            <p className="text-xs text-gray-400">
              Interactive test of FitZone Pro's set tracking, live rest countdown & audio cue architecture
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          data-cursor-text="RESET"
          className="text-xs font-mono text-gray-400 hover:text-cyan-300 flex items-center space-x-1 p-1.5 rounded-lg hover:bg-gray-800 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Exercise Selector & Rest Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-900/70 p-3 rounded-xl border border-gray-800">
          <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
            Target Compound Lift
          </label>
          <select
            value={exercise}
            onChange={(e) => {
              setExercise(e.target.value)
              sound.playClick()
            }}
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-2.5 py-1.5 text-sm text-cyan-300 font-medium focus:outline-none focus:border-cyan-400"
          >
            <option value="Incline Dumbbell Press">Incline Dumbbell Press (Chest / Front Delts)</option>
            <option value="Barbell Back Squat">Barbell Back Squat (Quads / Glutes)</option>
            <option value="Deadlift">Deadlift (Posterior Chain / Lats)</option>
            <option value="Overhead Press">Overhead Press (Shoulders / Triceps)</option>
          </select>
        </div>

        {/* Rest Timer Visualizer */}
        <div
          className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
            isResting
              ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
              : 'bg-gray-900/70 border-gray-800'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
                isResting ? 'bg-cyan-500/20 text-cyan-400 animate-pulse' : 'bg-gray-800 text-gray-400'
              }`}
            >
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                Automated Rest Timer
              </div>
              <div className="text-xl font-mono font-bold text-cyan-300">
                {isResting ? `00:${restSeconds.toString().padStart(2, '0')}` : 'Ready for Set'}
              </div>
            </div>
          </div>
          {isResting && (
            <div className="text-right">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 animate-pulse">
                REST INTERVAL
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Set List */}
      <div className="space-y-2 mb-4">
        <div className="text-xs font-mono text-gray-400 flex justify-between px-2">
          <span>SET / PROGRESSION</span>
          <span>LOAD (KG)</span>
          <span>REPETITIONS</span>
          <span>STATUS</span>
        </div>
        {sets.map((s, idx) => (
          <div
            key={s.id}
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-900/60 border border-gray-800 text-sm"
          >
            <span className="font-mono text-cyan-400 font-bold">#{idx + 1}</span>
            <span className="font-mono text-gray-200">{s.weight} kg</span>
            <span className="font-mono text-gray-200">{s.reps} reps</span>
            <span className="flex items-center space-x-1 text-xs text-emerald-400 font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>Logged</span>
            </span>
          </div>
        ))}
      </div>

      {/* Quick Input Controls */}
      <div className="flex flex-wrap items-center gap-3 bg-gray-900/40 p-3 rounded-xl border border-gray-800/80">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-gray-400">Weight:</span>
          <input
            type="number"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            className="w-16 bg-gray-950 border border-gray-700 rounded px-2 py-1 text-sm font-mono text-center text-cyan-300 focus:outline-none"
          />
          <span className="text-xs text-gray-500">kg</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-gray-400">Reps:</span>
          <input
            type="number"
            value={currentReps}
            onChange={(e) => setCurrentReps(e.target.value)}
            className="w-16 bg-gray-950 border border-gray-700 rounded px-2 py-1 text-sm font-mono text-center text-cyan-300 focus:outline-none"
          />
        </div>

        <button
          onClick={handleCompleteSet}
          data-cursor-text="LOG"
          className="ml-auto px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold font-mono tracking-wider flex items-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>COMPLETE SET & REST (30s)</span>
        </button>
      </div>
    </div>
  )
}
