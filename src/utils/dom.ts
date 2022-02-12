/**
 * DOM related
 */

export const $: typeof document.querySelector = document.querySelector.bind(document);

export const createEl: typeof document.createElement = document.createElement.bind(document);
