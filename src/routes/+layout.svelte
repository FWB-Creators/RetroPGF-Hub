<script lang="ts">
  import Navbar from '@/components/Navbar.svelte'
  import Footer from '@/components/Footer.svelte'
  export let title: string = 'RetroPGF Hub'
  import '../app.css'
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet"
  />
  <script src="https://code.highcharts.com/es5/highcharts.js"></script>
  <script src="https://code.highcharts.com/es5/modules/exporting.js"></script>
</svelte:head>

<div class="flex flex-col min-h-screen">
  <Navbar />
  <div class="bg-slate-50">
    <slot />
  </div>
  <div class="flex-grow" />
  <Footer />
</div>
