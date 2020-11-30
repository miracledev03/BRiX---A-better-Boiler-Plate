"use strict";

var AdvancedSection = function(Module) {
  function _init() {
    if (Module.classList.contains("-initiated")) return;

    Module.classList.add("-initiated");

    _removeFrontEndEmptySpace();
  }

  function _removeFrontEndEmptySpace() {

    if ( window.hsInEditor) {
      return;
		}
		
		Module.parentNode.parentNode.classList.add('-no-min-height')

   console.log('🚨');
  }

  // Start
  _init();
};

// Document ready
document.addEventListener("DOMContentLoaded", function() {
  const Modules = document.querySelectorAll('div[data-module="advanced-section"]');
  for (var i = 0; i < Modules.length; i++) {
    AdvancedSection(Modules[i]);
  }
});

(function() {
	
	/** 
	 * Document ready check
	 * 
	 * @version  1.0.0
	 * @since    1.0.0
	 */ 
	const domReady = function(callback) {
		if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
			callback();
		} else {
			document.addEventListener('DOMContentLoaded', callback);
		}
	}

	/** 
	 * Splitting Words Animation
	 * 
	 * @version  1.0.0
	 * @since    1.0.0
	 */ 
	const initSplittingWords = function() {

		const checkVisability =  function() {

			const isInViewport = function(el, topOffset) {
				const rect = el.getBoundingClientRect();
				return (
						rect.top >= 0 &&
						rect.left >= 0 &&
						rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
						rect.right <= (window.innerWidth || document.documentElement.clientWidth)
				);
			}

			const Elements = document.querySelectorAll('[data-splitting-words]');

			[].forEach.call(Elements, function(_Element) {
				const _offset = _Element.getAttribute('data-offset') ? parseInt(_Element.getAttribute('data-offset')) : 150;
				if ( isInViewport(_Element, _offset) ) {
					_Element.setAttribute('data-inview', 'yes')
				}
			});

		}

		Splitting({
			target: "[data-splitting-words]",
			by: "words",
		});

		checkVisability();
		window.scroll( checkVisability );
	}


	/** 
	 * Document ready check
	 * 
	 * @version  1.0.0
	 * @since    1.0.0
	 */ 
	const initSectionOptions = function(option, index, array) {

		/** 
		 * Section Options
		 */ 
		const sectionOptionsHandler = function(option, index, array) {

			if( option.enable === 'false' ) return;
			
			// console.log('🤖 option', option);
	
			const Module = document.getElementById(option.moduleID);
			const Section = Module.closest(".dnd-section")
	
			Section.classList.add('-with-custom-section-options');

			/* Typography */
 
			if( option.typography.override_text_color === 'true' ) {
				Section.classList.add('-override-text-color');
				Section.style.setProperty("--text-color", option.typography.text_color);
			}
			
			/* Full Height */

			if( option.layout.full_height === 'true' ) {
				Section.classList.add('-enable-full-height');
			}
		
			/* Background Color */

			if( option.background.enable_color === 'true' ) {
				Section.classList.add('-add-solid-color');
				Section.style.setProperty("--background-solidColor", option.background.solid_color);
			}
			
			/* Background Image */

			if( option.background.enable_image === 'true' ) {
				Section.classList.add('-add-background-image');
				Section.style.setProperty("--background-desktopImage", `url(${option.background.desktop_image})`);
				Section.style.setProperty("--background-tabletImage", `url(${option.background.tablet_image})`);
				Section.style.setProperty("--background-mobileImage", `url(${option.background.mobile_image})`);

				if( option.background.enable_parallax_effect === 'true' ) {
					Section.classList.add('-with-parallax-effect');
				}

			}
			
		}

		/* Init */
		if( !! window._fr ) {
			window._fr.sections.forEach(sectionOptionsHandler);

			// Inite parallax effec
			jarallax(document.querySelectorAll('.-with-parallax-effect'), { speed: 0.7 });

		}
	}
	/* Init */

	domReady(function() {
		if (!document.body) {
			return;
		} else {
			if( window._fr === null) {
				window._fr = [];
			}

			console.log( " Powered by %c HubSpot Framework Theme %c", "color: #fff; background: #0020f4; padding:5px 0;", "color: #fff; background: #242424; padding:5px 0 5px 5px;" );
			initSplittingWords();
			initSectionOptions();
		}
	});
	
})();
