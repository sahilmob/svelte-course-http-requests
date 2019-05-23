<script>
  import { onMount } from "svelte";
  import { FIREBASE_BASE_URL } from "./constants";
  let hobbies = [];
  let loading = false;
  let hobbyInput;

  let getHobbies = fetch(`${FIREBASE_BASE_URL}hobbies.json`)
    .then(res => {
      if (!res.ok) {
        throw new Error("falid");
      }
      return res.json();
    })
    .then(data => {
      return (hobbies = Object.values(data));
    })
    .catch(err => {
      console.log(err);
    });

  function addHobby() {
    hobbies = [...hobbies, hobbyInput.value];
    loading = true;
    fetch(`${FIREBASE_BASE_URL}hobbies.json`, {
      method: "POST",
      body: JSON.stringify(hobbyInput.value),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        loading = false;
        if (!res.ok) {
          throw new Error("falid");
        }
      })
      .catch(err => {
        loading = false;
        console.log("err");
      });
  }
</script>

<style>

</style>

<label for="hobby">Hobby</label>
<input bind:this={hobbyInput} type="text" id="hobby" />
<button on:click={addHobby}>Add Hobby</button>
<br />

{#if loading}
  <strong>Loading...</strong>
{:else}
  <ul>
    {#each hobbies as hobby (hobby)}
      <li>{hobby}</li>
    {/each}
  </ul>
{/if}
<!-- {#await getHobbies}
  Loading...
{:then hobbyData}
  <ul>
    {#each hobbyData as hobby (hobby)}
      <li>{hobby}</li>
    {/each}
  </ul>
{:catch err}
   {err.message}
{/await} -->
