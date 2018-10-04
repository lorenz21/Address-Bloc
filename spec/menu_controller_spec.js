const MenuController = require("../controllers/MenuController");

describe("MenuController", () => {
    beforeEach(() => {
        this.menu = new MenuController();
    });

    describe("#remindMe()", () => {
        it("should return a string when remind me has text", () => {
            expect(this.menu.remindMe()).toBe("Learning is a life-long pursuit");
        });
    });
 });