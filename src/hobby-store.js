import { writable } from "svelte/store";

const hobbies = writable([]);

export default {
	subscribe: hobbies.subscribe,
	setHobbies: hobbiesData => {
		hobbies.set(hobbiesData);
	},
	addHobby: hobby => {
		hobbies.update(items => {
			return [...items, hobby];
		});
	}
};
