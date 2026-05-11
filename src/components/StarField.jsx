import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animId
    let W = 0, H = 0
    let nodes = []
    let pulses = []
    let t = 0

    const GRID = 110       // grid cell size px
    const NODE_OPACITY = 0.18
    const LINE_OPACITY  = 0.07
    const PULSE_SPEED   = 1.4
    const PULSE_RATE    = 0.012  // chance per frame to spawn a pulse

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      buildGrid()
    }

    function buildGrid() {
      nodes = []
      const cols = Math.ceil(W / GRID) + 1
      const rows = Math.ceil(H / GRID) + 1
      // offset grid so it's never flush with the edge
      const offX = (W % GRID) / 2
      const offY = (H % GRID) / 2

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // slight random jitter so it feels organic, not mechanical
          const jx = (Math.random() - 0.5) * GRID * 0.28
          const jy = (Math.random() - 0.5) * GRID * 0.28
          nodes.push({
            x: offX + c * GRID + jx,
            y: offY + r * GRID + jy,
            r: Math.random() * 1.2 + 0.6,
            // each node has a slow breathing cycle
            phase: Math.random() * Math.PI * 2,
            breathSpeed: Math.random() * 0.006 + 0.003,
          })
        }
      }
    }

    // Find close neighbours of a node
    function getNeighbours(node, maxDist) {
      return nodes.filter(n => {
        if (n === node) return false
        const dx = n.x - node.x, dy = n.y - node.y
        return Math.sqrt(dx * dx + dy * dy) < maxDist
      })
    }

    // Spawn a pulse travelling along a random edge
    function spawnPulse() {
      const from = nodes[Math.floor(Math.random() * nodes.length)]
      const neighbours = getNeighbours(from, GRID * 1.6)
      if (!neighbours.length) return
      const to = neighbours[Math.floor(Math.random() * neighbours.length)]
      pulses.push({ from, to, progress: 0, opacity: 0.55 })
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      t++

      // ── Edges (grid lines) ──────────────────────────────────────────
      ctx.lineWidth = 0.5
      nodes.forEach(node => {
        const neighbours = getNeighbours(node, GRID * 1.55)
        neighbours.forEach(nb => {
          if (nb.x < node.x || (nb.x === node.x && nb.y < node.y)) return // draw once per pair
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(nb.x, nb.y)
          ctx.strokeStyle = `rgba(150,160,200,${LINE_OPACITY})`
          ctx.stroke()
        })
      })

      // ── Nodes ───────────────────────────────────────────────────────
      nodes.forEach(node => {
        const breath = Math.sin(t * node.breathSpeed + node.phase) * 0.5 + 0.5
        const op = NODE_OPACITY * (0.5 + breath * 0.5)

        // Outer glow
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 3.5)
        grad.addColorStop(0, `rgba(160,170,220,${op * 0.5})`)
        grad.addColorStop(1, 'rgba(160,170,220,0)')
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180,190,230,${op})`
        ctx.fill()
      })

      // ── Pulses (travelling dots along edges) ────────────────────────
      if (Math.random() < PULSE_RATE && pulses.length < 12) spawnPulse()

      pulses = pulses.filter(p => p.progress <= 1)
      pulses.forEach(p => {
        p.progress += PULSE_SPEED / Math.hypot(p.to.x - p.from.x, p.to.y - p.from.y)
        const x = p.from.x + (p.to.x - p.from.x) * p.progress
        const y = p.from.y + (p.to.y - p.from.y) * p.progress

        // Fade in/out
        const fade = p.progress < 0.15
          ? p.progress / 0.15
          : p.progress > 0.85
          ? (1 - p.progress) / 0.15
          : 1

        const op = p.opacity * fade

        // Glow trail
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 6)
        grad.addColorStop(0, `rgba(139,92,246,${op * 0.6})`)
        grad.addColorStop(0.4, `rgba(96,165,250,${op * 0.3})`)
        grad.addColorStop(1, 'rgba(96,165,250,0)')
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Bright core
        ctx.beginPath()
        ctx.arc(x, y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,210,255,${op})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}