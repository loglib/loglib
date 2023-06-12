import { Mock } from "vitest";
import { record } from "../src/record";
import { send } from "../src/server";
import { flush, getUserId } from "../src/utils/util";
import { setConsent, track } from "../src/methods";



vi.mock("../src/server");


beforeEach(() => {
    vi.useFakeTimers()
    vi.resetAllMocks()
    // Clear the events bank before each test

});

afterEach(() => {
    // Clear the intervals after each test
    window.lli.intervals.forEach(clearInterval);
    window.lli.intervals = [];
    window.lli.eventsBank = [];
    vi.useRealTimers()
});

describe("Session Start", () => {
    it("should set default config if no config is provided", () => {
        record();
        expect(window.llc.debug).toBe(false);
        expect(window.llc.autoTrack).toBe(false);
        expect(window.llc.env).toBe("dev");
        expect(window.llc.postInterval).toBe(5);
        expect(window.llc.consent).toBe("denied");
        expect(window.llc.pulseInterval).toBe(10);
    });

    it("should set provided config if config is provided", () => {
        record({ debug: true, autoTrack: true });
        expect(window.llc.debug).toBe(true);
        expect(window.llc.autoTrack).toBe(true);
    });

    it("should call send with init session info on initSession", () => {
        record()
        expect(send).toHaveBeenCalledWith(
            {
                pathname: location.pathname,
                host: location.hostname,
                referrer: document.referrer,
                queryParams: {},
                screenWidth: window.screen.width,
                language: navigator.language,
            },
            "/session"
        );
    });


})


describe("pageNavigation", () => {
    it("should call send with pageview info on navigation", () => {
        const newUrl = "/new-page";
        history.pushState({}, "", newUrl);
        expect(send).toHaveBeenCalledWith({
            currentRef: location.href.replace("about:", ''),
            currentUrl: newUrl,
            duration: 0,
            queryParams: {},
        }, '/pageview')

        expect(send).toHaveBeenCalledWith({
            currentRef: newUrl,
            currentUrl: newUrl,
            duration: 0,
            queryParams: {},
        }, '/pageview')
    });
})


describe('events', () => {
    it("should increase the event bank if auto click is on if a btn or element with onClick function is clicked", () => {
        record({ autoTrack: true })
        const button = document.createElement("button");
        const notABtn = document.createElement("div");
        const notABtnButHasOnClick = document.createElement("div");
        button.innerHTML = "test";
        document.body.appendChild(button);
        document.body.appendChild(notABtn);
        document.body.appendChild(notABtnButHasOnClick);
        button.onclick = () => {
            console.log('clicked')
        };
        notABtnButHasOnClick.onclick = () => {
            console.log('clicked')
        };
        button.click();
        notABtn.click();
        notABtnButHasOnClick.click()
        expect(window.lli.eventsBank.length).toBe(2);
        window.llc.autoTrack = false
        button.click();
        expect(window.lli.eventsBank.length).toBe(2);
        track('test', {
            name: 'test'
        })
        expect(window.lli.eventsBank.length).toBe(3);
        document.body.removeChild(button);
    });

    it("Should send events when the post interval is reached", () => {
        record({ autoTrack: true, postInterval: 1 })
        const button = document.createElement("button");
        button.innerHTML = "test";
        document.body.appendChild(button);
        button.click();
        expect(window.lli.eventsBank.length).toBe(1);
        vi.advanceTimersByTime(1000);
        expect(send).toHaveBeenCalledWith(window.lli.eventsBank, "/event", flush)
        document.body.removeChild(button);
    })
})


describe("Session End", () => {
    it("should send session end info on session end", () => {
        record()
        const eventBank = [
            {
                eventName: "direct",
                eventType: "click",
                payload: {},
                id: "123",
                page: "/test",
            },
        ];
        window.lli.eventsBank = eventBank;
        (send as Mock).mockClear();
        (send as Mock).mockImplementation((_, __, fn?: () => void) => {
            fn?.()
        })
        const event = new Event("visibilitychange", { bubbles: true });
        Object.defineProperty(document, "visibilityState", {
            value: "hidden",
            writable: true,
        });
        document.dispatchEvent(event);
        expect(send).toHaveBeenCalledWith({
            duration: (Date.now() - window.lli.timeOnPage) / 1000,
            currentUrl: window.lli.currentUrl,
            currentRef: window.lli.currentRef,
            queryParams: {},
        }, '/pageview')
        console.log(window.lli.eventsBank)
        expect(send).toHaveBeenCalledWith(eventBank, "/event", flush)
        expect(send).toHaveBeenCalledWith({
            duration: 0,
        }, "/session/pulse", flush)
        expect(window.lli.eventsBank.length).toEqual(0);
        const event2 = new Event("visibilitychange", { bubbles: true });
        Object.defineProperty(document, "visibilityState", {
            value: "visible",
            writable: true,
        });
        document.dispatchEvent(event2);
    })
})

describe("Session Blur", () => {
    it("should send session end info on session blur", () => {
        record()
        const eventBank = [
            {
                eventName: "direct",
                eventType: "click",
                payload: {},
                id: "123",
                page: "/test",
            },
        ];
        window.lli.eventsBank = eventBank;
        (send as Mock).mockClear();
        (send as Mock).mockImplementation((_, __, fn?: () => void) => {
            fn?.()
        }
        )
        const event = new Event("blur", { bubbles: true });
        document.dispatchEvent(event);
        expect(send).toHaveBeenCalledWith({
            duration: (Date.now() - window.lli.timeOnPage) / 1000,
            currentUrl: window.lli.currentUrl,
            currentRef: window.lli.currentRef,
            queryParams: {},
        }, '/pageview')
        expect(send).toHaveBeenCalledWith(eventBank, "/event", flush)
        expect(send).toHaveBeenCalledWith({
            duration: 0,
        }, "/session/pulse", flush)
        expect(window.lli.eventsBank.length).toEqual(0);
    })
})


describe("Concent", () => {
    it("should not set userId if concent is denied which is default", () => {
        record()
        expect(window.llc.consent).toBe("denied");
        expect(getUserId()).toBe("")
    })

    it("should change concent on setConcent", () => {
        setConsent("granted")
        expect(window.llc.consent).toBe("granted");
        expect(getUserId()).not.toBe("")
    })

    it("If there is user id in local storage, it should set it as userId", () => {
        record()
        expect(window.llc.consent).toBe("denied");
        window.localStorage.setItem("loglib-id", "123")
        expect(getUserId()).toBe("123")
    })
})