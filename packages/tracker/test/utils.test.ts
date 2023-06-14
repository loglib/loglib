import { parseHost } from "../src/utils/util"


describe("utils", () => {
    it("parse host", () => {
        const res = parseHost("/test")
        expect(res).toBe("/test")
        const res2 = parseHost("https://test.com")
        expect(res2).toBe("https://test.com/api/loglib")
        const res3 = parseHost("https://test.com/")
        expect(res3).toBe("https://test.com/api/loglib")
        const res4 = parseHost("https://test.com/api/route")
        expect(res4).toBe("https://test.com/api/route")
    })
})