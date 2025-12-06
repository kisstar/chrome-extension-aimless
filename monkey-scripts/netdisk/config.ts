interface NetDiskConfig {
  shareLink: boolean
}

// 声明 window.__csa_ms_config
declare global {
  interface Window {
    __csa_ms_config: {
      netdisk: NetDiskConfig
    }
  }
}

export function shouldAdjustShareLink() {
  return window.__csa_ms_config?.netdisk?.shareLink ?? true
}
