(function () {
    const canvases = Array.from(document.querySelectorAll('.matrix-side'));
    if (!canvases.length) return;

    const chars = 'アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const DPR = window.devicePixelRatio || 1;

    function setupCanvas(c) {
        function resize() {
            const cw = c.clientWidth;
            const ch = window.innerHeight;
            c.width = Math.floor(cw * DPR);
            c.height = Math.floor(ch * DPR);
            c.style.width = cw + 'px';
            c.style.height = ch + 'px';
            const ctx = c.getContext('2d');
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0); // reset & scale for sharpness
            c.ctx = ctx;
            c.fontSize = 14; // adjust density
            c.cols = Math.max(2, Math.floor(cw / c.fontSize));
            c.drops = Array.from({ length: c.cols }, () => Math.floor(Math.random() * (ch / c.fontSize)));
        }
        resize();
        window.addEventListener('resize', resize);
    }

    canvases.forEach(setupCanvas);

    function step() {
        canvases.forEach(c => {
            const ctx = c.ctx;
            const w = c.width / DPR;
            const h = c.height / DPR;

            // fade previous frame
            ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#0f0';
            ctx.font = `${c.fontSize}px monospace`;

            for (let i = 0; i < c.cols; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                const x = i * c.fontSize;
                const y = c.drops[i] * c.fontSize;
                ctx.fillText(text, x + 2, y);
                if (y > h && Math.random() > 0.975) c.drops[i] = 0;
                c.drops[i]++;
            }
        });

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
})();