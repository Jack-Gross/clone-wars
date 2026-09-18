(function () {
  function drawBackground(ctx, width, height, time) {
    ctx.save();

    const horizon = height * 0.68;
    const sky = ctx.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, '#24134f');
    sky.addColorStop(0.55, '#7b2f5c');
    sky.addColorStop(1, '#e36a45');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const sunRadius = Math.max(18, width * 0.075);
    ctx.fillStyle = 'rgba(255, 236, 148, 0.18)';
    ctx.beginPath();
    ctx.arc(width * 0.72, height * 0.24, sunRadius * 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffe99a';
    ctx.beginPath();
    ctx.arc(width * 0.72, height * 0.24, sunRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 209, 112, 0.28)';
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.31, sunRadius * 0.62, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffd37a';
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.31, sunRadius * 0.38, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 206, 145, 0.7)';
    const twinkle = Math.sin(time * 1.4) * 0.18 + 0.42;
    ctx.globalAlpha = twinkle;
    for (let i = 0; i < 8; i += 1) {
      const sx = (width * (0.09 + i * 0.107)) % width;
      const sy = height * (0.09 + (i % 3) * 0.075);
      ctx.fillRect(sx, sy, 2, 2);
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#3a1c4d';
    ctx.beginPath();
    ctx.moveTo(0, horizon + 16);
    ctx.lineTo(width * 0.15, horizon - 28);
    ctx.lineTo(width * 0.3, horizon + 6);
    ctx.lineTo(width * 0.46, horizon - 42);
    ctx.lineTo(width * 0.63, horizon + 8);
    ctx.lineTo(width * 0.8, horizon - 22);
    ctx.lineTo(width, horizon + 2);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#b64f46';
    ctx.beginPath();
    ctx.moveTo(0, horizon + 32);
    ctx.lineTo(width * 0.22, horizon + 2);
    ctx.lineTo(width * 0.38, horizon + 26);
    ctx.lineTo(width * 0.57, horizon - 4);
    ctx.lineTo(width * 0.73, horizon + 24);
    ctx.lineTo(width, horizon + 4);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawGround(ctx, width, height, groundHeight, offset) {
    ctx.save();

    const top = height - groundHeight;
    ctx.fillStyle = '#d27a45';
    ctx.fillRect(0, top, width, groundHeight);
    ctx.fillStyle = '#f3b35d';
    ctx.fillRect(0, top, width, 6);

    ctx.strokeStyle = '#6b3040';
    ctx.lineWidth = 3;
    const tile = 34;
    const start = -((offset % tile) + tile);
    for (let x = start; x < width + tile; x += tile) {
      ctx.beginPath();
      ctx.moveTo(x, top + 15);
      ctx.lineTo(x + tile * 0.55, top + 23);
      ctx.lineTo(x + tile * 0.24, top + 37);
      ctx.stroke();
    }
    ctx.fillStyle = '#9c4d3f';
    for (let x = start + 12; x < width + tile; x += tile * 1.8) {
      ctx.fillRect(x, top + groundHeight * 0.68, 10, 4);
    }

    ctx.restore();
  }

  function drawBird(ctx, x, y, size, velocity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.max(-0.35, Math.min(0.35, velocity / 900)));

    const s = size / 34;
    ctx.scale(s, s);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#161226';
    ctx.lineWidth = 3;

    ctx.fillStyle = '#d8e6ee';
    ctx.beginPath();
    ctx.moveTo(-16, 0);
    ctx.lineTo(-8, -6);
    ctx.lineTo(4, -7);
    ctx.lineTo(16, 0);
    ctx.lineTo(4, 7);
    ctx.lineTo(-8, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#e35c3e';
    ctx.beginPath();
    ctx.moveTo(-4, -5);
    ctx.lineTo(2, -17);
    ctx.lineTo(7, -6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-4, 5);
    ctx.lineTo(2, 17);
    ctx.lineTo(7, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#51d0d4';
    ctx.beginPath();
    ctx.ellipse(4, 0, 7, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#fff2a8';
    ctx.beginPath();
    ctx.arc(7, 0, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffb83e';
    ctx.beginPath();
    ctx.moveTo(16, -2);
    ctx.lineTo(21, 0);
    ctx.lineTo(16, 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  function drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();

    const edge = 3;
    const beam = Math.min(12, Math.max(8, pipeWidth * 0.18));
    const inner = pipeWidth - edge * 2;

    function gate(y, h, capY) {
      ctx.fillStyle = '#f04f67';
      ctx.strokeStyle = '#171329';
      ctx.lineWidth = edge;
      ctx.fillRect(x + edge, y, inner, h);
      if (h > edge * 2) ctx.strokeRect(x + edge * 1.5, y + edge * 0.5, inner - edge, h - edge);

      ctx.fillStyle = '#ffb43f';
      ctx.fillRect(x, capY, pipeWidth, beam);
      ctx.strokeRect(x + edge * 0.5, capY + edge * 0.5, pipeWidth - edge, beam - edge);

      ctx.fillStyle = '#fff3a3';
      ctx.fillRect(x + pipeWidth * 0.25, y + (h > 0 ? Math.min(18, h * 0.35) : 0), pipeWidth * 0.16, Math.max(0, h - 22));
      ctx.fillRect(x + pipeWidth * 0.61, y + (h > 0 ? Math.min(18, h * 0.35) : 0), pipeWidth * 0.1, Math.max(0, h - 22));
    }

    gate(0, gapTop, Math.max(0, gapTop - beam));
    gate(gapBottom, Math.max(0, height - gapBottom), gapBottom);

    ctx.restore();
  }

  window.SPRITES = { drawBackground, drawGround, drawBird, drawPipe };
})();
