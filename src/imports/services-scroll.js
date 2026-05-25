/* COMPLETE JS — sticky stage + transform-driven stacking (matches your reference pattern) */
(function () {
	"use strict";

	if (!window.gsap || !window.ScrollTrigger) return;
	gsap.registerPlugin(ScrollTrigger);

	var root = document.querySelector("#services-scroll");
	if (!root) return;

	var prefersReduced = !!(
		window.matchMedia &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches
	);

	var stage = root.querySelector(".svc__stage");
	var cards = Array.prototype.slice.call(root.querySelectorAll(".svc__card"));
	var imgs = Array.prototype.slice.call(root.querySelectorAll(".svc__img"));
	var triggers = Array.prototype.slice.call(
		root.querySelectorAll(".svc__trigger")
	);
	var progressFill = root.querySelector(".svc__progressFill");

	if (!stage || !cards.length || triggers.length !== cards.length) return;

	// read --svc-enter from CSS (fallback to stage height + 200)
	var enterY = 0;
	try {
		var v = window
			.getComputedStyle(document.documentElement)
			.getPropertyValue("--svc-enter");
		var n = parseFloat(v);
		enterY = isFinite(n) && n > 0 ? n : 0;
	} catch (e) {}
	if (!enterY) enterY = (stage.offsetHeight || 600) + 200;

	// z-index: later cards above earlier
	for (var z = 0; z < cards.length; z++) cards[z].style.zIndex = String(z + 1);

	// initial transforms: card0 at 0, others start fully below the stage (hidden)
	gsap.set(cards[0], { y: 0, scale: 1 });
	for (var i = 1; i < cards.length; i++)
		gsap.set(cards[i], { y: enterY, scale: 1 });

	gsap.set(progressFill, { scaleX: 0, transformOrigin: "0% 50%" });

	var activeImg = 0;
	function setActiveImage(i) {
		if (!imgs.length || i === activeImg) return;
		for (var k = 0; k < imgs.length; k++) {
			if (k === i) imgs[k].classList.add("is-active");
			else imgs[k].classList.remove("is-active");
		}
		activeImg = i;
	}

	// progress across whole trigger runway
	ScrollTrigger.create({
		trigger: root.querySelector(".svc__triggers"),
		start: "top top",
		end: "bottom bottom",
		onUpdate: function (st) {
			gsap.to(progressFill, {
				scaleX: st.progress,
				duration: prefersReduced ? 0 : 0.08,
				overwrite: true,
				ease: "none"
			});
		}
	});

	// transitions: next card moves from below (enterY) to 0; previous shrinks near the end
	for (var j = 0; j < cards.length - 1; j++) {
		(function (prevIdx, nextIdx) {
			var prev = cards[prevIdx];
			var next = cards[nextIdx];
			var trig = triggers[nextIdx];

			var tl = gsap.timeline({
				scrollTrigger: {
					trigger: trig,
					start: "top bottom", // next begins approaching from below
					end: "top top+=24", // when next reaches the sticky top zone
					scrub: true
				}
			});

			// next comes up into place (NO opacity animation)
			tl.to(next, { y: 0, ease: "none" }, 0);

			// prev shrinks only near the end of the overlap
			// prev shrinks only near the end of the overlap
			tl.to(
				prev,
				{
					scale: prefersReduced ? 1 : 0.75,
					y: prefersReduced ? 0 : -22,
					ease: "none"
				},
				0
			);
		})(j, j + 1);
	}

	// image swaps based on which card is centered / current
	for (var t = 0; t < cards.length; t++) {
		(function (idx) {
			ScrollTrigger.create({
				trigger: triggers[idx],
				start: "top center",
				end: "bottom center",
				onEnter: function () {
					setActiveImage(idx);
				},
				onEnterBack: function () {
					setActiveImage(idx);
				}
			});
		})(t);
	}

	setActiveImage(0);
})();
