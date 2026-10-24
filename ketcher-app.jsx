import React from 'react';
import ReactDOM from 'react-dom/client';
import { Editor } from 'ketcher-react';
import { StandaloneStructServiceProvider } from 'ketcher-standalone';

const sp = new StandaloneStructServiceProvider();
const el = document.getElementById('kApp');
if (el) {
  ReactDOM.createRoot(el).render(
    React.createElement(Editor, {
      structServiceProvider: sp,
      errorHandler: function (m) { console.error("Ketcher:", m); window.__kErr = String(m); },
      onInit: function (k) { window.ketcher = k; window.__kReady = true; }
    })
  );
}
