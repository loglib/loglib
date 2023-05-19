/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { initSession } from "../src/record";
import { InitInfo } from "../src/types";
import { flush } from "../src/utils";
import { logLib } from "../src";
import { q, send } from "../src/server";


const { record } = logLib
beforeEach(() => {
	window.llc = undefined;
	window.lli = undefined;
	record({ env: "dev", autoTrack: true });

});

describe("record", () => {
	it("should attach loglib config to window", () => {
		expect(typeof window.llc).toBe("object");
	});

	// it("should attach loglib to window", () => {
	// 	expect(typeof window.logLib).toBe("object");
	// });

	it("should set env automatically to dev", () => {
		expect(window.llc.env).toBe("dev");
	});

	it("should set env to test", () => {
		record({ env: "test" });
		expect(window.llc.env).toBe("test");
	});

	it("should send complete data to server on session initialization", () => {
		const initInfo = initSession();
		expect(initInfo).toMatchObject<InitInfo>(initInfo);
	});

	it("should change the url on history.pushState", () => {
		const url = "/test";
		history.pushState({}, "", url);
		expect(window.lli.currentUrl).toBe(url);
	});

	it("should change the url on history.replaceState", () => {
		const url = "/test";
		history.replaceState({}, "", url);
		expect(window.lli.currentUrl).toBe(url);
	});

	it("should change the referrer on history.pushState", () => {
		const url = "/test";
		history.pushState({}, "", url);
		expect(window.lli.currentRef).toBe(window.lli.currentUrl);
	});

	it("should change the referrer on history.replaceState", () => {
		const url = "/test";
		history.replaceState({}, "", url);
		expect(window.lli.currentRef).toBe(window.lli.currentUrl);
	});

	it("should set event bank to empty array on history.pushState", () => {
		//@ts-ignore
		send = jest.fn((data, url, success) => success?.());
		window.lli.eventsBank = [
			{
				eventType: "click",
				payload: {},
				id: "123",
				eventName: "direct",
				page: "/test",
			},
		];
		const url = "/test";
		history.pushState({}, "", url);
		expect(window.lli.eventsBank).toEqual([]);
	});
});

describe("events", () => {
	it("should call the auto click event handler on click", () => {
		const button = document.createElement("button");
		button.innerHTML = "test";
		document.body.appendChild(button);
		button.onclick = () => { };
		button.click();
		expect(window.lli.eventsBank.length).toBe(1);
		document.body.removeChild(button);
	});
	it("shouldn't call auto click event handler on click if the element isn't button", () => {
		const div = document.createElement("div");
		div.innerHTML = "test";
		document.body.appendChild(div);
		div.onclick = () => { };
		div.click();
		expect(window.lli.eventsBank.length).toBe(0);
		document.body.removeChild(div);
	});

	it("shouldn't call auto click event handler on click if the element is button but doesn't have onclick", () => {
		const button = document.createElement("button");
		button.innerHTML = "test";
		document.body.appendChild(button);
		button.click();
		expect(window.lli.eventsBank.length).toBe(0);
		document.body.removeChild(button);
	});

	it("should clear the event bank on send", () => {
		//@ts-ignore
		send = jest.fn((data, url, success) => {
			console.log('log')
			console.log(url)
			success?.()
		});
		//@ts-ignore
		q = jest.fn((data) => {
			window.lli.eventsBank.push(data);
			send(data, "test", flush);
		});
		const button = document.createElement("button");
		button.innerHTML = "test";
		document.body.appendChild(button);
		button.onclick = () => { console.log('clicked') };
		button.click();
		expect(window.lli.eventsBank).toEqual([]);
	});
});

describe("end page", () => {
	it("should send data on unload", () => {
		//@ts-ignore
		send = jest.fn((data, url, success) => success?.());
		window.lli.eventsBank = [
			{
				eventType: "click",
				payload: {},
				id: "123",
				eventName: "direct",
				page: "/test",
			},
		];
		//unload the window
		window.dispatchEvent(new Event("unload"));
		expect(window.lli.eventsBank).toEqual([]);
	});
});
