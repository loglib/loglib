import { filter } from "lodash";
import { describe, it } from "vitest";


describe("util", () => {
    it("should work", () => {
        const data = [
            { id: 1, name: "John", age: 24 },
            { id: 2, name: "Jane", age: 22 },
            { id: 3, name: "Joe", age: 26 },
        ]
        filter(data, (n) => n.age > 23)
    });
})