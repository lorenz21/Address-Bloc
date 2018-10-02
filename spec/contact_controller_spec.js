const ContactController = require("../controllers/ContactController");
const sequelize = require("../db/models/index").sequelize;

describe("ContactController", () => {
    beforeEach((done) => {
        this.book = new ContactController();

        sequelize.sync({force:true}).then((res) => {
            done();
        })
        .catch((err) => {
            done();
        });

    });

    it("should be defined", () => {
        expect(ContactController).toBeDefined();
    });

    describe("#addContact()", () => {
        it("should add a single contact to the book", (done) => {
            this.book.addContact("Alice", "111-222-3333", "alice@hotmail.com")
            .then((contact) => {
                expect(contact.name).toBe("Alice");
                expect(contact.phone).toBe("111-222-3333");
                expect(contact.email).toBe("alice@hotmail.com");
                done();
            })
            .catch((err) => {
                done();
            });
        });
    });
})