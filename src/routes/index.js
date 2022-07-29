import Setup from '../views/setup.svelte';
import Prepare from '../views/prepare.svelte';
import ReadyToSend from '../views/readyToSend.svelte';
import Sent from '../views/sent.svelte';

const routes = [
  {
    name: '/',
    component: Setup,
  },
  {
    name: '/prepare',
    component: Prepare,
  },
  {
    name: '/readyToSend',
    component: ReadyToSend,
  },
  {
    name: '/sent',
    component: Sent,
  },
]

export { routes };