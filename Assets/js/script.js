/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 700);

});


/* =========================================================
   TEMA DARK / LIGHT
========================================================= */

const themeBtn =
    document.getElementById("themeBtn");

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");


    if (isLight) {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        localStorage.setItem(
            "theme",
            "light"
        );

    } else {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

});


/* =========================================================
   MENU MOBILE
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");

const navLinks =
    document.querySelectorAll(".nav-link");


menuBtn.addEventListener("click", () => {

    menuBtn.classList.toggle("open");

    nav.classList.toggle("open");

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuBtn.classList.remove("open");

        nav.classList.remove("open");

    });

});


/* =========================================================
   HEADER AO ROLAR
========================================================= */

const header =
    document.getElementById("header");


let scrollTicking = false;


window.addEventListener(
    "scroll",
    () => {

        if (!scrollTicking) {

            window.requestAnimationFrame(() => {

                if (window.scrollY > 30) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }

                scrollTicking = false;

            });

            scrollTicking = true;

        }

    },
    { passive: true }
);


/* =========================================================
   TEXTO DIGITANDO
========================================================= */

const typingElement =
    document.getElementById("typing");


const words = [

    "estudante de tecnologia.",
    "desenvolvedor web.",
    "entusiasta de hardware.",
    "criador de projetos."

];


let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentWord =
        words[wordIndex];


    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1800
            );

            return;

        }

    } else {

        typingElement.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) %
                words.length;

        }

    }


    setTimeout(
        typeEffect,
        deleting ? 40 : 80
    );

}


typeEffect();


/* =========================================================
   REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "show"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================================================
   NAV ATIVA
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navItems =
    document.querySelectorAll(
        ".nav-link"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    const id =
                        entry.target.id;


                    navItems.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                }

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   PARTÍCULAS
========================================================= */

const particlesContainer =
    document.getElementById(
        "particles"
    );


const isMobile =
    window.innerWidth < 700;


const particleCount =
    isMobile ? 12 : 28;


const particleFragment =
    document.createDocumentFragment();


for (
    let i = 0;
    i < particleCount;
    i++
) {

    const particle =
        document.createElement("span");


    particle.classList.add(
        "particle"
    );


    particle.style.left =
        `${Math.random() * 100}%`;


    particle.style.animationDuration =
        `${9 + Math.random() * 12}s`;


    particle.style.animationDelay =
        `${Math.random() * 10}s`;


    particleFragment.appendChild(
        particle
    );

}


particlesContainer.appendChild(
    particleFragment
);


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.getElementById(
        "backTop"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    },
    { passive: true }
);


backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================================
   FORMULÁRIO - WEB3FORMS
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const button =
                contactForm.querySelector(
                    ".send-btn"
                );


            button.disabled = true;


            button.innerHTML = `
                Enviando...
                <i class="fa-solid fa-spinner fa-spin"></i>
            `;


            const formData =
                new FormData(contactForm);


            try {

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const data =
                    await response.json();


                if (data.success) {

                    formMessage.innerHTML = `
                        <span class="success-check">✓</span>
                        Mensagem enviada com sucesso!
                    `;


                    formMessage.style.color =
                        "#00ff88";


                    contactForm.reset();


                } else {

                    formMessage.textContent =
                        "Erro ao enviar a mensagem. Tente novamente.";


                    formMessage.style.color =
                        "#ff3030";

                }


            } catch (error) {

                console.error(
                    "Erro:",
                    error
                );


                formMessage.textContent =
                    "Erro de conexão. Tente novamente.";


                formMessage.style.color =
                    "#ff3030";

            }


            button.disabled = false;


            button.innerHTML = `
                Enviar mensagem
                <i class="fa-solid fa-paper-plane"></i>
            `;

        }
    );

}


/* =========================================================
   PARALLAX DESKTOP
========================================================= */

const canUseParallax =
    window.innerWidth > 1000 &&
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (canUseParallax) {

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                (
                    window.innerWidth / 2 -
                    event.clientX
                ) / 90;


            mouseY =
                (
                    window.innerHeight / 2 -
                    event.clientY
                ) / 90;

        },
        { passive: true }
    );


    function animateParallax() {

        currentX +=
            (mouseX - currentX) * 0.05;


        currentY +=
            (mouseY - currentY) * 0.05;


        if (heroVisual) {

            heroVisual.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;

        }


        requestAnimationFrame(
            animateParallax
        );

    }


    animateParallax();

}


/* =========================================================
   EFEITO DE CLIQUE NOS CARDS
========================================================= */

document
    .querySelectorAll(
        ".skill-card, .project-card"
    )
    .forEach(card => {

        card.addEventListener(
            "pointerdown",
            () => {

                card.style.transform =
                    "translateY(-3px) scale(.99)";

            }
        );


        card.addEventListener(
            "pointerup",
            () => {

                card.style.transform = "";

            }
        );


        card.addEventListener(
            "pointercancel",
            () => {

                card.style.transform = "";

            }
        );

    });


/* =========================================================
   EFEITO DE DIGITAÇÃO NO CONSOLE
========================================================= */

console.log(
    "%c Carlos Augusto ",
    "background:#ff1e1e;color:#fff;font-size:18px;font-weight:bold;padding:8px;"
);


console.log(
    "%c Desenvolvedor • Tecnologia • Hardware ",
    "color:#ff3030;font-size:12px;font-weight:bold;"
);


/* =========================================================
   MOUSE — BOLINHA + GLOW DEGRADÊ
========================================================= */

const canUseMouseEffect =
    window.innerWidth > 1000 &&
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (canUseMouseEffect) {

    /* ---------------------------------------------------------
       CRIA OS ELEMENTOS
    --------------------------------------------------------- */

    const mouseGlow =
        document.createElement("div");


    mouseGlow.className =
        "mouse-glow";


    const mouseFollower =
        document.createElement("div");


    mouseFollower.className =
        "mouse-follower";


    document.body.appendChild(
        mouseGlow
    );


    document.body.appendChild(
        mouseFollower
    );


    /* ---------------------------------------------------------
       POSIÇÃO
    --------------------------------------------------------- */

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;

    let followerX = 0;
    let followerY = 0;

    let mouseStarted = false;


    /* ---------------------------------------------------------
       MOUSE
    --------------------------------------------------------- */

    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;


            mouseY =
                event.clientY;


            if (!mouseStarted) {

                glowX = mouseX;
                glowY = mouseY;

                followerX = mouseX;
                followerY = mouseY;

                mouseStarted = true;


                mouseGlow.classList.add(
                    "active"
                );


                mouseFollower.classList.add(
                    "active"
                );

            }

        },
        {
            passive: true
        }
    );


    /* ---------------------------------------------------------
       ANIMAÇÃO
    --------------------------------------------------------- */

    function animateMouseEffect() {

        followerX +=
            (mouseX - followerX) * 0.16;


        followerY +=
            (mouseY - followerY) * 0.16;


        glowX +=
            (mouseX - glowX) * 0.075;


        glowY +=
            (mouseY - glowY) * 0.075;


        mouseFollower.style.transform =
            `translate3d(
                ${followerX}px,
                ${followerY}px,
                0
            ) translate(-50%, -50%)`;


        mouseGlow.style.transform =
            `translate3d(
                ${glowX}px,
                ${glowY}px,
                0
            ) translate(-50%, -50%)`;


        requestAnimationFrame(
            animateMouseEffect
        );

    }


    animateMouseEffect();


    /* ---------------------------------------------------------
       INTERAÇÃO COM ELEMENTOS
    --------------------------------------------------------- */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .skill-card, .project-card"
        );


    interactiveElements.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    mouseFollower.classList.add(
                        "hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    mouseFollower.classList.remove(
                        "hover"
                    );

                }
            );

        }
    );


    /* ---------------------------------------------------------
       ESCONDER AO SAIR DA JANELA
    --------------------------------------------------------- */

    document.addEventListener(
        "mouseleave",
        () => {

            mouseGlow.classList.remove(
                "active"
            );


            mouseFollower.classList.remove(
                "active"
            );

        }
    );


    document.addEventListener(
        "mouseenter",
        () => {

            if (mouseStarted) {

                mouseGlow.classList.add(
                    "active"
                );


                mouseFollower.classList.add(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   CARROSSEL DE PROJETOS
========================================================= */

const projectsTrack =
    document.getElementById(
        "projectsTrack"
    );


const projectPrev =
    document.getElementById(
        "projectPrev"
    );


const projectNext =
    document.getElementById(
        "projectNext"
    );


const projectDots =
    document.querySelectorAll(
        "#projectDots button"
    );


let currentProject = 0;


function updateProjectCarousel() {

    const cards =
        projectsTrack.querySelectorAll(
            ".project-card"
        );


    if (!cards.length) return;


    const cardWidth =
        cards[0].offsetWidth;


    projectsTrack.scrollTo({

        left:
            cardWidth *
            currentProject,

        behavior:
            "smooth"

    });


    projectDots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentProject
            );

        }
    );

}


/* =========================================================
   PRÓXIMO
========================================================= */

projectNext.addEventListener(
    "click",
    () => {

        const cards =
            projectsTrack.querySelectorAll(
                ".project-card"
            );


        currentProject++;


        if (
            currentProject >=
            cards.length
        ) {

            currentProject = 0;

        }


        updateProjectCarousel();

    }
);


/* =========================================================
   ANTERIOR
========================================================= */

projectPrev.addEventListener(
    "click",
    () => {

        const cards =
            projectsTrack.querySelectorAll(
                ".project-card"
            );


        currentProject--;


        if (
            currentProject < 0
        ) {

            currentProject =
                cards.length - 1;

        }


        updateProjectCarousel();

    }
);


/* =========================================================
   DOTS
========================================================= */

projectDots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                currentProject =
                    index;


                updateProjectCarousel();

            }
        );

    }
);


/* =========================================================
   DESLIZAR NO CELULAR
========================================================= */

let startX = 0;
let endX = 0;


projectsTrack.addEventListener(
    "touchstart",
    event => {

        startX =
            event.touches[0].clientX;

    }
);


projectsTrack.addEventListener(
    "touchend",
    event => {

        endX =
            event.changedTouches[0].clientX;


        const difference =
            startX - endX;


        if (
            Math.abs(difference) < 50
        ) return;


        if (difference > 0) {

            projectNext.click();

        } else {

            projectPrev.click();

        }

    }
);


/* =========================================================
   CURSOR +
========================================================= */

document.addEventListener(
    "mousemove",
    event => {

        document.documentElement.style.setProperty(
            "--mouse-x",
            `${event.clientX}px`
        );


        document.documentElement.style.setProperty(
            "--mouse-y",
            `${event.clientY}px`
        );

    }
);

