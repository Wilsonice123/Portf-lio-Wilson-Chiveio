document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const email = 'wchiveio@gmail.com';

    if (!name || !message) {
        alert('Por favor, preencha o nome e a mensagem.');
        return;
    }

    const text = `Olá, meu nome é ${name}. ${message}`;
    const msgFormatada = encodeURIComponent(text);
    const subject = encodeURIComponent('Mensagem através do formulário');
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${msgFormatada}`;

    // Abre o Gmail em uma nova aba
    window.open(url, '_blank');
});

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('.menu-link').forEach((link) => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-btn');

    function atualizarIconeTema() {
        themeBtn.textContent = document.body.classList.contains('light-mode') ? '☀️' : '⚙';
    }

    function aplicarTemaSalvo() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        atualizarIconeTema();
    }

    themeBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        if (isLight) {
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#000000';
        } else {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        }
        atualizarIconeTema();
    });

    aplicarTemaSalvo();
});

// Efeito de digitação simples para o subtítulo
const roles = ['Desenvolvedor Front-end', 'Criador de Interfaces', 'Designer gráfico'];
const typedEl = document.getElementById('typed');
let roleIndex = 0;
let charIndex = 0;

function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIndex];
    if (charIndex <= current.length) {
        typedEl.textContent = current.slice(0, charIndex);
        charIndex++;
        setTimeout(typeLoop, 80);
    } else {
        setTimeout(() => eraseLoop(), 900);
    }
}

function eraseLoop() {
    const current = roles[roleIndex];
    if (charIndex > 0) {
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseLoop, 40);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeLoop, 200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    typeLoop();

    // reveal on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .sobre-conteudo, .projeto-card, .habilidades-conteudo, .serviços-conteudo, .cv-conteudo, .formulario-contato').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});