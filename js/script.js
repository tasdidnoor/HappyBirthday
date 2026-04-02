$(document).ready(function() {
    // 1. Dynamic Name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    if (name) {
        $('#name').text(name);
    }

    // 2. Gold Dust Particles
    const dustCanvas = document.getElementById('gold-dust');
    const dustCtx = dustCanvas.getContext('2d');
    let particles = [];

    function resizeDust() {
        dustCanvas.width = window.innerWidth;
        dustCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeDust);
    resizeDust();

    class Particle {
        constructor() {
            this.x = Math.random() * dustCanvas.width;
            this.y = Math.random() * dustCanvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > dustCanvas.width) this.x = 0;
            if (this.x < 0) this.x = dustCanvas.width;
            if (this.y > dustCanvas.height) this.y = 0;
            if (this.y < 0) this.y = dustCanvas.height;
        }
        draw() {
            dustCtx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            dustCtx.beginPath();
            dustCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            dustCtx.fill();
        }
    }

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animateDust() {
        dustCtx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateDust);
    }
    animateDust();

    // 3. Start Button Logic
    $('#play').click(function() {
        $('#loader').fadeOut(1000, function() {
            $('#main').fadeIn(1000);
            startConfetti();
            const audio = document.getElementById('song');
            audio.play();
            
            // Start Typed.js after fade in
            new Typed('#typed', {
                stringsElement: '#typed-strings',
                typeSpeed: 40,
                backSpeed: 20,
                loop: true
            });
        });
    });

    // 4. Gold Confetti Logic (Minimalist version)
    function startConfetti() {
        const canvas = document.getElementById('confetti');
        const ctx = canvas.getContext('2d');
        let pieces = [];
        const numberOfPieces = 50;
        const colors = ['#D4AF37', '#F5E6AB', '#FFFFFF', '#C0C0C0'];

        function resizeConfetti() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeConfetti);
        resizeConfetti();

        class Piece {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.rotation = Math.random() * 360;
                this.speed = Math.random() * 3 + 2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.width = Math.random() * 10 + 5;
                this.height = Math.random() * 10 + 5;
            }
            update() {
                this.y += this.speed;
                this.rotation += 1;
                if (this.y > canvas.height) {
                    this.y = -20;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
                ctx.restore();
            }
        }

        for (let i = 0; i < numberOfPieces; i++) {
            pieces.push(new Piece());
        }

        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateConfetti);
        }
        animateConfetti();
    }
});
