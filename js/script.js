    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Resize canvas on window resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Fireworks particles
    let fireworks = [];

    function createFirework(x = Math.random() * canvas.width, y = Math.random() * canvas.height / 2) {
      const colors = ["#ff0043", "#14fc56", "#1e90ff", "#ffa500", "#ffffff"];

      for (let i = 0; i < 100; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 5 + 2;
        fireworks.push({
          x,
          y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireworks.forEach((p, i) => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.01;

        if (p.alpha <= 0) fireworks.splice(i, 1);
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }

    setInterval(() => createFirework(), 1000);
    animate();

    // Trigger fireworks on mouse click
    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createFirework(x, y);
    });

    // Music control
    const player = document.getElementById("player");
    const trackName = document.getElementById("trackName");
    const trackTime = document.getElementById("trackTime");
const tracks = [
    { name: "Track One - Miles of Meaning", url: "mp3/🎵 “Miles of Meaning – Ford Legacy”.mp3" },
    { name: "Track Two - Ford rock", url: "mp3/Ford rock.mp3" },
    { name: "Track Three - Built to Ride", url: "mp3/🎵 “Built to Ride – Ford 122”.mp3" }
];


    let currentTrack = 0;

    function playTrack(index) {
      const track = tracks[index];
      player.src = track.url;
      player.play();
      trackName.textContent = track.name;
    }

    player.addEventListener("ended", () => {
      currentTrack = (currentTrack + 1) % tracks.length;
      playTrack(currentTrack);
    });

    player.addEventListener("timeupdate", () => {
      const seconds = Math.floor(player.currentTime % 60).toString().padStart(2, "0");
      const minutes = Math.floor(player.currentTime / 60);
      trackTime.textContent = `${minutes}:${seconds}`;
    });

    function togglePlay() {
      if (player.paused) {
        player.play();
      } else {
        player.pause();
      }
    }

    // Start automatically when loaded
    window.addEventListener("load", () => {
      playTrack(currentTrack);
    });