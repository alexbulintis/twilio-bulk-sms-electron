<script>
  import { Route } from 'svelte-router-spa';
  import { routes } from '../routes';
  export let currentRoute;
</script>

<main>
  <div class="text-sm breadcrumbs">
    <ul>
      {#each routes as route, i}
      {#if route.title !== 'Sent'}
        <li>
          <a class="{route.name === currentRoute.name ? 'bold' : ''}" href="{route.name}">{route.title}</a>
        </li>
      {/if}
      {/each}
    </ul>
  </div>
  <Route {currentRoute} />
</main>

<style>
  main {
    padding: 25px;
  }
  .bold {
    font-weight: bold !important;
  }
</style>