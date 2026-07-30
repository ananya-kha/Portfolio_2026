// HUD Reticle Mouse Tracking
const cursor = document.querySelector('.hud-cursor');
const dot = document.querySelector('.hud-cursor-dot');

document.addEventListener('mousemove', (e) => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
  
  cursor.animate({
    left: `${e.clientX}px`,
    top: `${e.clientY}px`
  }, { duration: 120, fill: "forwards" });
});

// Expand reticle on clickable/card hover
const interactiveElements = document.querySelectorAll('a, button, .card');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// Scroll Telemetry Observer (Controls PFD Pitch/Roll and Gauge Readouts)
const horizonBg = document.getElementById('horizonBg');
const pitchVal = document.getElementById('pitchVal');
const altVal = document.getElementById('altVal');
const thrustVal = document.getElementById('thrustVal');
const activeMod = document.getElementById('activeMod');
const streamDynamic = document.getElementById('streamDynamic');

const sections = document.querySelectorAll('.telemetry-section');

const observerOptions = {
  root: null,
  threshold: 0.4
};

const telemetryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const pitch = target.getAttribute('data-pitch');
      const alt = target.getAttribute('data-alt');
      const thrust = target.getAttribute('data-thrust');
      const moduleName = target.getAttribute('data-module');

      // Rotate and translate artificial horizon based on pitch data
      horizonBg.style.transform = `translateY(${pitch * 2}px) rotate(${pitch * 1.5}deg)`;

      // Update Gauge Readouts
      pitchVal.textContent = `${pitch}°`;
      altVal.textContent = `${alt} FT`;
      thrustVal.textContent = thrust;
      activeMod.textContent = moduleName;

      // Update Live Telemetry Stream Text
      streamDynamic.textContent = `> SYNC_SECTION: ${moduleName.replace('// ', '')}`;
    }
  });
}, observerOptions);

sections.forEach(sec => telemetryObserver.observe(sec));
