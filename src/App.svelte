<script>
  import { FIREBASE_BASE_URL } from "./constants";
  let hobbies = [];
  let hobbyInput;

  function addHobby() {
    hobbies = [...hobbies, hobbyInput.value];
    fetch(`${FIREBASE_BASE_URL}/hobbies.json`, {
      method: "POST",
      body: JSON.stringify(hobbies),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("falid");
        }
      })
      .catch(err => console.log("err"));
  }
</script>

<style>

</style>

<label for="hobby">Hobby</label>
<input bind:this={hobbyInput} type="text" id="hobby" />
<button on:click={addHobby}>Add Hobby</button>

<ul>
  {#each hobbies as hobby (hobby)}
    <li>{hobby}</li>
  {/each}
</ul>
