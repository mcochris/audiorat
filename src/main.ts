import { invoke } from "@tauri-apps/api/core";

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

function isTauriRuntime(): boolean {
	return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

async function greet() {
	if (greetMsgEl && greetInputEl) {
		if (!isTauriRuntime()) {
			greetMsgEl.textContent =
				"Tauri API is unavailable in a regular browser tab. Run this in the Tauri desktop window.";
			return;
		}

		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		greetMsgEl.textContent = await invoke("greet", {
			name: greetInputEl.value,
		});
	}
}

window.addEventListener("DOMContentLoaded", () => {
	greetInputEl = document.querySelector("#greet-input");
	greetMsgEl = document.querySelector("#greet-msg");
	document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
		e.preventDefault();
		greet();
	});
});
