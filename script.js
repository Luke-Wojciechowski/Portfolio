const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const camera = { x: 0, y: 0 };

const player = {
  x: 100,
  y: 500,
  w: 50,
  h: 50,
  vx: 0,
  vy: 0,
  onGround: false,
  rotation: 0,
  targetRotation: 0
};

const gravity = 1.5;
const friction = 0.85;
const moveSpeed = 1.5;
const jumpPower = 25;

// Platformy i gry
const platforms = [];

const platformDefinitions = [
  {
    x: 50,
    y: 600,
    w: 320,
    h: 60,
    image: './resource/img/start.png',
    title: 'Łukasz Wojciechowski',
    description: 'This is the starting platform.',
    platforms: ['Starting One :D'],
    screenshots: []
  },
  {
    x: 400,
    y: 540,
    w: 260,
    h: 120,
    image: './resource/img/astrominer.jpg',
    title: 'Astro Miner',
    description: 'Astro Miner',
    platforms: ['Steam', 'Nintendo Switch'],
    screenshots: ['./resource/img/astrominer1.avif', './resource/img/astrominer2.avif']
  },
  {
    x: 700,
    y: 480,
    w: 260,
    h: 120,
    image: './resource/img/bridgerace.avif',
    title: 'Bridge Race',
    description: 'Solve puzzles and win!',
    platforms: ['Nintendo Switch'],
    screenshots: ['./resource/img/bridgerace1.avif', './resource/img/bridgerace2.avif', './resource/img/bridgerace3.avif']
  },
  {
    x: 1000,
    y: 420,
    w: 260,
    h: 120,
    image: './resource/img/bucketcrusher.avif',
    title: 'Bucket Crusher',
    description: 'Mine asteroids in space!',
    platforms: ['Steam', 'PlayStation', 'Nintendo Switch'],
    screenshots: ['./resource/img/bucketcrusher1.avif', './resource/img/bucketcrusher2.avif']
  },
  {
    x: 1500,
    y: 460,
    w: 260,
    h: 120,
    image: './resource/img/crowdcity.avif',
    title: 'Crowd City',
    description: 'Mine asteroids in space!',
    platforms: ['Nintendo Switch'],
    screenshots: ['./resource/img/crowdcity1.avif', './resource/img/crowdcity2.avif']
  },
  {
    x: 1800,
    y: 360,
    w: 260,
    h: 120,
    image: './resource/img/bridghtside.avif',
    title: 'Bright Side: Quiz',
    description: 'Mine asteroids in space!',
    platforms: ['PlayStation', 'Xbox One', 'Nintendo Switch'],
    screenshots: ['./resource/img/bridghtside1.avif', './resource/img/bridghtside2.avif', './resource/img/bridghtside3.avif']
  },
  {
    x: 2100,
    y: 400,
    w: 260,
    h: 120,
    image: './resource/img/shoppingmall.avif',
    title: 'Shopping Mall Girl',
    description: 'Mine asteroids in space!',
    platforms: ['Nintendo Switch'],
    screenshots: ['./resource/img/shoppingmall1.avif', './resource/img/shoppingmall2.avif', './resource/img/shoppingmall3.avif']
  },
  {
    x: 2400,
    y: 440,
    w: 260,
    h: 120,
    image: './resource/img/startrek.avif',
    title: 'Star Trek: Legends',
    description: 'Mine asteroids in space!',
    platforms: ['Nintendo Switch', 'Xbox One', 'PlayStation'],
    screenshots: ['./resource/img/startrek1.avif', './resource/img/startrek2.avif', './resource/img/startrek3.avif']
  },
  {
    x: 2900,
    y: 420,
    w: 260,
    h: 120,
    image: './resource/img/neon.avif',
    title: 'Neon On!',
    description: 'Mine asteroids in space!',
    platforms: ['Nintendo Switch'],
    screenshots: ['./resource/img/neon1.avif', './resource/img/neon2.avif']
  },
  {
    x: 3200,
    y: 370,
    w: 260,
    h: 120,
    image: './resource/img/parking.avif',
    title: 'Parking Jam',
    description: 'Mine asteroids in space!',
    platforms: ['Nintendo Switch'],
    screenshots: ['./resource/img/parking1.avif', './resource/img/parking2.avif']
  },
  {
    x: 3500,
    y: 300,
    w: 260,
    h: 120,
    image: './resource/img/paper.avif',
    title: 'Paper io 2',
    description: 'Mine asteroids in space!',
    platforms: ['PlayStation'],
    screenshots: ['./resource/img/paper1.avif', './resource/img/paper2.avif']
  },
  {
    x: 3750,
    y: 150,
    w: 260,
    h: 120,
    image: './resource/img/omnom.avif',
    title: 'Om Nom: Run 2',
    description: 'Mine asteroids in space!',
    platforms: ['Nintendo Switch'],
    screenshots: ['./resource/img/omnom1.avif', './resource/img/omnom2.avif', './resource/img/omnom3.avif']
  },
  {
    x: 4000,
    y: 300,
    w: 260,
    h: 120,
    image: './resource/img/nails.avif',
    title: 'Acrylic Nails!',
    description: 'Mine asteroids in space!',
    platforms: ['PlayStation'],
    screenshots: ['./resource/img/nails1.avif', './resource/img/nails2.avif']
  },
  {
    x: 4400,
    y: 300,
    w: 260,
    h: 120,
    image: './resource/img/notnot.avif',
    title: 'Not Not - A Brain Buster',
    description: 'Mine asteroids in space!',
    platforms: ['Microsoft Store', 'Xbox One'],
    screenshots: ['./resource/img/notnot1.avif', './resource/img/notnot2.avif']
  },
  {
    x: 4700,
    y: 340,
    w: 260,
    h: 120,
    image: './resource/img/maze.avif',
    title: 'Multi Maze 3D',
    description: 'Mine asteroids in space!',
    platforms: ['PlayStation'],
    screenshots: ['./resource/img/maze1.avif', './resource/img/maze2.avif']
  },
  {
    x: 5000,
    y: 230,
    w: 260,
    h: 120,
    image: './resource/img/zoombie.avif',
    title: 'Zombie Defense',
    description: 'Mine asteroids in space!',
    platforms: ['Nintendo Switch'],
    screenshots: ['./resource/img/zoombie1.avif', './resource/img/zoombie2.avif', './resource/img/zoombie3.avif']
  },
  {
    x: 5320,
    y: 260,
    w: 260,
    h: 120,
    image: './resource/img/chef.avif',
    title: 'MasterChef: Learn to Cook!',
    description: 'Mine asteroids in space!',
    platforms: ['PlayStation', 'Nintendo Switch', 'Xbox One'],
    screenshots: ['./resource/img/chef1.avif', './resource/img/chef2.avif', './resource/img/chef3.avif']
  },
  {
    x: 5700,
    y: 310,
    w: 260,
    h: 120,
    image: './resource/img/johnny.avif',
    title: 'Johnny Trigger',
    description: 'Mine asteroids in space!',
    platforms: ['Steam'],
    screenshots: ['./resource/img/johnny1.avif', './resource/img/johnny2.avif', './resource/img/johnny3.avif']
  },
  {
    x: 6000,
    y: 300,
    w: 260,
    h: 120,
    image: './resource/img/hole.avif',
    title: 'Hole io',
    description: 'Mine asteroids in space!',
    platforms: ['Nintendo Switch'],
    screenshots: ['./resource/img/hole1.avif', './resource/img/hole2.avif']
  },
  {
    x: 6500,
    y: 200,
    w: 260,
    h: 120,
    image: './resource/img/farm.avif',
    title: 'Farm It',
    description: 'Mine asteroids in space!',
    platforms: ['Nintendo Switch'],
    screenshots: ['./resource/img/farm1.avif', './resource/img/farm2.avif', './resource/img/farm3.avif']
  },
  {
    x: 6900,
    y: 300,
    w: 260,
    h: 120,
    image: './resource/img/sausagewars.avif',
    title: 'Sausage Wars',
    description: 'Mine asteroids in space!',
    platforms: ['Steam', 'Xbox One'],
    screenshots: ['./resource/img/sausagewars1.avif', './resource/img/sausagewars2.avif', './resource/img/sausagewars3.avif']
  }
];

function recalculatePositions() {
  platforms.length = 0;
  platformDefinitions.forEach(def => {
    platforms.push({ ...def });
  });
}

// Parallax background system
const backgroundLayers = {
  stars: [],
  buildings: []
};

function createBackgroundElements() {
 
  backgroundLayers.stars = [];
  backgroundLayers.buildings = [];
  
  for (let i = 0; i < 220; i++) {
    backgroundLayers.stars.push({
      x: Math.random() * 8000,
      y: Math.random() * 400 + 30,
      size: Math.random() * 2.5 + 0.5,
      speed: 0.08
    });
  }
 
  for (let i = 0; i < 150; i++) {
    let h, w;
    
    if (Math.random() < 0.33) {
      h = Math.random() * 100 + 80; 
      w = Math.random() * 100 + 120;
    } else {
      h = Math.random() * 350 + 250;
      w = Math.random() * 80 + 40;   
    }
    const y = canvas.height - h;
   
    const x = i * 80 + Math.random() * 120;
    const base = 35 + Math.floor(Math.random() * 10); 
    const sat = 10 + Math.floor(Math.random() * 10); 
    const lum = 18 + Math.floor(Math.random() * 10); 
    const color = `hsl(${base}, ${sat}%, ${lum}%)`;
    // Cache window positions and on/off state
    const windows = [];
    for (let wy = y + 12; wy < y + h - 12; wy += 22) {
      for (let wx = x + 12; wx < x + w - 12; wx += 18) {
        windows.push({
          x: wx - x, 
          y: wy - y, 
          on: Math.random() > 0.3
        });
      }
    }
    backgroundLayers.buildings.push({
      x: x,
      y: y,
      w: w,
      h: h,
      speed: 1.2,
      windows: windows,
      color: color
    });
  }
}

function drawBackground() {
  // Draw night sky gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#181c3a'); 
  gradient.addColorStop(0.5, '#23235b'); 
  gradient.addColorStop(1, '#2a2a40');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw stars (slow parallax)
  backgroundLayers.stars.forEach(star => {
    const x = star.x - camera.x * star.speed;
    if (x > -10 && x < canvas.width + 10) {
      ctx.globalAlpha = star.bright ? 1 : 0.7 + Math.random() * 0.3;
      ctx.fillStyle = star.bright ? '#fffbe6' : '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
  });
  // Draw buildings
  backgroundLayers.buildings.forEach(building => {
    const x = building.x - camera.x * building.speed;
    if (x > -building.w && x < canvas.width + building.w) {
      ctx.fillStyle = building.color;
      ctx.fillRect(x, building.y, building.w, building.h);
      // Draw cached windows
      building.windows.forEach(win => {
        ctx.fillStyle = win.on ? '#ffe066' : building.color;
        ctx.fillRect(x + win.x, building.y + win.y, 10, 10);
      });
    }
  });
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  recalculatePositions();
  createBackgroundElements();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();


let currentPlatformIndex = 0;

const questions = platforms.map(p => ({
  x: p.x + 35,
  y: p.y - 50,
  w: 30,
  h: 30,
  linkedGame: p
}));

const keys = {};

// Particle system
const particles = [];

function createParticles(x, y, type) {
  const count = type === 'blood' ? 15 : 8;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x + Math.random() * 20 - 10,
      y: y + Math.random() * 20 - 10,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 2,
      life: 60,
      maxLife: 60,
      type: type,
      size: Math.random() * 4 + 2
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.2; 
    p.life--;
    
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  particles.forEach(p => {
    const alpha = p.life / p.maxLife;
    if (p.type === 'jump') {
      ctx.fillStyle = `rgba(255, 255, 0, ${alpha})`;
    } else if (p.type === 'land') {
      ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
    } else if (p.type === 'blood') {
      ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
    }
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });
}

const jumpSound = new Audio('./resource/audio/jump.mp3');
const dieSound = new Audio('./resource/audio/die.mp3');

document.addEventListener("keydown", e => {
  keys[e.key] = true;
  // WSAD support
  if ((e.key === "w" || e.key === "W") && player.onGround) {
    player.vy = -jumpPower;
    createParticles(player.x + player.w/2, player.y + player.h, 'jump');
    jumpSound.currentTime = 0;
    jumpSound.play();
    player.targetRotation += Math.PI / 2;
  }
  if (e.key === "ArrowUp" && player.onGround) {
    player.vy = -jumpPower;
    createParticles(player.x + player.w/2, player.y + player.h, 'jump');
    jumpSound.currentTime = 0;
    jumpSound.play();
    player.targetRotation += Math.PI / 2;
  }
 
});

document.addEventListener("keyup", e => {
  keys[e.key] = false;
});

function drawPlayer() {
  ctx.save();
  // Move to player center
  ctx.translate(player.x + player.w / 2, player.y + player.h / 2);
  ctx.rotate(player.rotation);
  // Gradient fill
  const grad = ctx.createLinearGradient(-player.w/2, -player.h/2, player.w/2, player.h/2);
  grad.addColorStop(0, '#4f8cff');
  grad.addColorStop(1, '#a259ff');
  ctx.fillStyle = grad;
  // Draw rounded rectangle
  const r = 14;
  ctx.beginPath();
  ctx.moveTo(-player.w/2 + r, -player.h/2);
  ctx.lineTo(player.w/2 - r, -player.h/2);
  ctx.quadraticCurveTo(player.w/2, -player.h/2, player.w/2, -player.h/2 + r);
  ctx.lineTo(player.w/2, player.h/2 - r);
  ctx.quadraticCurveTo(player.w/2, player.h/2, player.w/2 - r, player.h/2);
  ctx.lineTo(-player.w/2 + r, player.h/2);
  ctx.quadraticCurveTo(-player.w/2, player.h/2, -player.w/2, player.h/2 - r);
  ctx.lineTo(-player.w/2, -player.h/2 + r);
  ctx.quadraticCurveTo(-player.w/2, -player.h/2, -player.w/2 + r, -player.h/2);
  ctx.closePath();
  ctx.shadowColor = '#a259ff';
  ctx.shadowBlur = 16;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();
}

// Image cache to prevent flickering
const imageCache = {};

function drawPlatforms() {
  platforms.forEach(p => {
    if (p.image) {
      if (!imageCache[p.image]) {
        const img = new Image();
        img.src = p.image;
        imageCache[p.image] = img;
      }
      const img = imageCache[p.image];
      if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, p.x, p.y, p.w, p.h);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeRect(p.x, p.y, p.w, p.h);
      } else if (img.complete && img.naturalWidth === 0) {
        if (!img._warned) {
          console.warn('Image failed to load:', p.image);
          img._warned = true;
        }
      }
    }
  });
}

function showInfo(game) {
  const info = document.getElementById("game-info");
  let screenshotsHTML = '';
  if (game.screenshots && game.screenshots.length > 0) {
    screenshotsHTML = `<div style="display:flex;gap:8px;margin:8px 0;justify-content:center;align-items:center;">` +
      game.screenshots.slice(0,3).map(src => `<img src='${src}' style='height:120px;max-width:28vw;width:auto;flex:1 1 0;border-radius:6px;box-shadow:0 2px 8px #0002;object-fit:contain;border:3px solid #ffffff;'>`).join('') +
      `</div>`;
  }
  info.innerHTML = `
    <h3>${game.title}</h3>
    <p><strong>Platforms:</strong> ${game.platforms.join(', ')}</p>
    ${screenshotsHTML}
  `;
  info.style.display = "block";
}

function hideInfo() {
  document.getElementById("game-info").style.display = "none";
}


function update() {
  if (keys["ArrowLeft"] || keys["a"] || keys["A"]) player.vx -= moveSpeed;
  if (keys["ArrowRight"] || keys["d"] || keys["D"]) player.vx += moveSpeed;

  player.vx *= friction;
  player.vy += gravity;
  
  let prevY = player.y;
  let wasOnGround = player.onGround;
  player.x += player.vx;
  player.y += player.vy;

  player.onGround = false;
  let standingPlatform = null;
  platforms.forEach((p, idx) => {
    // Only check collision if falling
    if (
      player.vy >= 0 &&
      player.x < p.x + p.w &&
      player.x + player.w > p.x &&
      prevY + player.h <= p.y && // was above platform last frame
      player.y + player.h >= p.y // now at or below platform top
    ) {
      player.vy = 0;
      player.y = p.y - player.h;
      player.onGround = true;
      currentPlatformIndex = idx;
      standingPlatform = p;
      
      // Create landing particles only if we just landed (wasn't on ground before)
      if (!wasOnGround) {
        createParticles(player.x + player.w/2, player.y + player.h, 'land');
      }
    }
  });

  // Show info if standing on a platform
  if (standingPlatform) {
    showInfo(standingPlatform);
  } else {
    hideInfo();
  }

  // follow player
  camera.x = player.x - canvas.width / 2 + player.w / 2;
  camera.x = Math.max(0, Math.min(camera.x, 8000 - canvas.width)); 

  // Reset player if fallen off map
  if (player.y > canvas.height + 200) {
    
    createParticles(player.x + player.w/2, player.y + player.h, 'blood');
    dieSound.currentTime = 0;
    dieSound.play();
    // Respawn on last platform
    const p = platforms[currentPlatformIndex] || platforms[0];
    player.x = p.x + p.w / 2 - player.w / 2;
    player.y = p.y - player.h;
    player.vx = 0;
    player.vy = 0;
  }
  
  updateParticles();
  const rotationSpeed = 0.18;
  if (Math.abs(player.rotation - player.targetRotation) > 0.01) {
    player.rotation += (player.targetRotation - player.rotation) * rotationSpeed;
  } else {
    player.rotation = player.targetRotation;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  
  drawBackground();
  ctx.translate(-camera.x, 0);

  drawPlatforms();
  drawParticles();
  drawPlayer();
  ctx.restore();
}

function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}


document.getElementById("start-button").addEventListener("click",()=>{

    const menu = document.getElementById("start-menu");
    menu.classList.add("fade-out");
    setTimeout(()=>{
        menu.style.display = "none";
        gameLoop();
    },1000);
});