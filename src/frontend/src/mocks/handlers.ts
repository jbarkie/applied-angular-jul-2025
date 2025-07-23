import { identity_handlers } from './identity-handler';
import { links_handlers } from './links-handler';

export const handlers = [...links_handlers, ...identity_handlers];
