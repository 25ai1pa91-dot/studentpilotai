import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Layers,
  Search,
  Activity,
  Sliders,
  Sparkles,
  GitBranch,
  Network,
  Cpu,
  Database,
  CheckCircle2,
} from 'lucide-react';

export const DsaVisualizers: React.FC = () => {
  const [activeVisualizer, setActiveVisualizer] = useState<
    'sorting' | 'binarySearch' | 'tree' | 'graph' | 'memory' | 'complexity'
  >('sorting');

  // ── 1. SORTING STATE ──────────────────────────────────────────────
  const [sortArray, setSortArray] = useState<number[]>([45, 12, 85, 32, 89, 39, 69, 22, 54, 71]);
  const [sortActiveIndices, setSortActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSortRunning, setIsSortRunning] = useState<boolean>(false);
  const [sortStepCount, setSortStepCount] = useState<number>(0);
  const [sortAlgorithm, setSortAlgorithm] = useState<'bubble' | 'selection'>('bubble');

  // ── 2. BINARY SEARCH STATE ────────────────────────────────────────
  const [bsArray] = useState<number[]>([2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]);
  const [bsTarget, setBsTarget] = useState<number>(23);
  const [bsLow, setBsLow] = useState<number>(0);
  const [bsHigh, setBsHigh] = useState<number>(10);
  const [bsMid, setBsMid] = useState<number | null>(null);
  const [bsFound, setBsFound] = useState<boolean | null>(null);
  const [bsStep, setBsStep] = useState<number>(0);

  // ── 3. TREE TRAVERSAL STATE ───────────────────────────────────────
  const [activeTreeNode, setActiveTreeNode] = useState<number | null>(null);
  const [traversedTreeNodes, setTraversedTreeNodes] = useState<number[]>([]);
  const [treeTraversalType, setTreeTraversalType] = useState<'inorder' | 'preorder' | 'postorder' | 'levelorder'>('inorder');
  const [isTreeRunning, setIsTreeRunning] = useState<boolean>(false);

  // ── 4. GRAPH TRAVERSAL STATE ──────────────────────────────────────
  const [activeGraphNode, setActiveGraphNode] = useState<number | null>(null);
  const [visitedGraphNodes, setVisitedGraphNodes] = useState<number[]>([]);
  const [graphQueue, setGraphQueue] = useState<number[]>([]);

  // ── 5. MEMORY STACK/HEAP STATE ────────────────────────────────────
  const [memoryStackFrames, setMemoryStackFrames] = useState<Array<{ name: string; vars: Record<string, any>; address: string }>>([
    { name: 'main()', vars: { argc: 1, exitCode: 0 }, address: '0x7ffd98b0' },
    { name: 'solve()', vars: { target: 23, left: 0, right: 10 }, address: '0x7ffd9880' },
  ]);
  const [memoryHeapBlocks, setMemoryHeapBlocks] = useState<Array<{ id: string; size: string; type: string; address: string }>>([
    { id: 'Node_1', size: '16 bytes', type: 'TreeNode(23)', address: '0x55a8e020' },
    { id: 'Vector_Buffer', size: '44 bytes', type: 'int[11]', address: '0x55a8e040' },
  ]);

  // ── 6. COMPLEXITY GRAPH STATE ─────────────────────────────────────
  const [complexityN, setComplexityN] = useState<number>(16);

  // ── SORTING STEPPER ───────────────────────────────────────────────
  const resetSort = () => {
    setSortArray([45, 12, 85, 32, 89, 39, 69, 22, 54, 71]);
    setSortActiveIndices([]);
    setSortedIndices([]);
    setIsSortRunning(false);
    setSortStepCount(0);
  };

  const handleStepBubbleSort = () => {
    const arr = [...sortArray];
    const n = arr.length;
    let swapped = false;

    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        setSortActiveIndices([i, i + 1]);
        setSortArray(arr);
        setSortStepCount((s) => s + 1);
        swapped = true;
        break;
      }
    }

    if (!swapped) {
      setSortedIndices(Array.from({ length: n }, (_, idx) => idx));
      setIsSortRunning(false);
    }
  };

  // ── BINARY SEARCH STEPPER ─────────────────────────────────────────
  const resetBinarySearch = () => {
    setBsLow(0);
    setBsHigh(bsArray.length - 1);
    setBsMid(null);
    setBsFound(null);
    setBsStep(0);
  };

  const handleStepBinarySearch = () => {
    if (bsLow > bsHigh) {
      setBsFound(false);
      return;
    }
    const mid = Math.floor((bsLow + bsHigh) / 2);
    setBsMid(mid);
    setBsStep((s) => s + 1);

    if (bsArray[mid] === bsTarget) {
      setBsFound(true);
    } else if (bsArray[mid] < bsTarget) {
      setBsLow(mid + 1);
    } else {
      setBsHigh(mid - 1);
    }
  };

  // ── TREE TRAVERSAL STEPPER ────────────────────────────────────────
  const treeNodes = [
    { id: 1, val: 50, x: 200, y: 30, left: 2, right: 3 },
    { id: 2, val: 30, x: 100, y: 90, left: 4, right: 5 },
    { id: 3, val: 70, x: 300, y: 90, left: 6, right: 7 },
    { id: 4, val: 20, x: 50, y: 150 },
    { id: 5, val: 40, x: 150, y: 150 },
    { id: 6, val: 60, x: 250, y: 150 },
    { id: 7, val: 80, x: 350, y: 150 },
  ];

  const handleRunTreeTraversal = () => {
    setIsTreeRunning(true);
    setTraversedTreeNodes([]);
    const sequence =
      treeTraversalType === 'inorder'
        ? [4, 2, 5, 1, 6, 3, 7]
        : treeTraversalType === 'preorder'
        ? [1, 2, 4, 5, 3, 6, 7]
        : treeTraversalType === 'postorder'
        ? [4, 5, 2, 6, 7, 3, 1]
        : [1, 2, 3, 4, 5, 6, 7];

    sequence.forEach((nodeId, idx) => {
      setTimeout(() => {
        setActiveTreeNode(nodeId);
        setTraversedTreeNodes((prev) => [...prev, nodeId]);
        if (idx === sequence.length - 1) setIsTreeRunning(false);
      }, (idx + 1) * 700);
    });
  };

  return (
    <div className="space-y-6 font-sans select-none text-[#F5F3EE]">
      {/* ── 1. VISUALIZER NAV TABS ─────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 font-mono text-xs">
        {[
          { id: 'sorting', label: '1. Sorting Engine', icon: <Sliders className="w-3.5 h-3.5 text-amber-400" /> },
          { id: 'binarySearch', label: '2. Binary Search Radar', icon: <Search className="w-3.5 h-3.5 text-cyan-400" /> },
          { id: 'tree', label: '3. Tree Traversals', icon: <GitBranch className="w-3.5 h-3.5 text-emerald-400" /> },
          { id: 'graph', label: '4. Graph BFS/DFS Network', icon: <Network className="w-3.5 h-3.5 text-purple-400" /> },
          { id: 'memory', label: '5. Call Stack & Heap Allocator', icon: <Cpu className="w-3.5 h-3.5 text-rose-400" /> },
          { id: 'complexity', label: '6. Asymptotic Growth Graph', icon: <Activity className="w-3.5 h-3.5 text-indigo-400" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveVisualizer(tab.id as any)}
            className={`px-4 py-2 rounded-2xl font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeVisualizer === tab.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50 scale-105'
                : 'bg-[#0D1117] border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ── 2. SORTING VISUALIZER ──────────────────────────────────── */}
      {activeVisualizer === 'sorting' && (
        <div className="p-8 rounded-3xl bg-[#0D1117] border border-zinc-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-xl font-black text-white">Sorting Algorithm Stepper & Invariant Inspector</h2>
              <span className="text-xs font-mono text-amber-400">
                Algorithm: {sortAlgorithm.toUpperCase()} SORT • Operations: {sortStepCount}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={handleStepBubbleSort}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 shadow"
              >
                <SkipForward className="w-3.5 h-3.5" /> Next Swap Step
              </button>
              <button
                onClick={resetSort}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bar Graph Canvas */}
          <div className="h-64 bg-[#06080D] border border-zinc-800/80 rounded-2xl p-6 flex items-end justify-center gap-3">
            {sortArray.map((val, idx) => {
              const isActive = sortActiveIndices.includes(idx);
              const isSorted = sortedIndices.includes(idx);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 font-bold">{val}</span>
                  <motion.div
                    layout
                    className={`w-full rounded-t-xl transition-all ${
                      isActive
                        ? 'bg-amber-400 shadow-lg shadow-amber-500/50'
                        : isSorted
                        ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                        : 'bg-purple-600'
                    }`}
                    style={{ height: `${val * 2.2}px` }}
                  />
                  <span className="text-[9px] font-mono text-zinc-600">{idx}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 3. BINARY SEARCH VISUALIZER ────────────────────────────── */}
      {activeVisualizer === 'binarySearch' && (
        <div className="p-8 rounded-3xl bg-[#0D1117] border border-zinc-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-xl font-black text-white">Binary Search Space Elimination Radar</h2>
              <span className="text-xs font-mono text-cyan-400">
                Target: {bsTarget} • Low: {bsLow} • Mid: {bsMid ?? '-'} • High: {bsHigh}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={handleStepBinarySearch}
                disabled={bsFound !== null}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-1.5 disabled:opacity-40"
              >
                <SkipForward className="w-3.5 h-3.5" /> Next Interval Halving
              </button>
              <button
                onClick={resetBinarySearch}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Array Pointer Track */}
          <div className="p-6 bg-[#06080D] border border-zinc-800 rounded-2xl flex flex-wrap gap-2 justify-center items-center">
            {bsArray.map((val, idx) => {
              const isEliminated = idx < bsLow || idx > bsHigh;
              const isMid = idx === bsMid;
              const isTargetFound = isMid && bsFound === true;

              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-mono font-black text-sm transition-all ${
                      isTargetFound
                        ? 'border-emerald-500 bg-emerald-950 text-emerald-300 shadow-xl scale-110'
                        : isMid
                        ? 'border-cyan-400 bg-cyan-950/80 text-cyan-200 ring-4 ring-cyan-500/20'
                        : isEliminated
                        ? 'border-zinc-900 bg-black/40 text-zinc-700 opacity-25'
                        : 'border-zinc-700 bg-zinc-900 text-white'
                    }`}
                  >
                    {val}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">[{idx}]</span>
                </div>
              );
            })}
          </div>

          {bsFound !== null && (
            <div
              className={`p-4 rounded-2xl border font-mono text-xs ${
                bsFound ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-rose-950/40 border-rose-500 text-rose-300'
              }`}
            >
              {bsFound
                ? `✓ Target ${bsTarget} Located in O(log N) steps at index [${bsMid}]!`
                : `✗ Target ${bsTarget} does not exist in array.`}
            </div>
          )}
        </div>
      )}

      {/* ── 4. TREE TRAVERSALS VISUALIZER ──────────────────────────── */}
      {activeVisualizer === 'tree' && (
        <div className="p-8 rounded-3xl bg-[#0D1117] border border-zinc-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-xl font-black text-white">Hierarchical Binary Tree Traversal Simulator</h2>
              <div className="flex gap-2 mt-1">
                {(['inorder', 'preorder', 'postorder', 'levelorder'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTreeTraversalType(t)}
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase border ${
                      treeTraversalType === t
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleRunTreeTraversal}
              disabled={isTreeRunning}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Play className="w-3.5 h-3.5" /> Animate {treeTraversalType.toUpperCase()}
            </button>
          </div>

          {/* SVG Tree Graph */}
          <div className="relative h-64 bg-[#06080D] border border-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Edges */}
              <line x1="200" y1="30" x2="100" y2="90" stroke="#27272a" strokeWidth="2" />
              <line x1="200" y1="30" x2="300" y2="90" stroke="#27272a" strokeWidth="2" />
              <line x1="100" y1="90" x2="50" y2="150" stroke="#27272a" strokeWidth="2" />
              <line x1="100" y1="90" x2="150" y2="150" stroke="#27272a" strokeWidth="2" />
              <line x1="300" y1="90" x2="250" y2="150" stroke="#27272a" strokeWidth="2" />
              <line x1="300" y1="90" x2="350" y2="150" stroke="#27272a" strokeWidth="2" />

              {/* Nodes */}
              {treeNodes.map((node) => {
                const isActive = activeTreeNode === node.id;
                const isVisited = traversedTreeNodes.includes(node.id);

                return (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="18"
                      className={`transition-all ${
                        isActive
                          ? 'fill-emerald-500 stroke-white stroke-2'
                          : isVisited
                          ? 'fill-emerald-950 stroke-emerald-500 stroke-2'
                          : 'fill-zinc-900 stroke-zinc-700 stroke-2'
                      }`}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      className="fill-white text-[11px] font-mono font-bold select-none"
                    >
                      {node.val}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="p-4 rounded-2xl bg-[#06080D] border border-zinc-800 font-mono text-xs">
            <span className="text-zinc-500 block text-[10px] uppercase">Traversal Output Stream:</span>
            <div className="text-emerald-400 font-bold text-sm mt-1">
              [ {traversedTreeNodes.map((id) => treeNodes.find((n) => n.id === id)?.val).join(' → ')} ]
            </div>
          </div>
        </div>
      )}

      {/* ── 5. CALL STACK & HEAP MEMORY ALLOCATOR ──────────────────── */}
      {activeVisualizer === 'memory' && (
        <div className="p-8 rounded-3xl bg-[#0D1117] border border-zinc-800 shadow-2xl space-y-6">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-xl font-black text-white">Call Stack vs Heap Memory Layout</h2>
            <span className="text-xs font-mono text-rose-400">
              Stack grows downwards (LIFO) • Heap grows dynamically via free store
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Call Stack Section */}
            <div className="p-5 rounded-2xl bg-[#06080D] border border-zinc-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-2">
                <span className="font-bold text-rose-300">CALL STACK (AUTOMATIC MEMORY)</span>
                <span className="text-[10px]">Stack Pointer: %rsp</span>
              </div>
              <div className="space-y-2">
                {memoryStackFrames.map((frame, i) => (
                  <div key={i} className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/60 space-y-1">
                    <div className="flex justify-between text-white font-bold">
                      <span>{frame.name}</span>
                      <span className="text-[10px] text-zinc-500">{frame.address}</span>
                    </div>
                    <div className="text-[11px] text-zinc-300">
                      {Object.entries(frame.vars).map(([k, v]) => (
                        <div key={k}>{k} = <strong className="text-amber-300">{v}</strong></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Heap Memory Section */}
            <div className="p-5 rounded-2xl bg-[#06080D] border border-zinc-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-2">
                <span className="font-bold text-cyan-300">HEAP STORE (DYNAMIC ALLOCATION)</span>
                <span className="text-[10px]">Allocator: malloc/new</span>
              </div>
              <div className="space-y-2">
                {memoryHeapBlocks.map((block) => (
                  <div key={block.id} className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/60 flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold">{block.type}</div>
                      <span className="text-[10px] text-zinc-500">Address: {block.address}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">
                      {block.size}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. ASYMPTOTIC COMPLEXITY GROWTH ────────────────────────── */}
      {activeVisualizer === 'complexity' && (
        <div className="p-8 rounded-3xl bg-[#0D1117] border border-zinc-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-xl font-black text-white">Asymptotic Growth Rate Comparison</h2>
              <span className="text-xs font-mono text-indigo-400">
                Evaluating Big-O operations for N = {complexityN}
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-zinc-400">Adjust Input Size N:</span>
              <input
                type="range"
                min="2"
                max="64"
                value={complexityN}
                onChange={(e) => setComplexityN(Number(e.target.value))}
                className="accent-indigo-500"
              />
              <span className="font-bold text-white w-8">{complexityN}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
            {[
              { name: 'O(1)', ops: 1, color: 'text-emerald-400' },
              { name: 'O(log N)', ops: Math.round(Math.log2(complexityN)), color: 'text-cyan-400' },
              { name: 'O(N)', ops: complexityN, color: 'text-blue-400' },
              { name: 'O(N log N)', ops: Math.round(complexityN * Math.log2(complexityN)), color: 'text-amber-400' },
              { name: 'O(N²)', ops: complexityN * complexityN, color: 'text-orange-400' },
              { name: 'O(2ⁿ)', ops: complexityN <= 20 ? Math.pow(2, complexityN) : '> 10^9 (TLE)', color: 'text-rose-400' },
            ].map((c) => (
              <div key={c.name} className="p-4 rounded-2xl bg-[#06080D] border border-zinc-800 space-y-1">
                <div className="text-zinc-500 text-[10px]">{c.name}</div>
                <div className={`text-base font-black ${c.color}`}>{c.ops.toLocaleString()}</div>
                <span className="text-[9px] text-zinc-600">Operations</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
