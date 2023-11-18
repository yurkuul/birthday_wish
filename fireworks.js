class Particle {
    constructor(x, y, color, size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.friction = 0.99;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

class Firework {
    constructor(x, y, color, size) {
        this.x = x;
        this.y = y;
        this.initialY = canvas.height;
        this.color = color;
        this.size = size;
        this.velocity = { x: 0, y: Math.random() * -2.5 - 0.5 };
        this.particles = [];
        this.lifespan = 180;
        this.hasExploded = false;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    explode() {
        for (let i = 0; i < 50; i++) {
            const particleSize = Math.random() * 3 + 1; // Random size between 1 and 4
            this.particles.push(new Particle(this.x, this.y, this.color, particleSize));
        }
    }

    update() {
        this.lifespan--;

        if (this.lifespan <= 0 && !this.hasExploded) {
            this.explode();
            this.velocity = { x: 0, y: 0 };
            this.hasExploded = true;
        } else if (this.lifespan > 0) {
            this.y += this.velocity.y;
        }

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();

        if (firework.lifespan <= 0 && firework.particles.every(p => p.alpha <= 0)) {
            fireworks.splice(index, 1);
        }
    });

    // Increased frequency of fireworks
    if (Math.random() < 0.03) {
        const x = Math.random() * canvas.width;
        const colors = ["purple", "red", "green"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 3 + 2; // Random size between 2 and 5
        fireworks.push(new Firework(x, canvas.height, color, size));
    }
}