<script lang="ts">
  import { Axios } from "@/lib/axios";
  import CommentBox from "./CommentBox.svelte";

  export let detail: any;

  function formatDate(date: string) {
    const comparedDate = new Date(date);
    var OneDay = comparedDate.getTime() + 1 * 24 * 60 * 60 * 1000;

    const currentDate = new Date();

    var hours = comparedDate.getHours();
    var minutes = comparedDate.getMinutes();

    if (+currentDate.getTime() < +OneDay) {
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? 0 + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    } else {
      return (
        comparedDate.toLocaleString("en-US", {
          month: "short",
        }) +
        " " +
        comparedDate.getDate() +
        " " +
        comparedDate.toLocaleString("en-US", {
          year: "numeric",
        })
      );
    }
  }
  
  const getNewComment = async () => {
    const res = await Axios.get(`/api/projects/${detail.id}`);
    detail = res.data.data;
  };
</script>

<div class="flex justify-center w-screen bg-white">
  <div
    class="relative overflow-hidden border-2 rounded-2xl border-black w-[55em] m-6 lg:m-20 shadow-xl"
  >
    <a href="/projects" class="absolute left-5 top-5 bg-white w-9 h-8 rounded">
      <img
        src="/img/arrow_down2.png"
        class="absolute left-2 top-3 w-4 rotate-90 drop-shadow-2xl"
        alt="arrow"
      /></a
    >

    {#if detail.banner_url}
      <div class="overflow-hidden">
        <img
          src={detail.banner_url}
          alt="banner"
          class="h-56 object-cover w-full"
        />
      </div>
    {:else}
      <div class="h-10" />
    {/if}
    <div class="flex flex-col py-5 px-10 lg:p-10">
      <div class="lg:relative">
        <img
          src={detail.logo_url}
          alt=""
          class="w-32 rounded-3xl lg:absolute shadow-sm"
        />
        <div
          class="mt-3 lg:absolute lg:text-center text-[2em] font-bold lg:top-0 lg:left-40"
        >
          {detail?.name}
        </div>
        <div
          class="flex gap-4 my-2 lg:absolute lg:divide-x-2 lg:grid lg:grid-cols-2 lg:top-16 lg:left-40 w-[calc(55em-18rem)]"
        >
          <a
            href={detail.website_url}
            target="_blank"
            class="font-bold flex flex-col justify-center items-center"
          >
            <img src="/img/web_logo.png" alt="website" class="w-6 h-6 m-1" />
            <div class="hidden lg:flex">Website</div>
          </a>
          <div class="flex justify-center items-center">
            <div
              class="bg-gradient-to-r from-black to-retro rounded-2xl px-3 py-2 text-white font-bold text-xs mr-2"
            >
              {detail.category}
            </div>
            <div
              class="bg-gradient-to-r from-black to-retro rounded-2xl px-3 py-2 text-white font-bold text-xs mr-2"
            >
              {detail.crypto_category}
            </div>
          </div>
        </div>
      </div>
      <div class=" font-bold mt-4 lg:mt-40 text-lg">About the project</div>
      <div class="mt-1 mb-5 text-[#616161]">{detail?.description}</div>
      <div class="font-bold text-lg">
        How has this project contributed to the development and adoption of
        Optimism?
      </div>
      <div class="mt-1 mb-5 text-[#616161]">{detail?.reason}</div>
    </div>

    <!-- Comments -->
    <div class="antialiased mx-10 mb-6">
      <h3 class="mb-4 text-lg font-bold">Comments</h3>
      <div class="space-y-4">
        {#each detail.Comment as comment}
          <div class="flex">
            <div class="flex-shrink-0 mr-3">
              <img
                class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                src={comment.user.profile}
                alt=""
              />
            </div>
            <div
              class="flex-1 border rounded-lg w-full px-4 py-2 sm:px-6 sm:py-4 leading-relaxed"
            >
              <strong>{comment.user.user_name}</strong>
              <span class="text-xs text-gray-400"
                >{formatDate(comment.create_at)}</span
              >
              <p class="text-sm">
                {comment.content}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="px-10"><CommentBox id={detail.id} {getNewComment} /></div>
  </div>
</div>
