/* eslint-env browser, jquery */
/* global booya */
(function() {
  var enableUI = function() {
    jQuery(document).ready(function() {
      $('body').addClass('hubshop--booya-authenticated');
    });
  };
  if (/^https?:\/\/preview\.hs-sites\.com/i.test(location.href)) {
    enableUI();
    return;
  }
  if (!localStorage.booyaToken) {
    sessionStorage.removeItem('booyaIdentified');
  }
  var authCheck = function() {
    if (window.__booyaAuthCheck) {
      return window.__booyaAuthCheck();
    }
    return true;
  };
  if (sessionStorage.booyaIdentified && authCheck()) {
    enableUI();
  }
  booya.ready(function() {
    booya.on(booya.events.LOGIN_SUCCESS, function() {
      sessionStorage.setItem('booyaPendingTracking', true);
      sessionStorage.setItem('booyaTrackingTimestamp', new Date().getTime());
      location.reload();
    });
    booya.on(booya.events.OAUTH_LOGIN_SUCCESS, function() {
      sessionStorage.setItem('booyaPendingTracking', true);
      sessionStorage.setItem('booyaTrackingTimestamp', new Date().getTime());
      location.reload();
    });
    booya.on(booya.events.IDENTIFY_SUCCESS, function(e) {
      if (!e || !e.user || e.user.not_verified) {
        booya.on(booya.events.LOGOUT_SUCCESS, function() {
          // Override event handler to prevent navigation after logging out, no action needed
        });
        booya.logOut();
        return;
      }
      if (
        sessionStorage.booyaPendingTracking &&
        !sessionStorage.booyaTrackingTimestamp
      ) {
        sessionStorage.setItem('booyaTrackingTimestamp', new Date().getTime());
      }
      sessionStorage.setItem('booyaIdentified', true);
      if (authCheck()) {
        enableUI();
      }
      booya.on(booya.events.LOGOUT_SUCCESS, function() {
        sessionStorage.removeItem('booyaIdentified');
        sessionStorage.removeItem('booyaPendingTracking');
        sessionStorage.removeItem('booyaTrackingTimestamp');
        location.reload();
      });
    });
    booya.on(booya.events.IDENTIFY_FAILED, function(e) {
      booya.widgets.renderAuthWidgets({
        target: '#booya-wrapper',
        /* Uncomment the line below to open the widgets in a modal */
        modal: { isOpen: true },
        /* Uncomment the line below to request for email first 
        and show either show the sign in or register form depending on user's status */
        //multiStep: true,
      });
      sessionStorage.removeItem('booyaIdentified');
      jQuery(document).ready(function() {
        $('body').removeClass('hubshop--booya-authenticated');
      });
    });
  });
})();
