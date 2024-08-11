
// import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const System = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 0);
    scene.add(ambientLight);
    scene.add(pointLight);

    const textureLoader = new THREE.TextureLoader();
    const planetData = [
        { name: 'Mercury', radius: 0.2, distance: 4, texture: 'textures/mercury.jpeg', rotationPeriod: (5 / 1) * 2, orbitalPeriod: (88 / 365) * 73, axialTilt: 0.034, eccentricity: 0.2056, inclination: 7.00, orbitColor: 0xffcc00  },
        { name: 'Venus', radius: 0.3, distance: 6, texture: 'textures/venus.jpeg', rotationPeriod: (3.0 / 1)* 2, orbitalPeriod: (225 / 365) * 73, axialTilt: 177.4, eccentricity: 0.0068, inclination: 3.39, orbitColor: 0xff9900  },
        { name: 'Earth', radius: 0.3, distance: 8, texture: 'textures/earth.jpeg', rotationPeriod: (2.0 / 1)* 2, orbitalPeriod: 73, axialTilt: 23.44, eccentricity: 0.0167, inclination: 0.00, orbitColor: 0x00ccff  },
        { name: 'Mars', radius: 0.25, distance: 10, texture: 'textures/Mars.webp', rotationPeriod: (1.03 / 1)* 6, orbitalPeriod: (687 / 365) * 73, axialTilt: 25.19, eccentricity: 0.0934, inclination: 1.85 , orbitColor: 0xff3300 },
        { name: 'Jupiter', radius: 0.5, distance: 14, texture: 'textures/jupiter.jpeg', rotationPeriod: (0.41 / 1) * 100, orbitalPeriod: (4333 / 365) * 73, axialTilt: 3.13, eccentricity: 0.0489, inclination: 1.30 , orbitColor: 0xff9900 },
        { name: 'Saturn', radius: 0.45, distance: 18, texture: 'textures/saturn.jpeg', rotationPeriod: (0.45 / 1)* 2, orbitalPeriod: (10759 / 365) * 73, axialTilt: 26.73, eccentricity: 0.0565, inclination: 2.48 , orbitColor: 0xffcc00 },
        { name: 'Uranus', radius: 0.4, distance: 22, texture: 'textures/uranus.jpeg', rotationPeriod: (0.72 / 1)* 2, orbitalPeriod: (30687 / 365) * 73, axialTilt: 97.77, eccentricity: 0.0463, inclination: 0.77 , orbitColor: 0x66ccff },
        { name: 'Neptune', radius: 0.4, distance: 26, texture: 'textures/neptune.jpeg', rotationPeriod: (0.67 / 1)* 2, orbitalPeriod: (60190 / 365) * 73, axialTilt: 28.32, eccentricity: 0.0095, inclination: 1.77, orbitColor: 0x0033cc  }
    ];

    const planets = [];

    // Create planet orbits
    planetData.forEach(data => {
        const orbitRadius = data.distance * (1 - data.eccentricity);
        const curve = new THREE.EllipseCurve(
            0, 0,
            orbitRadius, orbitRadius,
            0, 2 * Math.PI,
            false,
            0
        );

        const points = curve.getPoints(100);
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const orbitMaterial = new THREE.LineBasicMaterial({ color: data.orbitColor });
        const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
        orbit.rotation.x = THREE.MathUtils.degToRad(90); // Rotate the orbit to lie on the XZ plane
        scene.add(orbit);
    });

    function randomizePlanetPositions() {
        planetData.forEach(data => {
            const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
            const texture = textureLoader.load(data.texture);
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const planet = new THREE.Mesh(geometry, material);

            // Apply axial tilt
            planet.rotation.z = THREE.MathUtils.degToRad(data.axialTilt);

            // Set initial position using orbital eccentricity and distance
            const distance = data.distance * (1 - data.eccentricity); // Adjusted for eccentricity
            const randomAngle = Math.random() * 2 * Math.PI; // Random start angle
            planet.position.x = distance * Math.cos(randomAngle);
            planet.position.z = distance * Math.sin(randomAngle);

            planet.userData = { name: data.name, radius: data.radius, rotationPeriod: data.rotationPeriod, orbitalPeriod: data.orbitalPeriod, eccentricity: data.eccentricity, inclination: data.inclination };
            scene.add(planet);
            planets.push(planet);
        });
    }

    randomizePlanetPositions(); // Call once to randomize positions on load

    const sunGeometry = new THREE.SphereGeometry(1, 64, 64);
    const sunTexture = textureLoader.load('textures/sun.jpeg');
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.userData = { radius: 1 };
    scene.add(sun);

    // Load the spaceship model using GLTFLoader
    const loader = new THREE.GLTFLoader();
    let spaceship;

    loader.load('spaceship/Spaceship/scene.gltf', function (gltf) {
        spaceship = gltf.scene;
        spaceship.scale.set(0.2, 0.2, 0.2); // Adjust the scale of the spaceship if necessary
        spaceship.position.set(0, 0, 5); // Set initial position
        scene.add(spaceship);

        // If you want the camera to follow the spaceship:
        camera.position.set(0, 2, 10);
        camera.lookAt(spaceship.position);
    }, undefined, function (error) {
        console.error(error);
    });

    const slider = document.getElementById('slider');
    const maxSliderValue = planetData.find(data => data.name === 'Earth')?.orbitalPeriod || 100;
    slider.max = maxSliderValue;
    slider.value = maxSliderValue / 2;

    const speedSlider = document.getElementById('speedSlider');
    speedSlider.min = 1;
    speedSlider.max = 10;
    speedSlider.value = 1;

    const slowDownFactor = 0.1;

    const movementControls = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        up: false,
        down: false,
        boost: false,
        rotateLeft: false,
        rotateRight: false
    };

    window.addEventListener('keydown', function (event) {
        if (event.key === 'w') movementControls.forward = true;
        if (event.key === 's') movementControls.backward = true;
        if (event.key === 'a') movementControls.left = true;
        if (event.key === 'd') movementControls.right = true;
        if (event.key === 'ArrowUp') movementControls.up = true;
        if (event.key === 'ArrowDown') movementControls.down = true;
        if (event.key === 'Shift') movementControls.boost = true;
        if (event.key === 'ArrowLeft') movementControls.rotateLeft = true;
        if (event.key === 'ArrowRight') movementControls.rotateRight = true;
        if (event.key === ' ') { // Space to reset position
            if (spaceship) spaceship.position.set(0, 0, 5);
        }
    });

    window.addEventListener('keyup', function (event) {
        if (event.key === 'w') movementControls.forward = false;
        if (event.key === 's') movementControls.backward = false;
        if (event.key === 'a') movementControls.left = false;
        if (event.key === 'd') movementControls.right = false;
        if (event.key === 'ArrowUp') movementControls.up = false;
        if (event.key === 'ArrowDown') movementControls.down = false;
        if (event.key === 'Shift') movementControls.boost = false;
        if (event.key === 'ArrowLeft') movementControls.rotateLeft = false;
        if (event.key === 'ArrowRight') movementControls.rotateRight = false;
    });

    function moveSpaceship() {
        if (!spaceship) return; // Ensure the spaceship is loaded before moving

        const speed = movementControls.boost ? 0.2 : 0.1;

        const forwardDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(spaceship.quaternion);
        const rightDirection = new THREE.Vector3(1, 0, 0).applyQuaternion(spaceship.quaternion);

        if (movementControls.forward) spaceship.position.addScaledVector(forwardDirection, speed);
        if (movementControls.backward) spaceship.position.addScaledVector(forwardDirection.negate(), speed);
        if (movementControls.left) spaceship.position.addScaledVector(rightDirection.negate(), speed);
        if (movementControls.right) spaceship.position.addScaledVector(rightDirection, speed);
        if (movementControls.up) spaceship.position.y += speed;
        if (movementControls.down) spaceship.position.y -= speed;
        if (movementControls.rotateLeft) spaceship.rotation.y -= 0.02;
        if (movementControls.rotateRight) spaceship.rotation.y += 0.02;
    }

    function checkCollisions() {
        if (!spaceship) return;

        planets.forEach(planet => {
            const distance = spaceship.position.distanceTo(planet.position);
            const collisionDistance = planet.userData.radius + 0.1; // Closer buffer zone

            if (distance < collisionDistance) {
                // Smooth collision response: Push the spaceship away from the planet
                const direction = spaceship.position.clone().sub(planet.position).normalize();
                spaceship.position.addScaledVector(direction, 0.1);
            }
        });
    }

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = slider.value / slowDownFactor;
        const time = elapsedTime * 0.0001;

        const speedFactor = parseFloat(speedSlider.value);
        const adjustedRotationTime = elapsedTime * 0.001 * speedFactor;

        planets.forEach((planet, index) => {
            const data = planetData[index];
            const orbitRadius = data.distance * (1 - data.eccentricity);
            const angle = (time * Math.PI * 2) / data.orbitalPeriod;

            planet.position.x = orbitRadius * Math.cos(angle);
            planet.position.z = orbitRadius * Math.sin(angle);

            planet.rotation.y += (1 / data.rotationPeriod) * adjustedRotationTime; // Simulate planet rotation
        });

        moveSpaceship();
        checkCollisions();

        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    animate();
};

System();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});
