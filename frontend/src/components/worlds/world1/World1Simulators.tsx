import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Layers,
  Play,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Terminal,
  Activity,
  Sliders,
  GitBranch,
} from 'lucide-react';

interface World1SimulatorsProps {
  type: string;
}

export const World1Simulators: React.FC<World1SimulatorsProps> = ({ type }) => {
  // ── 1. CPU-RAM PIPELINE STATE ──────────────────────────────────────
  const [cpuStep, setCpuStep] = useState<number>(0);
  const cpuInstructions = [
    { rip: '0x00401000', asm: 'MOV [0x7ffd01], 15', desc: 'Fetch & Decode: Store 15 into stack variable a' },
    { rip: '0x00401007', asm: 'MOV [0x7ffd05], 25', desc: 'Fetch & Decode: Store 25 into stack variable b' },
    { rip: '0x0040100e', asm: 'ADD %eax, %ebx -> %eax (40)', desc: 'ALU Execute: 15 + 25 = 40' },
    { rip: '0x00401015', asm: 'WRITE_STDOUT "40"', desc: 'Memory/IO: Flush character buffer to terminal' },
  ];

  // ── 2. VARIABLE MEMORY BOX STATE ──────────────────────────────────
  const [varScore, setVarScore] = useState<number>(100);
  const [varAddress] = useState<string>('0x7ffd98b4');

  // ── 3. CONDITION FLOW STATE ────────────────────────────────────────
  const [condBalance, setCondBalance] = useState<number>(500);
  const [condPrice, setCondPrice] = useState<number>(1200);
  const [condIsPremium, setCondIsPremium] = useState<boolean>(true);

  // ── 4. LOOP EXECUTION STATE ────────────────────────────────────────
  const [loopN, setLoopN] = useState<number>(5);
  const [loopCurrentI, setLoopCurrentI] = useState<number>(1);
  const [loopFactorial, setLoopFactorial] = useState<number>(1);
  const [loopDone, setLoopDone] = useState<boolean>(false);

  // ── 5. POINTER ADDRESS SIMULATOR STATE ─────────────────────────────
  const [targetVal, setTargetVal] = useState<number>(42);
  const [targetAddr] = useState<string>('0x7ffd10');
  const [ptrAddr] = useState<string>('0x7ffd20');

  // ── 6. ARRAY MEMORY STATE ──────────────────────────────────────────
  const [selectedArrIdx, setSelectedArrIdx] = useState<number | null>(null);

  // ── 7. COMPLEXITY GRAPH STATE ──────────────────────────────────────
  const [nVal, setNVal] = useState<number>(100);

  // ── 8. CALL STACK STATE ────────────────────────────────────────────
  const [stackFrames, setStackFrames] = useState<Array<{ name: string; vars: string }>>([
    { name: 'main()', vars: 'sum=uninit' }
  ]);

  return (
    <div className="p-6 rounded-3xl bg-[#06080D] border border-cyan-500/30 shadow-2xl font-sans select-none text-[#F5F3EE] space-y-4">
      {/* ── 1. CPU-RAM PIPELINE SIMULATOR ──────────────────────────── */}
      {type === 'cpu_ram_pipeline' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Cpu className="w-4 h-4" /> HARDWARE EXECUTION SIMULATOR: VON NEUMANN PIPELINE
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCpuStep((s) => (s + 1) % cpuInstructions.length)}
                className="px-3 py-1 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-1 shadow"
              >
                <SkipForward className="w-3.5 h-3.5" /> Next Clock Cycle
              </button>
              <button
                onClick={() => setCpuStep(0)}
                className="p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CPU Registers */}
            <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800 space-y-2">
              <div className="text-[10px] font-bold text-zinc-400 uppercase">CPU INTERNAL REGISTERS</div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-[#06080D] border border-zinc-800">
                  <span className="text-zinc-500">Instruction Pointer (%rip):</span>
                  <span className="text-cyan-300 font-bold">{cpuInstructions[cpuStep].rip}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#06080D] border border-zinc-800">
                  <span className="text-zinc-500">Current Opcode (IR):</span>
                  <span className="text-amber-300 font-bold">{cpuInstructions[cpuStep].asm}</span>
                </div>
              </div>
            </div>

            {/* RAM Stack Memory */}
            <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800 space-y-2">
              <div className="text-[10px] font-bold text-zinc-400 uppercase">MAIN MEMORY (RAM) STACK CELLS</div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-[#06080D] border border-zinc-800">
                  <span className="text-zinc-500">Address 0x7ffd01 (var a):</span>
                  <span className="text-emerald-400 font-bold">{cpuStep >= 0 ? '15 (0x0F)' : 'uninitialized'}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#06080D] border border-zinc-800">
                  <span className="text-zinc-500">Address 0x7ffd05 (var b):</span>
                  <span className="text-emerald-400 font-bold">{cpuStep >= 1 ? '25 (0x19)' : 'uninitialized'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-cyan-300">
            <strong>Active Cycle Step {cpuStep + 1}:</strong> {cpuInstructions[cpuStep].desc}
          </div>
        </div>
      )}

      {/* ── 2. VARIABLE MEMORY BOX SIMULATOR ────────────────────────── */}
      {type === 'variable_memory_box' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-cyan-400 font-bold">
            <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> VARIABLE MEMORY SLOT INSPECTOR</span>
            <span className="text-zinc-500 text-[10px]">Type: int (4 Bytes)</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D1117] border border-zinc-800 flex flex-col sm:flex-row items-center justify-around gap-6">
            <div className="text-center space-y-1">
              <span className="text-zinc-500 text-[10px] block">IDENTIFIER NAME</span>
              <span className="text-lg font-black text-cyan-400">score</span>
            </div>

            <div className="w-32 h-24 rounded-2xl bg-cyan-950/40 border-2 border-cyan-400 flex flex-col items-center justify-center p-2 shadow-lg shadow-cyan-950/50">
              <span className="text-[10px] text-zinc-400">4-BYTE RAM BOX</span>
              <span className="text-2xl font-black text-white">{varScore}</span>
            </div>

            <div className="text-center space-y-1">
              <span className="text-zinc-500 text-[10px] block">RAM MEMORY ADDRESS (&score)</span>
              <span className="text-sm font-bold text-amber-400 bg-black/40 px-3 py-1 rounded-lg border border-zinc-800">
                {varAddress}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center pt-2">
            <span className="text-zinc-400">Mutate Value in RAM:</span>
            {[50, 100, 250, 999].map((val) => (
              <button
                key={val}
                onClick={() => setVarScore(val)}
                className={`px-3 py-1 rounded-xl font-bold border transition-all ${
                  varScore === val
                    ? 'bg-cyan-500 text-black border-cyan-400'
                    : 'bg-[#0D1117] border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                score = {val}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. CONDITIONAL BRANCH FLOW ──────────────────────────────── */}
      {type === 'condition_flow' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-amber-400 font-bold">
            <span className="flex items-center gap-1.5"><GitBranch className="w-4 h-4" /> CONDITIONAL DECISION BRANCH</span>
            <span className="text-zinc-500 text-[10px]">Short-Circuit Evaluator</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-[#0D1117] border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500">Balance ($)</span>
              <input
                type="number"
                value={condBalance}
                onChange={(e) => setCondBalance(Number(e.target.value))}
                className="w-full bg-black/40 text-white p-1 rounded border border-zinc-700 outline-none"
              />
            </div>
            <div className="p-3 rounded-xl bg-[#0D1117] border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500">Item Price ($)</span>
              <input
                type="number"
                value={condPrice}
                onChange={(e) => setCondPrice(Number(e.target.value))}
                className="w-full bg-black/40 text-white p-1 rounded border border-zinc-700 outline-none"
              />
            </div>
            <div className="p-3 rounded-xl bg-[#0D1117] border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500">Premium Member</span>
              <button
                onClick={() => setCondIsPremium(!condIsPremium)}
                className={`w-full p-1 rounded font-bold border ${
                  condIsPremium ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                }`}
              >
                {condIsPremium ? 'TRUE' : 'FALSE'}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase">Evaluated Branch Outcome:</span>
              <div className="text-sm font-bold text-white mt-0.5">
                {condBalance >= condPrice || (condIsPremium && condBalance >= condPrice * 0.5) ? (
                  <span className="text-emerald-400">✓ If-Block Executed (Transaction Approved)</span>
                ) : (
                  <span className="text-rose-400">✗ Else-Block Executed (Declined: Insufficient Funds)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. LOOP EXECUTION STEPPER ──────────────────────────────── */}
      {type === 'loop_execution' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-emerald-400 font-bold">
            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4" /> LOOP ACCUMULATOR STEPPER</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (loopCurrentI < loopN) {
                    const nextI = loopCurrentI + 1;
                    setLoopCurrentI(nextI);
                    setLoopFactorial((f) => f * nextI);
                  } else {
                    setLoopDone(true);
                  }
                }}
                disabled={loopDone}
                className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold disabled:opacity-40"
              >
                Next Iteration Step
              </button>
              <button
                onClick={() => {
                  setLoopCurrentI(1);
                  setLoopFactorial(1);
                  setLoopDone(false);
                }}
                className="p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">LOOP COUNTER (i)</span>
              <span className="text-2xl font-black text-cyan-400">{loopCurrentI}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">CONDITION (i &lt;= {loopN})</span>
              <span className="text-2xl font-black text-emerald-400">{loopCurrentI <= loopN ? 'TRUE' : 'FALSE'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0D1117] border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">ACCUMULATOR (factorial)</span>
              <span className="text-2xl font-black text-amber-400">{loopFactorial}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. POINTER ADDRESS SIMULATOR ───────────────────────────── */}
      {type === 'pointer_address' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-purple-400 font-bold">
            <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> POINTER & DEREFERENCE INDIRECTION</span>
            <span className="text-zinc-500 text-[10px]">64-Bit Address Architecture</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Target Variable Box */}
            <div className="p-5 rounded-2xl bg-[#0D1117] border border-cyan-500/40 space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span className="text-cyan-300 font-bold">TARGET VARIABLE (int target)</span>
                <span className="text-[10px] text-amber-400">{targetAddr}</span>
              </div>
              <div className="p-4 rounded-xl bg-black/40 text-center text-3xl font-black text-white">
                {targetVal}
              </div>
              <span className="text-[10px] text-zinc-500 block text-center">sizeof(target) = 4 bytes</span>
            </div>

            {/* Pointer Variable Box */}
            <div className="p-5 rounded-2xl bg-[#0D1117] border border-purple-500/40 space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span className="text-purple-300 font-bold">POINTER (int* ptr)</span>
                <span className="text-[10px] text-amber-400">{ptrAddr}</span>
              </div>
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800 text-center text-xl font-mono font-bold text-purple-300">
                {targetAddr} ➔
              </div>
              <span className="text-[10px] text-zinc-500 block text-center">sizeof(ptr) = 8 bytes (holds target address)</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="text-zinc-400">Mutate via Dereference (*ptr = value):</span>
            {[100, 500, 999].map((val) => (
              <button
                key={val}
                onClick={() => setTargetVal(val)}
                className="px-3 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
              >
                *ptr = {val}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── 6. ARRAY CONTIGUOUS MEMORY VISUALIZER ───────────────────── */}
      {type === 'array_memory' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-cyan-400 font-bold">
            <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> CONTIGUOUS ARRAY MEMORY</span>
            <span className="text-zinc-500 text-[10px]">Element Size: 4 Bytes (int)</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[10, 20, 30, 40, 50].map((val, idx) => {
              const baseAddr = 1000;
              const addr = baseAddr + idx * 4;
              const isSelected = selectedArrIdx === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedArrIdx(idx)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center w-24 ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                      : 'border-zinc-800 bg-[#0D1117] text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-[9px] text-zinc-500">Index {idx}</div>
                  <div className="text-lg font-black text-white py-1">{val}</div>
                  <div className="text-[9px] text-amber-400">{addr}</div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 space-y-2">
            <div className="text-zinc-400 text-[11px]">
              <strong>Memory Offset Formula:</strong> Address = Base + Index × TypeSize
            </div>
            {selectedArrIdx !== null ? (
              <div className="text-xs text-cyan-300">
                Evaluating arr[{selectedArrIdx}]: Base address 1000 + ({selectedArrIdx} × 4 bytes) ={' '}
                <strong className="text-amber-400">{1000 + selectedArrIdx * 4}</strong>
              </div>
            ) : (
              <div className="text-xs text-zinc-500 italic">Click an array cell above to compute its exact RAM byte address.</div>
            )}
          </div>
        </div>
      )}

      {/* ── 7. COMPLEXITY GRAPH SCALING SIMULATOR ─────────────────── */}
      {type === 'complexity_graph' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-cyan-400 font-bold">
            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4" /> ASYMPTOTIC COMPLEXITY GROWTH SCALING</span>
            <span className="text-zinc-500 text-[10px]">Operations vs Input Size N</span>
          </div>

          <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-900 flex items-center justify-between gap-4">
            <span className="text-zinc-400 shrink-0">Slide to scale N:</span>
            <input
              type="range"
              min="10"
              max="5000"
              step="50"
              value={nVal}
              onChange={(e) => setNVal(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-cyan-400 font-bold shrink-0">N = {nVal}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3.5 rounded-xl bg-[#0D1117] border border-zinc-855">
              <span className="text-zinc-500 block text-[9px]">O(1) CONSTANT</span>
              <span className="text-sm font-bold text-white mt-1 block">1 op</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D1117] border border-zinc-855">
              <span className="text-zinc-500 block text-[9px]">O(log N) LOGARITHMIC</span>
              <span className="text-sm font-bold text-cyan-400 mt-1 block">
                {Math.max(1, Math.round(Math.log2(nVal)))} ops
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D1117] border border-zinc-855">
              <span className="text-zinc-500 block text-[9px]">O(N) LINEAR</span>
              <span className="text-sm font-bold text-emerald-400 mt-1 block">{nVal} ops</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D1117] border border-zinc-855">
              <span className="text-zinc-500 block text-[9px]">O(N²) QUADRATIC</span>
              <span className="text-sm font-bold text-rose-400 mt-1 block">
                {(nVal * nVal).toLocaleString()} ops
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── 8. CALL STACK VISUALIZER ────────────────────────────────── */}
      {type === 'call_stack' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-purple-400 font-bold">
            <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> CPU FUNCTION CALL STACK</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (stackFrames.length < 3) {
                    if (stackFrames.length === 1) {
                      setStackFrames((prev) => [...prev, { name: 'add(5, 7)', vars: 'a=5, b=7, ret=12' }]);
                    } else if (stackFrames.length === 2) {
                      setStackFrames((prev) => [...prev, { name: 'compute()', vars: 'val=12' }]);
                    }
                  } else {
                    setStackFrames([{ name: 'main()', vars: 'sum=uninit' }]);
                  }
                }}
                className="px-3 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
              >
                {stackFrames.length === 3 ? 'Reset main()' : 'Step push / pop frame'}
              </button>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 p-4 bg-zinc-950 rounded-2xl border border-zinc-900 min-h-[140px]">
            {stackFrames.map((frame, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-purple-500/40 bg-purple-950/20 text-center relative overflow-hidden"
              >
                <div className="font-bold text-white text-xs">{frame.name}</div>
                <div className="text-[10px] text-purple-300 mt-0.5">{frame.vars}</div>
                <span className="absolute left-2 top-2 px-1 text-[8px] bg-black/40 rounded text-zinc-500 font-bold">
                  Frame {idx}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
