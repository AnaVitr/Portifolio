        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const size = Math.random() * 10 + 5;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const delay = Math.random() * 15;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.animationDelay = `${delay}s`;
                
                const colors = ['#8A2BE2', '#4B0082', '#BA55D3', '#9370DB'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.background = color;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        function setupMonalisa() {
            let canvas = document.getElementById('monalisa-canvas');
            let p5Instance = new p5(function(sketch) {
                sketch.setup = function() {
                    sketch.createCanvas(350, 250).parent('monalisa-canvas');
                }
                
                let X;
                let Y;
                
                sketch.draw = function() {
                    sketch.background(`#FF5722`);
                    sketch.fill('#03A9F4');
                    sketch.circle(175,125,200);
                    sketch.fill('white');
                    sketch.circle(130,95,40);
                    sketch.circle(220,95,40);
                    sketch.line(130,170,220,150);
                    sketch.fill('#3F51B5');
                    sketch.triangle(175,115,155,140,190,140);
                    sketch.line(110,75,155,72);
                    sketch.line(195,73,240,68);
                    
let olhoX = sketch.map(175, 0, 350, 115, 145); // valor fixo no meio
let olgoY = sketch.map(125, 0, 250, 85, 105); // idem

                    
                    sketch.circle(olhoX,olgoY,7);
                    sketch.circle(olhoX+90,olgoY,7);
                }
            }, canvas);
        }
        
        function setupCorrida1() {
            let canvas = document.getElementById('corrida1-canvas');
            let p5Instance = new p5(function(sketch) {
                let xJogador1 = 0;
                let xJogador2 = 0;

                sketch.setup = function() {
                    sketch.createCanvas(350, 250).parent('corrida1-canvas');
                }

                sketch.draw = function() {
                    if (sketch.focused == true) {
                        sketch.background("#D2EBB5");
                    } else {
                        sketch.background("rgb(238,178,178)");
                    }
                    
                    sketch.textSize(30);
                    sketch.text("😎", xJogador1, 70);
                    sketch.text("❤️", xJogador2, 180);
                    
                    sketch.rect(300, 0, 10, 250);
                    
                    if (xJogador1 > 300) {
                        sketch.textSize(20);
                        sketch.text("Jogador 1 venceu!", 50, 130);
                        sketch.noLoop();
                    }
                    if (xJogador2 > 300) {
                        sketch.textSize(20);
                        sketch.text("Jogador 2 venceu!", 50, 130);
                        sketch.noLoop();
                    }
                }

                sketch.keyReleased = function() {
                    if (sketch.key == "a") {
                        xJogador1 += sketch.random(20);
                    }
                    if (sketch.key == "s") {
                        xJogador2 += sketch.random(20);
                    }
                }
            }, canvas);
        }
        
        function setupCorrida2() {
            let canvas = document.getElementById('corrida2-canvas');
            let p5Instance = new p5(function(sketch) {
                let xJogador = [0, 0, 0, 0];
                let yJogador = [50, 100, 150, 200];
                let jogador = ["😎", "❤️", "🐱‍👤", "🐱‍🐉"];
                let teclas = ["a", "s", "d", "f"];
                let quantidade = jogador.length;

                sketch.setup = function() {
                    sketch.createCanvas(350, 250).parent('corrida2-canvas');
                }

                sketch.draw = function() {
                    if (sketch.focused == true) {
                        sketch.background("#1E4AD6");
                    } else {
                        sketch.background("rgb(185,33,33)");
                    }
                    
                    sketch.textSize(30);
                    for (let i = 0; i < quantidade; i++) {
                        sketch.text(jogador[i], xJogador[i], yJogador[i]);
                    }
                    
                    sketch.fill("white");
                    sketch.rect(300, 0, 10, 250);
                    sketch.fill("black");
                    for (let yAtual = 0; yAtual < 250; yAtual += 15) {
                        sketch.rect(300, yAtual, 10, 8);
                    }
                    
                    for (let i = 0; i < quantidade; i++) {
                        if (xJogador[i] > 300) {
                            sketch.textSize(18);
                            sketch.text(jogador[i] + " venceu!", 50, 130);
                            sketch.noLoop();
                        }
                    }
                }

                sketch.keyReleased = function() {
                    for (let i = 0; i < quantidade; i++) {
                        if (sketch.key == teclas[i]) {
                            xJogador[i] += sketch.random(20);
                        }
                    }
                }
            }, canvas);
        }
        
        window.addEventListener('DOMContentLoaded', (event) => {
            createParticles();
            setupMonalisa();
            setupCorrida1();
            setupCorrida2();
            
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                });
            });
            
            document.querySelector('.contato-form').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Obrigada pelo seu contato! Em breve retornarei sua mensagem.');
                this.reset();
            });
        });