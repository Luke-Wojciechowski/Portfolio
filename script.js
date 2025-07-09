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

const gravity = 1.5 *1000;
const friction = 0.85;
const moveSpeed = 1.5 * 2000;
const jumpPower = 1000;

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
    platforms: ['Poland'],
    contributions: "",
    screenshots: []
  },
  {
    x: 400,
    y: 540,
    w: 260,
    h: 120,
    image: './resource/img/astrominer.jpg',
    title: 'Astro Miner',
    description: 'Explore alien planets and mine valuable crystals using a vacuum gun in this colorful space adventure. Upgrade your gear, use power-ups, and play solo or in co-op mode to get rich and uncover ancient fossils with unique bonuses.',
    contributions: "I optimized the game for better performance and implemented a new multiplayer co-op mode. I also worked on a DLC expansion, redesigned the user interface, and fixed numerous bugs. Additionally, I handled integration with various platforms",
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
    description: 'Collect bricks, build your bridge, and race to the finish while customizing your character and competing in exciting multiplayer challenges.',
    contributions: "I worked on UI design, core gameplay mechanics, and DLC content. Additionally, I optimized visuals and performance for smoother gameplay across devices.",
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
    description: 'Crush walls brick by brick using a powerful saw, upgrade your machine, and enjoy the satisfying destruction in this addictive casual game.',
    contributions: "I created the UI, improved core gameplay elements, and supported the development of DLC content. I also handled bug fixing to ensure a more stable experience",
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
    description: 'Lead a growing crowd through the city, absorb smaller groups, and avoid being swallowed by larger ones in this fun and fast-paced game.',
    contributions: "I optimized game performance and improved stability through bug fixing. I also collaborated in a 3-person team to enhance the UI and overall user experience",
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
    description: 'An educational quiz game full of trivia, visuals, and fun modes, letting players explore the planet and beyond while competing with friends.',
    contributions: "As lead programmer, I developed the UI, gameplay, all quiz modes, animations, VFX (particles), and handled database integration and system design.",
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
    description: "Step into a glamorous shopping mall and dress up in the latest fashion trends to become a runway star. Compete in fashion battles, get styling tips, and enjoy a fabulous shopping adventure!",
    contributions: "I handled the porting process, including UI, gameplay systems, and DLC integration.",
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
     description: 'Assemble your crew of iconic Star Trek characters and command the U.S.S. Artemis in this strategy-based RPG. Battle through turn-based missions, shape the story with your choices, and explore a richly detailed 3D universe.',
    contributions: 'As part of a 4-person team, I focused on performance optimization, visual improvements, and bug fixing. I also contributed to localization, helping the game reach a wider international audience.',
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
    description: 'Untangle and connect vibrant neon cables to their matching sockets to light up stunning animated signs. Solve color-matching puzzles across dynamic levels full of interactive obstacles like lasers and rotating boxes.',
    contributions: 'I ported the game, implemented new shaders for improved visuals, and integrated additional puzzles and 3D models. I also redesigned UI elements and ensured seamless functionality across platforms.',
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
    description: 'Clear crowded parking lots by moving vehicles strategically across five challenging game modes. Use powerups, unlock maps, and show off your puzzle-solving skills in local multiplayer or solo.',
    contributions: 'I worked on UI development, bug fixing, and implemented new gameplay modes including multiplayer. I also helped design new maps and supported content updates through DLC integration.',
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
    description: 'Claim territory by painting over the map in fast-paced solo or multiplayer matches for up to 8 players. Outsmart opponents and dominate dozens of unique maps while avoiding elimination.',
    contributions: 'I contributed to performance improvements and technical stability. My work included resolving a critical memory issue, which significantly improved long-session performance without altering gameplay.',
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
    description: 'Race through obstacle-filled environments as Om Nom in this fast-paced arcade runner. Outspeed rivals, dodge traps, and find the quickest paths to victory across vibrant, animated tracks.',
    contributions: 'I initiated the game’s port and built the core porting structure used by the team. I also refactored and improved the project architecture to streamline development and make future contributions easier for other programmers.',
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
    description: 'Create dazzling nail art using a wide variety of polishes, stencils, and accessories in your own beauty salon. Shape, paint, and decorate to satisfy clients and earn top ratings.',
    contributions: 'I ported the game to PS4 and built custom tools to replace Unity SDK features unavailable on the platform. This included implementing missing functionality using the native PlayStation SDK and adapting UI and input systems for console.',
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
    description: 'Challenge your brain in this fast-paced logic puzzle game packed with misleading instructions and mind-bending twists, now with multiplayer on Nintendo Switch.',
    contributions: 'I was responsible for bug fixing,focusing on gameplay stability and edge-case crashes.',
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
    description: 'Guide colorful balls through twisty mazes and multiplier gates to fill the cup. Spin your way through levels packed with boosters, skins, and satisfying ball physics.',
    contributions: 'I optimized the game significantly, increasing performance. Improvements focused on rendering efficiency and memory use.',
    platforms: ['Nintendo Switch'],
    screenshots: ['./resource/img/maze1.avif', './resource/img/maze2.avif']
  },
  {
    x: 5000,
    y: 230,
    w: 260,
    h: 120,
    image: './resource/img/zoombie.avif',
    title: 'Zombie Defense',
    description: 'Defend your base from endless zombie hordes using weapons, traps, turrets, and even tanks. Play solo or with a friend in chaotic co-op mode across multiple locations.',
    contributions: 'I handled the console port, including UI, gameplay systems, co-op mode, localization, and balance tuning. I also ensured platform compliance and optimized performance across modes.',
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
    description: 'Step into the kitchen and prove yourself in MasterChef: Learn to Cook! Play fun cooking mini-games, master over 120 global recipes, customize your chef, and take on culinary challenges judged by the iconic MasterChef panel.',
    contributions: 'Collaborated in a 4-person team to implement UI features, gameplay improvements, and localization. Also handled key bug fixes and helped polish the overall user experience.',
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
    description: 'Take down the mafia in this stylish, fast-paced action shooter. Flip, slide, and blast your way through short, high-impact levels as Johnny Trigger — the ultimate action hero.',
    contributions: 'Handled the full PC/Steam port, adapting controls and performance for desktop play. Added multi-language support and implemented localization across all UI and gameplay elements.',
    platforms: ['Steam'],
    screenshots: ['./resource/img/johnny1.avif', './resource/img/johnny2.avif', './resource/img/johnny3.avif']
  },
  {
    x: 6030,
    y: 300,
    w: 260,
    h: 120,
    image: './resource/img/hole.avif',
    title: 'Hole io',
    description: 'Mine asteroids in space!',
    contributions: 'I designed the UI, created new game modes, implemented multiplayer features, and optimized the game for better performance.',
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
    description: 'Build and manage your dream farm in this relaxing simulation game. Grow crops, care for animals, cook meals, and sell your goods—all while customizing your farmer and surroundings.',
    contributions: 'Improved gameplay mechanics and visual polish while optimizing performance. Enhanced physics and graphics to deliver smoother farming interactions.',
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
    description: 'An over-the-top party brawler for up to 4 players and 20 bots where sausages clash in brutal kitchen battles! Head-butt, push, and outmaneuver your enemies into deadly traps—from knife racks to blazing stoves—in a fight for sausage supremacy.',
    contributions: 'Handled critical bug fixing and stability improvements across multiplayer and physics systems.',
    platforms: ['Steam', 'Xbox One'],
    screenshots: ['./resource/img/sausagewars1.avif', './resource/img/sausagewars2.avif', './resource/img/sausagewars3.avif']
  },
  {
    x: 430,
    y: 310,
    w: 260,
    h: 120,
    image: './resource/img/ci.jpg',
    title: 'Chaos Islands',
    description: 'One of the leading architecture design using a custom ECS framework (Sirex ECS). Developed core gameplay mechanics, tools including enemy systems, part of the construction/building logic, card systems, and gamepad input. Also contributed to game design and production strategy.',
    contributions: 'Handled critical bug fixing and stability improvements across multiplayer and physics systems.',
    platforms: ['Steam'],
    screenshots: ['./resource/img/ci1.jpg', './resource/img/ci2.jpg', './resource/img/ci3.jpg']
  },  
  {
    x: 7230,
    y: 260,
    w: 260,
    h: 120,
    image: './resource/img/candy.png',
    title: 'Candy go home',
      description: 'A quirky first-person shooter where you play as a sentient piece of trash candy fighting waves of enemies across surreal environments. Battle to survive and progress through increasingly challenging stages.',
    contributions: 'Designed and implemented enemy behaviors, wave progression systems, and player feedback loops. Also handled character and enemy animations and level pacing.',
    platforms: ['PC - itch.io'],
    screenshots: ['./resource/img/candy1.png', './resource/img/candy2.png', './resource/img/candy3.png']
  },
  {
    x: 7630,
    y: 280,
    w: 260,
    h: 120,
    image: './resource/img/table.png',
    title: 'Tabletop Fusion',
    description: 'A card fusion game where players combine base cards to create powerful new ones and trade them for currency. Complete quests, discover rare recipes, and build the ultimate deck.',
    contributions: 'Designed the game concept and systems, implemented the card fusion (recipe) mechanic, developed the quest system, and contributed to game art and UI layout.',
    platforms: ['PC - itch.io'],
    screenshots: ['./resource/img/table1.png', './resource/img/table2.png']
  },
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
      // Add a small vertical gradient to each building
      const grad = ctx.createLinearGradient(x, building.y, x, building.y + building.h);
      grad.addColorStop(0, 'hsl(' + building.color.match(/\d+/g)[0] + ', ' + building.color.match(/\d+/g)[1] + '%, ' + (parseInt(building.color.match(/\d+/g)[2]) + 10) + '%)'); // lighter at top
      grad.addColorStop(1, building.color); // original at bottom
      ctx.fillStyle = grad;
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
// Screenshot cache to preload screenshots
const screenshotCache = {};

// Preload all screenshots at startup
platformDefinitions.forEach(def => {
  if (def.screenshots && def.screenshots.length > 0) {
    def.screenshots.forEach(src => {
      if (!screenshotCache[src]) {
        const img = new Image();
        img.src = src;
        screenshotCache[src] = img;
      }
    });
  }
});

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


function update(deltaTime) {
  if (keys["ArrowLeft"] || keys["a"] || keys["A"]) player.vx -= moveSpeed * deltaTime;
  if (keys["ArrowRight"] || keys["d"] || keys["D"]) player.vx += moveSpeed * deltaTime;

  player.vx *= Math.pow(friction, deltaTime * 60); // Friction per second (keep as is for now)
  player.vy += gravity * deltaTime;
  
  let prevY = player.y;
  let wasOnGround = player.onGround;
  player.x += player.vx * deltaTime;
  player.y += player.vy * deltaTime;

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
  const rotationSpeed = 0.18 * 100;
  if (Math.abs(player.rotation - player.targetRotation) > 0.01) {
    player.rotation += (player.targetRotation - player.rotation) * rotationSpeed * deltaTime;
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

let lastTime = null;
function gameLoop(now){
    if (!lastTime) lastTime = now;
    const deltaTime = Math.min((now - lastTime) / 1000, 0.05); 
    lastTime = now;
    update(deltaTime);
    draw();
    requestAnimationFrame(gameLoop);
}


document.getElementById("start-button").addEventListener("click",()=>{

    const menu = document.getElementById("start-menu");
    menu.classList.add("fade-out");
    setTimeout(()=>{
        menu.style.display = "none";
        lastTime = null;
        requestAnimationFrame(gameLoop);
    },1000);
});

document.getElementById("show-list-button").addEventListener("click",()=>{

  const gameList = document.getElementById("game-list");
  const menu = document.getElementById("start-menu");
  const game = document.getElementById("game-container");

  //menu.classList.add("fade-out");
  setTimeout(()=>{
      gameList.style.display = "block";
      menu.style.display = "none";
      game.style.display = "none";
  },100);
});


document.getElementById("x").addEventListener("click",()=>{

  location.reload();
});

// Gallery Game Info System - Separate from the main game info
const galleryGameData = {
  crowdcity: {
    title: "Crowd City",
    description: "Lead a growing crowd through the city, absorb smaller groups, and avoid being swallowed by larger ones in this fun and fast-paced game.",
    contributions: "I designed the UI, created new game modes, implemented multiplayer features, and optimized the game for better performance.",
    platforms: ["Nintendo Switch"],
    platformLinks: {
      "Nintendo Switch": "https://www.nintendo.com/us/store/products/crowd-city-switch/",
    },
    screenshots: ['./resource/img/crowdcity1.avif', './resource/img/crowdcity2.avif']
  },
  astrominer: {
    title: "Astro Miner",
    description: "Explore alien planets and mine valuable crystals using a vacuum gun in this colorful space adventure. Upgrade your gear, use power-ups, and play solo or in co-op mode to get rich and uncover ancient fossils with unique bonuses.",
    contributions: "I optimized game performance and improved stability through bug fixing. I also collaborated in a 3-person team to enhance the UI and overall user experience",
    platforms: ["Steam", "Nintendo Switch"],
    platformLinks: {
      "Steam": "https://store.steampowered.com/app/2751340/Astro_Miner/",
      "Nintendo Switch": "https://www.nintendo.com/us/store/products/astro-miner-switch/"
    },
    screenshots: ['./resource/img/astrominer1.avif', './resource/img/astrominer2.avif']
  },
  bridgerace: {
    title: "Bridge Race",
    description: "Collect bricks, build your bridge, and race to the finish while customizing your character and competing in exciting multiplayer challenges.",
    contributions: "I worked on UI design, core gameplay mechanics, and DLC content. Additionally, I optimized visuals and performance for smoother gameplay across devices.",
    platforms: ["Nintendo Switch"],
    platformLinks: {
      "Nintendo Switch": "https://www.nintendo.com/us/store/products/bridge-race-switch/"
    },
    screenshots: ['./resource/img/bridgerace1.avif', './resource/img/bridgerace2.avif', './resource/img/bridgerace3.avif']
  },
  bucketcrusher: {
    title: "Bucket Crusher",
    description: "Crush walls brick by brick using a powerful saw, upgrade your machine, and enjoy the satisfying destruction in this addictive casual game.",
    contributions: "I created the UI, improved core gameplay elements, and supported the development of DLC content. I also handled bug fixing to ensure a more stable experience",
    platforms: ["Steam", "PlayStation", "Nintendo Switch"],
    platformLinks: {
      "Steam": "https://store.steampowered.com/app/2885230/Bucket_Crusher/",
      "PlayStation": "https://store.playstation.com/pl-pl/product/EP2696-CUSA48344_00-0000000000000000",
      "Nintendo Switch": "https://www.nintendo.com/us/store/products/bucket-crusher-switch/"
    },
    screenshots: ['./resource/img/bucketcrusher1.avif', './resource/img/bucketcrusher2.avif']
  },
  brightside: {
    title: "Bright Side: Quiz",
    description: "An educational quiz game that challenges your knowledge across various subjects. Learn while having fun with interactive questions and engaging content.",
    contributions: "As lead programmer, I developed the UI, gameplay, all quiz modes, animations, VFX (particles), and handled database integration and system design.",
    platforms: ["PlayStation", "Xbox One", "Nintendo Switch"],
    platformLinks: {
      "PlayStation": "https://store.playstation.com/pl-pl/product/EP2696-CUSA51841_00-0876462411869167",
      "Xbox One": "https://www.xbox.com/en-EN/games/store/bright-side-quiz/9NWSKPZBBR6T/0010",
      "Nintendo Switch": "https://www.nintendo.com/us/store/products/bright-side-quiz-switch/"
    },
    screenshots: ['./resource/img/bridghtside1.avif', './resource/img/bridghtside2.avif', './resource/img/bridghtside3.avif']
  },
  shoppingmall: {
    title: "Shopping Mall Girl",
    description: "Step into a glamorous shopping mall and dress up in the latest fashion trends to become a runway star. Compete in fashion battles, get styling tips, and enjoy a fabulous shopping adventure!",
    contributions: "I handled the porting process, including UI, gameplay systems, and DLC integration.",
    platforms: ["Nintendo Switch"],
    platformLinks: {
      "Nintendo Switch": "https://www.nintendo.com/us/store/products/shopping-mall-girl-switch/"
    },
    screenshots: ['./resource/img/shoppingmall1.avif', './resource/img/shoppingmall2.avif', './resource/img/shoppingmall3.avif']
  }
};

Object.assign(galleryGameData, {
  starTrekLegends: {
    title: 'Star Trek: Legends',
    description: 'Assemble your crew of iconic Star Trek characters and command the U.S.S. Artemis in this strategy-based RPG. Battle through turn-based missions, shape the story with your choices, and explore a richly detailed 3D universe.',
    contributions: 'As part of a 4-person team, I focused on performance optimization, visual improvements, and bug fixing. I also contributed to localization, helping the game reach a wider international audience.',
    platforms: ['Nintendo Switch', 'Xbox One', 'PlayStation'],
    platformLinks: {
      'Nintendo Switch': 'https://www.nintendo.com/us/store/products/star-trek-legends-switch/',
      'Xbox One': 'https://www.xbox.com/en-EN/games/store/star-trek-legends/9NSHDL2QS0KS/0010',
      'PlayStation': 'https://store.playstation.com/pl-pl/concept/10012864'
    },
    screenshots: ['./resource/img/startrek1.avif', './resource/img/startrek2.avif', './resource/img/startrek3.avif']
  },
  neonOn: {
    title: 'Neon On!',
    description: 'Untangle and connect vibrant neon cables to their matching sockets to light up stunning animated signs. Solve color-matching puzzles across dynamic levels full of interactive obstacles like lasers and rotating boxes.',
    contributions: 'I ported the game, implemented new shaders for improved visuals, and integrated additional puzzles and 3D models. I also redesigned UI elements and ensured seamless functionality across platforms.',
    platforms: ['Nintendo Switch'],
    platformLinks: {
      'Nintendo Switch': 'https://www.nintendo.com/us/store/products/neon-on-switch/'
    },
    screenshots: ['./resource/img/neon1.avif', './resource/img/neon2.avif']
  },
  parkingJam: {
    title: 'Parking Jam',
    description: 'Clear crowded parking lots by moving vehicles strategically across five challenging game modes. Use powerups, unlock maps, and show off your puzzle-solving skills in local multiplayer or solo.',
    contributions: 'I worked on UI development, bug fixing, and implemented new gameplay modes including multiplayer. I also helped design new maps and supported content updates through DLC integration.',
    platforms: ['Nintendo Switch'],
    platformLinks: {
      'Nintendo Switch': 'https://www.nintendo.com/us/store/products/parking-jam-switch/'
    },
    screenshots: ['./resource/img/parking1.avif', './resource/img/parking2.avif']
  },
  paperIo2: {
    title: 'Paper io 2',
    description: 'Claim territory by painting over the map in fast-paced solo or multiplayer matches for up to 8 players. Outsmart opponents and dominate dozens of unique maps while avoiding elimination.',
    contributions: 'I contributed to performance improvements and technical stability. My work included resolving a critical memory issue, which significantly improved long-session performance without altering gameplay.',
    platforms: ['PlayStation'],
    platformLinks: {
      'PlayStation': 'https://store.playstation.com/pl-pl/concept/10009532'
    },
    screenshots: ['./resource/img/paper1.avif', './resource/img/paper2.avif']
  },
  omNomRun2: {
    title: 'Om Nom: Run 2',
    description: 'Race through obstacle-filled environments as Om Nom in this fast-paced arcade runner. Outspeed rivals, dodge traps, and find the quickest paths to victory across vibrant, animated tracks.',
    contributions: 'I initiated the game’s port and built the core porting structure used by the team. I also refactored and improved the project architecture to streamline development and make future contributions easier for other programmers.',
    platforms: ['Nintendo Switch'],
    platformLinks: {
      'Nintendo Switch': 'https://www.nintendo.com/store/products/om-nom-run-2-switch-dummy/'
    },
    screenshots: ['./resource/img/omnom1.avif', './resource/img/omnom2.avif', './resource/img/omnom3.avif']
  },
  acrylicNails: {
    title: 'Acrylic Nails!',
    description: 'Create dazzling nail art using a wide variety of polishes, stencils, and accessories in your own beauty salon. Shape, paint, and decorate to satisfy clients and earn top ratings.',
    contributions: 'I ported the game to PS4 and built custom tools to replace Unity SDK features unavailable on the platform. This included implementing missing functionality using the native PlayStation SDK and adapting UI and input systems for console.',
    platforms: ['PlayStation'],
    platformLinks: {
      'PlayStation': 'https://store.playstation.com/pl-pl/concept/10009947'
    },
    screenshots: ['./resource/img/nails1.avif', './resource/img/nails2.avif']
  },
  notNotBrainBuster: {
    title: 'Not Not - A Brain Buster',
    description: 'Challenge your brain in this fast-paced logic puzzle game packed with misleading instructions and mind-bending twists, now with multiplayer on Nintendo Switch.',
    contributions: 'I was responsible for bug fixing,focusing on gameplay stability and edge-case crashes.',
    platforms: ['Microsoft Store', 'Xbox One'],
    platformLinks: {
      'Microsoft Store': 'https://www.xbox.com/pl-PL/games/store/not-not-a-brain-buster/9p5v8ks3b9sw',
      'Xbox One': 'https://www.xbox.com/pl-PL/games/store/not-not-a-brain-buster/9p5v8ks3b9sw'
    },
    screenshots: ['./resource/img/notnot1.avif', './resource/img/notnot2.avif']
  },
  multiMaze3D: {
    title: 'Multi Maze 3D',
    description: 'Guide colorful balls through twisty mazes and multiplier gates to fill the cup. Spin your way through levels packed with boosters, skins, and satisfying ball physics.',
    contributions: 'I optimized the game significantly, increasing performance. Improvements focused on rendering efficiency and memory use.',
    platforms: ['Nintendo Switch'],
    platformLinks: {
      'Nintendo Switch': 'https://www.nintendo.com/us/store/products/multi-maze-3d-switch/'
    },
    screenshots: ['./resource/img/maze1.avif', './resource/img/maze2.avif']
  },
  zombieDefense: {
    title: 'Zombie Defense',
    description: 'Defend your base from endless zombie hordes using weapons, traps, turrets, and even tanks. Play solo or with a friend in chaotic co-op mode across multiple locations.',
    contributions: 'I handled the console port, including UI, gameplay systems, co-op mode, localization, and balance tuning. I also ensured platform compliance and optimized performance across modes.',
    platforms: ['Nintendo Switch'],
    platformLinks: {
      'Nintendo Switch': 'https://www.nintendo.com/us/store/products/zombie-defense-switch/'
    },
    screenshots: ['./resource/img/zoombie1.avif', './resource/img/zoombie2.avif', './resource/img/zoombie3.avif']
  },
  masterChefLearnToCook: {
    title: 'MasterChef: Learn to Cook!',
    description: 'Step into the kitchen and prove yourself in MasterChef: Learn to Cook! Play fun cooking mini-games, master over 120 global recipes, customize your chef, and take on culinary challenges judged by the iconic MasterChef panel.',
    contributions: 'Collaborated in a 4-person team to implement UI features, gameplay improvements, and localization. Also handled key bug fixes and helped polish the overall user experience.',
    platforms: ['PlayStation', 'Nintendo Switch', 'Xbox One'],
    platformLinks: {
      'PlayStation': 'https://store.playstation.com/pl-pl/product/EP2696-CUSA51366_00-0000000000000000',
      'Nintendo Switch': 'https://www.nintendo.com/us/store/products/masterchef-learn-to-cook-switch/',
      'Xbox One': 'https://www.xbox.com/pl-PL/games/store/masterchef-learn-to-cook-complete-edition/9N4THBQ1PR79'
    },
    screenshots: ['./resource/img/chef1.avif', './resource/img/chef2.avif', './resource/img/chef3.avif']
  },
  johnnyTrigger: {
    title: 'Johnny Trigger',
    description: 'Take down the mafia in this stylish, fast-paced action shooter. Flip, slide, and blast your way through short, high-impact levels as Johnny Trigger — the ultimate action hero.',
    contributions: 'Handled the full PC/Steam port, adapting controls and performance for desktop play. Added multi-language support and implemented localization across all UI and gameplay elements.',
    platforms: ['Steam'],
    platformLinks: {
      'Steam': 'https://store.steampowered.com/app/2751320/Johnny_Trigger/'
    },
    screenshots: ['./resource/img/johnny1.avif', './resource/img/johnny2.avif', './resource/img/johnny3.avif']
  },
  holeIo: {
    title: 'Hole io',
    description: 'Become an unstoppable black hole and swallow everything in your path! Compete with friends in local multiplayer or enjoy solo chaos across a variety of maps and game modes.',
    contributions: 'Contributed to UI enhancements, implemented a new gameplay mode, and handled bug fixing in collaboration with the team. Focused on gameplay stability and smooth multiplayer integration.',
    platforms: ['Nintendo Switch'],
    platformLinks: {
      'Nintendo Switch': 'https://www.nintendo.com/us/store/products/hole-io-switch/'
    },
    screenshots: ['./resource/img/hole1.avif', './resource/img/hole2.avif']
  },
  farmIt: {
    title: 'Farm It',
    description: 'Build and manage your dream farm in this relaxing simulation game. Grow crops, care for animals, cook meals, and sell your goods—all while customizing your farmer and surroundings.',
    contributions: 'Improved gameplay mechanics and visual polish while optimizing performance. Enhanced physics and graphics to deliver smoother farming interactions.',
    platforms: ['Nintendo Switch'],
    platformLinks: {
      'Nintendo Switch': 'https://www.nintendo.com/us/store/products/farm-it-switch/'
    },
    screenshots: ['./resource/img/farm1.avif', './resource/img/farm2.avif', './resource/img/farm3.avif']
  },
  sausagewars: {
    title: 'Sausage Wars',
    description: 'An over-the-top party brawler for up to 4 players and 20 bots where sausages clash in brutal kitchen battles! Head-butt, push, and outmaneuver your enemies into deadly traps—from knife racks to blazing stoves—in a fight for sausage supremacy.',
    contributions: 'Handled critical bug fixing and stability improvements across multiplayer and physics systems.',
    platforms: ['Steam', 'Xbox One'],
    platformLinks: {
      'Steam': 'https://store.steampowered.com/app/2290210/Sausage_Wars/',
      'Xbox One': 'https://www.xbox.com/pl-PL/games/store/sausage-wars/9NRTQ7R64DVC/0010'
    },
    screenshots: ['./resource/img/sausagewars1.avif', './resource/img/sausagewars2.avif', './resource/img/sausagewars3.avif']
  },
  chaosislands: {
    title: 'Chaos Islands',
    description: 'One of the leading architecture design using a custom ECS framework (Sirex ECS). Developed core gameplay mechanics, tools including enemy systems, part of the construction/building logic, card systems, and gamepad input. Also contributed to game design and production strategy.',
    contributions: 'Handled critical bug fixing and stability improvements across multiplayer and physics systems.',
    platforms: ['Steam'],
    platformLinks: {
      'Steam': 'https://store.steampowered.com/app/2891320/Chaos_Islands/',
    },
    screenshots: ['./resource/img/ci1.jpg', './resource/img/ci2.jpg', './resource/img/ci3.jpg']
  },
  tabletop: {
    title: 'Tabletop Fusion',
    description: 'A card fusion game where players combine base cards to create powerful new ones and trade them for currency. Complete quests, discover rare recipes, and build the ultimate deck.',
    contributions: 'Designed the game concept and systems, implemented the card fusion (recipe) mechanic, developed the quest system, and contributed to game art and UI layout.',
    platforms: ['PC', 'WebGL'],
    platformLinks: {
      'PC': 'https://vo1z.itch.io/tabletop-fusion',
      'WebGL': 'https://vo1z.itch.io/tabletop-fusion-web',
    },
    screenshots: ['./resource/img/table1.png', './resource/img/table2.png']
  },
  candy: {
    title: 'Candy go home',
    description: 'A quirky first-person shooter where you play as a sentient piece of trash candy fighting waves of enemies across surreal environments. Battle to survive and progress through increasingly challenging stages.',
    contributions: 'Designed and implemented enemy behaviors, wave progression systems, and player feedback loops. Also handled character and enemy animations and level pacing.',
    platforms: ['PC'],
    platformLinks: {
      'PC': 'https://vo1z.itch.io/candy-go-home',
    },
    screenshots: ['./resource/img/candy1.png', './resource/img/candy2.png','./resource/img/candy3.png']
  }

  
});

// Platform icon mapping for gallery
const platformIconMap = {
  'Nintendo Switch': '<img src="./resource/img/nintendo-switch2.png" alt="Nintendo Switch" title="Nintendo Switch" style="height:32px;vertical-align:middle;">',
  'PlayStation': '<img src="https://cdn.simpleicons.org/playstation/000000/ffffff" alt="PlayStation" title="PlayStation" style="height:32px;vertical-align:middle;">',
  'Steam': '<img src="https://cdn.simpleicons.org/steam/000000/ffffff" alt="Steam" title="Steam" style="height:32px;vertical-align:middle;">',
  'Xbox One': '<img src="./resource/img/xbox-logo.png" alt="Xbox" title="Xbox" style="height:32px;vertical-align:middle;">',
  'PC': '<i class="fa fa-desktop fa-2x" title="PC" style="color:#000;"></i>',
  'Mobile': '<i class="fa-solid fa-mobile-screen fa-2x" title="Mobile"></i>',
  'Microsoft Store': '<i class="fa-brands fa-windows fa-2x" title="Microsoft Store"></i>',
  'WebGL': '<img src="./resource/img/webgl.svg" alt="WebGL" title="WebGL" style="height:32px;vertical-align:middle;">'
};

// Gallery game info functions
function showGalleryGameInfo(gameKey) {
  const gameData = galleryGameData[gameKey];
  if (!gameData) return;

  const infoContainer = document.getElementById('gallery-game-info');
  const titleElement = infoContainer.querySelector('.gallery-game-title');
  const descriptionElement = infoContainer.querySelector('.gallery-game-description');
  const platformsElement = infoContainer.querySelector('.platform-tags');
  const screenshotsElement = infoContainer.querySelector('.gallery-screenshots');

  // Set title and description
  titleElement.textContent = gameData.title;
  descriptionElement.innerHTML = `${gameData.description}<br><br><span class='gallery-contributions'>${gameData.contributions || ''}</span>`;

  // Set platforms as icons with links if available
  platformsElement.innerHTML = gameData.platforms.map(platform => {
    const icon = platformIconMap[platform] || platform;
    const link = gameData.platformLinks && gameData.platformLinks[platform];
    if (link) {
      return `<span class="platform-tag"><a href="${link}" target="_blank" rel="noopener noreferrer" class="platform-link">${icon}</a></span>`;
    }
    return `<span class="platform-tag">${icon}</span>`;
  }).join('');

  // Set screenshots
  screenshotsElement.innerHTML = gameData.screenshots.map(screenshot =>
    `<img src="${screenshot}" alt="Screenshot" class="gallery-screenshot">`
  ).join('');

  // Show the modal
  infoContainer.style.display = 'flex';
  setTimeout(() => {
    infoContainer.classList.add('show');
  }, 10);
}

function hideGalleryGameInfo() {
  const infoContainer = document.getElementById('gallery-game-info');
  infoContainer.classList.remove('show');
  setTimeout(() => {
    infoContainer.style.display = 'none';
  }, 300);
}

// Add event listeners for gallery items
document.addEventListener('DOMContentLoaded', function() {
  // Gallery item click handlers
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const gameKey = this.getAttribute('data-game');
      if (gameKey && galleryGameData[gameKey]) {
        showGalleryGameInfo(gameKey);
      }
    });
  });

  // Close button handler
  const closeButton = document.querySelector('.close-gallery-info');
  if (closeButton) {
    closeButton.addEventListener('click', hideGalleryGameInfo);
  }

  // Close on background click
  const infoContainer = document.getElementById('gallery-game-info');
  if (infoContainer) {
    infoContainer.addEventListener('click', function(e) {
      if (e.target === this) {
        hideGalleryGameInfo();
      }
    });
  }

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideGalleryGameInfo();
    }
  });
});
