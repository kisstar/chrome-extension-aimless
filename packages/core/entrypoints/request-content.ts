import { registerInterceptors } from '@/entrypoints/content/request';

export default defineUnlistedScript(() => {
  registerInterceptors();
});
