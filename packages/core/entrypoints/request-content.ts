import { registerInterceptors } from '@/entrypoints/content/interceptor';

export default defineUnlistedScript(() => {
  registerInterceptors();
});
