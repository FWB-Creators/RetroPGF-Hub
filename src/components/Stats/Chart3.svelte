<script>
  import { onMount } from 'svelte'
  import Chart from 'chart.js/auto'
  let data = [3706329, 3229011, 3064659]
  onMount(() => {
    const ctx = document.getElementById('3').getContext('2d')
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'Infrastructure & Dependencies',
          'Tooling & Utilities',
          'Educations',
        ],
        datasets: [
          {
            label: 'Amount of projects',
            backgroundColor: ['#ff1818', '#000000', '#FFC300', '#FF8C4F'],
            data: data,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
      },
    })
  })
</script>

<div class="md:w-[35em] md:h-[20em]"><canvas id="3" /></div>
