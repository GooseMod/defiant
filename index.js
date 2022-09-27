let wpRequire;

if (window.webpackJsonp) { // Older
  wpRequire = window.webpackJsonp.push([[], { get_require: (mod, _exports, wpRequire) => mod.exports = wpRequire }, [["get_require"]]]); // Get Webpack's require via injecting into webpackJsonp

  // Remove module injected
  delete wpRequire.m.get_require;
  delete wpRequire.c.get_require;
} else if (window.webpackChunkdiscord_app) { // New (Canary @ 22nd Oct)
  window.webpackChunkdiscord_app.push([[ Math.random() ], {}, (req) => { wpRequire = req; }]);
}

const remappers = [ // [ filter, handler]
  [ m => Object.values(m).some(x => x && x.FLEXIBLE && x.FIXED), m => {
    m.MenuStyle = Object.values(m).find(x => x?.FLEXIBLE);

    m.MenuSpinner = Object.values(m).find(x => x?.toString().includes('.loader'));
    m.MenuSpinner.displayName = 'MenuSpinner';

    m.MenuItem = () => null;

    m.default = Object.values(m).find(x => x.toString().includes('initialFocusPath'));
    m.default.displayName = 'Menu';
  } ],

  [ m => m.default?.prototype?.getPredicateSections, m => {
    console.log(m);
    m.default.displayName = 'SettingsView';
  } ],

  [ m => Object.values(m).some(y => y && y.prototype?.render?.toString().includes('linkButtonIcon')), m => {
    m.LinkButton = Object.values(m).find(x => x?.prototype?.render?.toString().includes('linkButtonIcon'));
    m.LinkButton.displayName = 'LinkButton';

    // m.DirectMessage = Object.values(m).find(x => x.toString().includes('getRecipientId'));
    // m.DirectMessage.displayName = 'DirectMessage';
  } ],

  [ m => m.default?.Sizes?.SIZE_10, m => {
    m.default.displayName = 'Text';
  } ],

  [ m => m.default?.toString().includes('titleClassName') && m.default?.toString().includes('sectionTitle'), m => {
    m.default.displayName = 'FormSection';
    console.log('wah', m);
  } ],

  [ m => m.default?.toString().includes('errorSeparator'), m => {
    m.default.displayName = 'FormTitle';
  } ],

  [ m => m.default?.toString().includes('helpdeskArticleId'), m => {
    m.default.displayName = 'SwitchItem';
  }],

  [ m => m.default?.toString().includes('shouldShowTooltip') && m.default?.Positions, m => {
    m.default.displayName = 'Tooltip';
  }],

  [ m => m.default?.rules && m.default?.defaultProps?.parser, m => {
    m.default.displayName = 'Markdown';
  } ],

  [ m => Object.values(m).some(y => y?.USER_REQUESTED), m => {
    m.API_HOST = location.host;

    m.DEFAULT_ROLE_COLOR = 10070709;
    m.ROLE_COLORS = Object.values(m).find(x => x?.includes?.(1752220));
  } ],

  [ m => m.default?.toString().includes('Positions.BOTTOM') && m.default?.toString().includes('Messages.SELECT'), m => {
    m.default.displayName = 'Select';

    m.SingleSelect = Object.values(m).filter(x => x.toString().includes('createElement') && !x.toString().includes('Messages'));
    m.SingleSelect.displayName = 'SingleSelect';
  } ],

  [ m => m.default?.toString().includes('disabled') && m.default?.toString().includes('selectable'), m => {
    m.default.displayName = 'FormText';
  }],

  [ m => m.default?.toString().includes('HORIZONTAL') && m.default?.toString().includes('justify'), m => {
    m.default.displayName = 'Flex';
  }],

  [ m => m.default?.toString().includes('titleClassName') && m.default?.toString().includes('style'), m => {
    m.default.displayName = 'FormItem';
  } ],

  [ m  => Object.values(m).some(y => y?.toString?.().includes('USER_UPDATE') && y?.toString?.().includes('Promise.resolve')), m => {
    m.getUser = Object.values(m).find(x => x.toString().includes('USER_UPDATE') && x.toString().includes('Promise.resolve'));
    m.fetchCurrentUser = Object.values(m).find(x => x.toString().includes('CURRENT_USER'));
  }],

  [ m => m.default?.toString().includes('"h2"'), m => {
    m.default.displayName = 'ListSectionItem';
  }],

  [ m => m.default?.toString().includes('getMutablePrivateChannels'), m => {
    m.default.displayName = 'ConnectedPrivateChannelsList';
  }]
];

let changes = 0;
for (const i of Object.keys(wpRequire.c)) {
  const exports = wpRequire.c[i].exports;
  if (!exports || (typeof exports !== 'object' && typeof exports !== 'function')) continue;

  for (const k of [ 'Z', 'ZP' ]) {
    if (k in exports) {
      // Object.defineProperty(exports, 'default', { configurable: true, get() { return exports[k]; }, set(v) { console.log(k, v, exports); exports[k] = v; console.log(exports[k]); return v; }});
      exports.default = exports[k];
      changes++;
      continue;
    }
  }

  for (const [ filter, handler ] of remappers) {
    if (filter(exports)) handler(exports);
  }
}

console.log('remapped', changes, 'keys');

setTimeout(() => {
React = goosemod.webpackModules.findByProps('createElement');
o = React.createElement;
React.createElement = function(c) {
    if (c === undefined) {
        console.trace();
        return o('div');
    }
    return o.apply(this, arguments);
};
}, 5000);