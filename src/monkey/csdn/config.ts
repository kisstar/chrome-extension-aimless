const config = {
  signModalSelector: '.passport-login-container',
  signTipSelector: '#csdn-toolbar-profile-nologin',
  showMoreBtnSelector: '.hide-preCode-box .look-more-preCode',
  styleClassName: 'ks-monkey-csdn',
  copyrightReg: /\s————————————————\s版权声明(.|\s)*/,
  copyEventSelector: '#content_views',
};

export type CSDNConfig = typeof config;

export default config;
