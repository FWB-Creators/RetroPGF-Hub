<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import CardRound1 from '@/components/Archive/CardRound1.svelte'
  import CardRound2 from '@/components/Archive/CardRound2.svelte'
  import Alertbar from '@/components/Alertbar.svelte'

  interface ProjectDataRound1 {
    'Project Name': string
    'Project Website': string
    'Project Lead Email': string
    Leader: string
    Question: string
    allocation: string
  }

  interface ProjectDataRound2 {
    'Project Name': string
    Category: string
    '% of votes received': number
    'OP Received': number
    'Project Profile': string
  }

  let Data1: ProjectDataRound1[] = []
  let Data2: ProjectDataRound2[] = []
  let loading: boolean = true
  let itemsToShow: number = 20
  let totalItems: number
  let filteredProjects1: ProjectDataRound1[] = []
  let filteredProjects2: ProjectDataRound2[] = Data2

  const loadMore = () => {
    if (itemsToShow < totalItems) {
      itemsToShow += 10
    }
  }

  if (browser) {
    onMount(async () => {
      const response = await fetch('data/retroPGF2-dataset/results.json')
      Data2 = await response.json()
      filteredProjects2 = await Data2
      totalItems = Data2.length
      loading = false
    })
  }

  let round: string = 'Round 2'

  const changeRound = async (event: any) => {
    round = event?.target?.value ?? round
    if (round == 'Round 2') {
      const response = await fetch('data/retroPGF2-dataset/results.json')
      Data2 = await response.json()
      filteredProjects2 = await Data2
      console.log(filteredProjects2)
      totalItems = Data2.length
      loading = false
    } else if (round == 'Round 1') {
      const response = await fetch('data/retroPGF1-dataset/results_rpgf1.json')
      Data1 = await response.json()
      filteredProjects1 = Data1
      console.log(filteredProjects1)
      totalItems = Data1.length
      loading = false
    }
  }

  const categoryRound1 = ['All']
  const categoryRound2 = [
    'All',
    'Education',
    'Infrastructure',
    'Tooling and utilities',
  ]
  let showCategory: string = 'All'

  const filterCategory = (event: any) => {
    showCategory = event.target.value
    console.log(showCategory)
    if (round == 'Round 2') {
      if (showCategory === 'All') {
        filteredProjects2 = Data2
      } else {
        filteredProjects2 = Data2.filter(
          (project) => project['Category'] === showCategory
        )
        totalItems = filteredProjects2.length
      }
    } else {
      if (showCategory === 'All') {
        filteredProjects1 = Data1
        totalItems = filteredProjects1.length
      }
    }
  }
  const searchFilter = async (event: any) => {
    const message = event.target.value.toLowerCase().replace(/\s+/g, '')
    itemsToShow = 20
    if (round === 'Round 2') {
      if (!message) {
        filteredProjects2 = await Data2
        totalItems = filteredProjects2.length
      } else {
        filteredProjects2 = await Data2.filter((project: ProjectDataRound2) => {
          const projectName = project['Project Name'].toLowerCase()
          totalItems = filteredProjects2.length
          return projectName.includes(message)
        })
      }
    } else if (round === 'Round 1') {
      if (!message) {
        filteredProjects1 = await Data1
        totalItems = filteredProjects1.length
      } else {
        filteredProjects1 = await Data1.filter((project: ProjectDataRound1) => {
          const projectName = project['Project Name'].toLowerCase()
          totalItems = filteredProjects1.length
          return projectName.includes(message)
        })
      }
    }
  }

  const sortFilter = async (event: any) => {
    let select = event.target.value
    console.log('Select:', select)
    if (round === 'Round 2') {
      if (select === 'LowtoHigh') {
        filteredProjects2 = await Data2.slice().sort((a, b): number => {
          const numA = parseFloat(a['OP Received'].replace(/,/g, ''))
          const numB = parseFloat(b['OP Received'].replace(/,/g, ''))
          return numA - numB
        })
      } else if (select === 'HightoLow') {
        filteredProjects2 = await Data2.slice().sort((a, b): number => {
          const numA = parseFloat(a['OP Received'].replace(/,/g, ''))
          const numB = parseFloat(b['OP Received'].replace(/,/g, ''))
          return numB - numA
        })
      } else if (select === 'AtoZ') {
        filteredProjects2 = await Data2.sort((a, b) => {
          const nameA = a['Project Name'].toUpperCase()
          const nameB = b['Project Name'].toUpperCase()
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })
      } else if (select === 'ZtoA') {
        filteredProjects2 = await Data2.sort((a, b) => {
          const nameA = a['Project Name'].toUpperCase()
          const nameB = b['Project Name'].toUpperCase()
          if (nameA > nameB) {
            return -1
          }
          if (nameA < nameB) {
            return 1
          }
          return 0
        })
      }
      console.log('Filtered Projects:', filteredProjects2)
    } else if (round === 'Round 1') {
      if (select === 'LowtoHigh') {
        filteredProjects1 = await Data1.slice().sort((a, b): number => {
          const numA = parseFloat(a.allocation.replace(/,/g, ''))
          const numB = parseFloat(b.allocation.replace(/,/g, ''))
          return numA - numB
        })
      } else if (select === 'HightoLow') {
        filteredProjects1 = await Data1.slice().sort((a, b): number => {
          const numA = parseFloat(a.allocation.replace(/,/g, ''))
          const numB = parseFloat(b.allocation.replace(/,/g, ''))
          return numB - numA
        })
      } else if (select === 'AtoZ') {
        filteredProjects1 = await Data1.sort((a, b) => {
          const nameA = a['Project Name'].toUpperCase()
          const nameB = b['Project Name'].toUpperCase()
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })
      } else if (select === 'ZtoA') {
        filteredProjects1 = await Data1.sort((a, b) => {
          const nameA = a['Project Name'].toUpperCase()
          const nameB = b['Project Name'].toUpperCase()
          if (nameA > nameB) {
            return -1
          }
          if (nameA < nameB) {
            return 1
          }
          return 0
        })
      }
      console.log('Filtered Projects:', filteredProjects1)
    }
  }
</script>

<Alertbar />
<div class="flex flex-col min-h-screen mb-10">
  {#if loading}
    <div class="flex flex-row justify-center font-bold text-3xl my-64">
      Loading
    </div>
  {:else}
    <div class="w-full lg:h-[10em] overflow-hidden">
      <img src="./img/opsunsmile.png" alt="OPBanner" class="w-full" />
    </div>
    <div class="px-10 lg:px-[10em]">
      {#if round === 'Round 1'}
        <h1 class="flex justify-center font-bold mt-6 text-[40px] text-center">
          RetroPGF 1 Nominated Projects
        </h1>
        <div class="flex justify-center my-3">
          <div class="text-[20px] max-w-[50em] text-base text-center">
            The Retroactive Public Goods Funding (RetroPGF) by The Optimism
            Collective awarded funding to 58 out of 76 nominated projects,
            marking the first experiment in a new form of governance through
            badgeholders.
          </div>
        </div>
        <a
          href="https://community.optimism.io/docs/governance/retropgf-1/"
          target="_blank"
          class="flex justify-center text-base font-semibold my-2"
        >
          Read More &gt
        </a>
      {:else if round === 'Round 2'}
        <h1 class="flex justify-center font-bold mt-6 text-[40px] text-center">
          RetroPGF 2 Nominated Projects
        </h1>
        <div class="flex justify-center my-3">
          <div class="text-[20px] max-w-[50em] text-base text-center">
            RetroPGF Round 2 stretched over multiple months and involved
            participation from hundreds of projects and community members across
            the Optimism Collective.
          </div>
        </div>
        <a
          href="https://community.optimism.io/docs/governance/retropgf-2/"
          target="_blank"
          class="flex justify-center text-base font-semibold my-2"
        >
          Read More &gt
        </a>
      {/if}
      <div class="flex justify-center">
        <div class="flex flex-wrap rounded-2xl mt-4 mb-1 px-5 w-[60em]">
          <div class="flex flex-grow mr-3">
            <input
              on:input={searchFilter}
              type="text"
              class=" bg-[#e4e4e4] flex-grow rounded-lg px-5 py-2 my-2 text-left transition ease-in-out duration-200"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="flex flex-wrap px-5 mb-3">
          {#if round == 'Round 2'}
            {#each categoryRound2 as category}
              <button
                on:click={filterCategory}
                value={category}
                class="{showCategory === category
                  ? 'bg-red-500 text-white'
                  : 'bg-[#d7d7d7]'} text-black flex-grow lg:grow-0 px-5 mr-3 my-2 h-10 rounded-lg hover:drop-shadow-[0_8px_5px_rgb(0,0,0,0.31)] transition ease-in-out duration-200"
              >
                {category}</button
              >
            {/each}
          {:else}
            {#each categoryRound1 as category}
              <button
                on:click={filterCategory}
                value={category}
                class="{showCategory === category
                  ? 'bg-red-500'
                  : 'bg-black'} text-white px-5 mr-3 my-2 h-10 rounded-lg hover:drop-shadow-[0_8px_5px_rgb(0,0,0,0.31)] transition ease-in-out duration-200"
              >
                {category}</button
              >
            {/each}
          {/if}
          <select
            on:change={changeRound}
            class="px-2 my-2 mr-3 h-10 border-2 border-black rounded-lg"
          >
            <option disabled>-- Select --</option>
            <option value="Round 1">Round 1</option>
            <option selected value="Round 2">Round 2</option>
          </select>
          {#if round === 'Round 2'}
            <select
              on:change={sortFilter}
              class="px-2 my-2 h-10 border-2 border-black rounded-lg"
            >
              <option disabled>-- Filter Sort --</option>
              <option value="LowtoHigh">OP Received (Low to high)</option>
              <option value="HightoLow" selected
                >OP Received (High to low)</option
              >
              <option value="AtoZ">Project Name (A to Z)</option>
              <option value="ZtoA">Project Name (Z to A)</option>
            </select>
          {:else}
            <select
              on:change={sortFilter}
              class="px-2 my-2 h-10 border-2 border-black rounded-lg"
            >
              <option disabled>-- Filter Sort --</option>
              <option value="LowtoHigh">USD Received (Low to high)</option>
              <option value="HightoLow" selected
                >USD Received (High to low)</option
              >
              <option value="AtoZ">Project Name (A to Z)</option>
              <option value="ZtoA">Project Name (Z to A)</option>
            </select>
          {/if}
        </div>
      </div>
    </div>
    <div class="lg:px-[10em]">
      {#if round == 'Round 2'}
        <div class="allcard flex flex-wrap justify-center">
          {#key filteredProjects2}
            {#each filteredProjects2.slice(0, itemsToShow) as project}
              <CardRound2
                name={project['Project Name']}
                category={project['Category']}
              />
            {/each}
          {/key}
        </div>
      {:else if round == 'Round 1'}
        <div class="allcard flex flex-wrap justify-center">
          {#key filteredProjects1}
            {#each filteredProjects1.slice(0, itemsToShow) as project}
              <CardRound1 name={project['Project Name']} />
            {/each}
          {/key}
        </div>
      {/if}
      {#if itemsToShow < totalItems}
        <div class="flex justify-center mt-4">
          <button
            on:click={loadMore}
            class="bg-black hover:bg-red-500 text-white font-medium py-2 px-6 rounded-xl transition ease-in-out duration-200"
          >
            Load More
          </button>
        </div>
      {/if}
    </div>
  {/if}
</div>
