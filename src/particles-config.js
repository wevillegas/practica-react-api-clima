export const rainOptions = {
    particles: {
        number: {
            value: 100, // Cantidad de gotas
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.5,
            random: true,
        },
        size: {
            value: 3, // Tamaño de las gotas
            random: true,
        },
        move: {
            enable: true,
            speed: 12, // Velocidad de la lluvia
            direction: "bottom",
            straight: true,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: false,
            },
            onClick: {
                enable: false,
            },
        },
    },
    background: {
        color: "#4682b4", // Fondo azul acero
    },
};

// Configuración para la nieve
export const snowOptions = {
    particles: {
        number: {
            value: 150, // Cantidad de copos
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.8,
            random: true,
        },
        size: {
            value: 4, // Tamaño de los copos
            random: true,
        },
        move: {
            enable: true,
            speed: 2, // Velocidad de la nieve (más lenta)
            direction: "bottom",
            straight: false, // Los copos no caen rectos
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: false,
            },
        },
    },
    background: {
        color: "#2f4f4f", // Fondo gris oscuro
    },
};

// Configuración para cielo despejado (estrellas titilando)
export const clearOptions = {
    particles: {
        number: {
            value: 80, // Cantidad de estrellas
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.8,
            random: true,
            anim: { // Animación de titileo
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 2,
            random: true,
        },
        move: {
            enable: false, // Las estrellas no se mueven
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: false,
            },
        },
    },
    background: {
        color: "#0c1f3c", // Fondo azul noche
    },
};

// Configuración para nubes
export const cloudsOptions = {
    ...clearOptions, // Usamos la base de cielo despejado
    background: {
        color: "#b0c4de", // Pero con un fondo grisáceo
    },
};

// Configuración por defecto
export const defaultOptions = {
    background: {
        color: "#708090", // Fondo gris por defecto
    },
};