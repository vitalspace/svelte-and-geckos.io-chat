<script>
  import "./app.css";
  import { channel } from "./geekos/geckos";

  let key;
  let keyCode;
  let message = "";
  let messageForAll = [];
  let currentPlayers = [];

  channel.on("currentPlayers", (data) => {
    currentPlayers = [];
    Object.keys(data).forEach((id) => {
      const obj = { id: data[id].playerId, name: data[id].name };
      currentPlayers = currentPlayers.concat(obj);
    });
  });

  channel.on("message-for-all", (data) => {
    // @ts-ignore
    const obj = { name: data.name, message: data.message };
    messageForAll = messageForAll.concat(obj);
    if (messageForAll.length > 11) {
      messageForAll.shift();
    }
  });

  const sendMessage = (e) => {
    e.preventDefault();
    channel.emit("message", {
      message: message,
    });
    message = "";
  };

  const handleKeydown = (event) => {
    key = event.key;
    keyCode = event.keyCode;

    if (key === "Enter" && keyCode === 13) {
      channel.emit("message", {
        message: message,
      });
      message = "";
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <div class="container mx-auto">
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/2 p-3 lg:w-2/5 g-indigo-500 shadow-lg shadow-indigo-500/50">
        <div
          class="bg-gray-200 p-3 overflow-auto"
          style="height: 400px;"
        >
          {#each currentPlayers as e}
            <p class="p-2">{e.name}</p>
          {/each}
          <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.</p> -->
        </div>
      </div>

      <div class="w-full md:w-1/2 p-3 lg:w-3/5 g-indigo-500 shadow-lg shadow-indigo-500/50">
        <!-- crea un div con height de 500 px -->
        <div
          class=" p-3"
          style="height: 400px;"
        >
          <!-- crea un div con hight de 80% -->
          <div class="h-4/5 overflow-y-scroll break-all bg-gray-200 ">
            <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.</p> -->
            {#each messageForAll as e}
              <p class="pl-2 pt-2">{e.name} : {e.message}</p>
            {/each}
          </div>
          <!-- crea un div con el height de 20% -->
          <div class="h-1/5  flex justify-between mt-1 mb-1">
            <!-- crea crea un textarea y un boton -->
            <textarea
              bind:value={message}
              class="h-full w-full border-2 border-black p-2"
              placeholder="Write something."
            />
            <button
              on:click={sendMessage}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-1 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
</style>
