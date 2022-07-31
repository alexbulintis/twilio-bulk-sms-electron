import Setup from '../views/setup.svelte';
import Prepare from '../views/prepare.svelte';
import ReadyToSend from '../views/readyToSend.svelte';
import Sent from '../views/sent.svelte';
import MainLayout from '../layouts/mainLayout.svelte';

const routes = [
  {
    name: '/',
    component: Setup,
    layout: MainLayout,
    title: 'Setup',
  },
  {
    name: '/prepare',
    component: Prepare,
    layout: MainLayout,
    title: 'Prepare',
  },
  {
    name: '/ready-to-send',
    component: ReadyToSend,
    layout: MainLayout,
    title: 'Ready to send',
  },
  {
    name: '/sent',
    component: Sent,
    layout: MainLayout,
    title: 'Sent',
  },
]

export { routes };