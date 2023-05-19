import { logLib } from "../src";
import { send, q } from "../src/server";



const { track, identify, record, setConsent } = logLib
describe("identify", () => {
	it("should call send action", () => {
		//@ts-ignore
		send = jest.fn();
		const data = { name: "test", email: "test" };
		identify(data);
		expect(send).toBeCalledWith(data, "/user");
	});
});


describe("setConsent", () => {
	record();
	it("should set consent", () => {
		setConsent("denied");
		expect(window.llc.consent).toBe("denied");
	});
});

//duplicated tests from record.test.ts
describe("record", () => {
	it("should call send action", () => {
		//@ts-ignore
		send = jest.fn();
		record();
		expect(send).toBeCalledWith(expect.anything(), "/session");
	});
});

describe("track", () => {
	it("should call send action", () => {
		//@ts-ignore
		q = jest.fn();
		track("test", { name: "test", email: "test" });
		expect(q).toBeCalled();
	});
});
